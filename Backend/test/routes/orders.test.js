import { test } from 'tap'
import { build } from '../helper.js'

test('Get all orders by business, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3/orders',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all orders by business, OK. El código de respuesta es 200');

  t.end();
})

// test('Get all orders by business, not OK', async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/businesses/3/orders',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all orders by business, not OK. El código de respuesta es 204');

//   t.end();
// })

test('Get order by id by business, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3/orders/1',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all orders by business, OK. El código de respuesta es 200');

  t.end();
})

test('Get order by id by business, not OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3/orders/1000',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get all orders by business, not OK. El código de respuesta es 404');

  t.end();
})

test('Process order by id by business, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3/orders/1/process',
    method: 'PUT'
  })

  t.equal(response.statusCode, 204, 'Process order by id by business, OK. El código de respuesta es 204');

  // get the order to check the state is changed to processed
  const order = (await app.inject({
    url: '/businesses/3/orders/1',
    method: 'GET'
  })).json()

  t.equal(order.state, 'processed', 'Process order by id by business, OK. El estado de la orden es procesado');

  t.end();
})

test('Process order by id by business, not OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3333/orders/11111/process',
    method: 'PUT'
  })

  t.equal(response.statusCode, 404, 'Process order by id by business, not OK. El código de respuesta es 404');

  t.end();
})

test('Decline order by id by business, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3/orders/1/decline',
    method: 'PUT'
  })

  t.equal(response.statusCode, 204, 'Decline order by id by business, OK. El código de respuesta es 204');

  // get the order to check the state is changed to processed
  const order = (await app.inject({
    url: '/businesses/3/orders/1',
    method: 'GET'
  })).json()

  t.equal(order.state, 'declined', 'Decline order by id by business, OK. El estado de la orden es cancelado');

  t.end();
})

test('Decline order by id by business, not OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3333/orders/11111/decline',
    method: 'PUT'
  })

  t.equal(response.statusCode, 404, 'Decline order by id by business, not OK. El código de respuesta es 404');

  t.end();
})

test('Get all orders by client, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1/orders',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all orders by client, OK. El código de respuesta es 200');

  t.end();
})

// test('Get all orders by client, not OK', async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/clients/1/orders',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all orders by client, not OK. El código de respuesta es 204');

//   t.end();
// })

test('Post order by client, OK', async (t) => {
  const app = await build(t)

  // create a new order
  const response = await app.inject({
    url: '/clients/1/orders',
    method: 'POST',
    payload: {
      date: '2020-01-01',
      id_client: 1,
      description: 'test',
      id_business: 3,
      details: [{
        id_product: 1,
        quantity: 16
      }]
    }
  })

  t.equal(response.statusCode, 201, 'Post order by client, OK. El código de respuesta es 201');

  // check all the fields of the returned object are the same as the payload
  const createdOrder = (await app.inject({
    url: '/clients/1/orders/' + response.json().id,
    method: 'GET'
  }))

  t.same(createdOrder.json(), {
    id: createdOrder.json().id,
    date: '2020-01-01T03:00:00.000Z',
    state: 'started',
    id_client: 1,
    description: 'test',
    id_business: 3,
    details: [{
      id_product: 1,
      quantity: 16
    }]
  })

  // end the test
  t.end();
})

test('Post order by client, not OK', async (t) => {
  const app = await build(t)

  // create a new order
  const response = await app.inject({
    url: '/clients/1/orders',
    method: 'POST',
    payload: {
      date: '2020-01-01',
      id_client: 11,
      description: 'test',
      id_business: 3,
      details: [{
        id_product: 1,
        quantity: 16
      }]
    }
  })

  t.equal(response.statusCode, 409, 'Post order by client, not OK. El código de respuesta es 409');

  // end the test
  t.end();
})

test('Get order by id by client, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1/orders/1',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all orders by client, OK. El código de respuesta es 200');

  t.end();
})

test('Get order by id by client, not OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1/orders/1000',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get all orders by client, not OK. El código de respuesta es 404');

  t.end();
})

test('Cancel order by id by client, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1/orders/1/cancel',
    method: 'PUT'
  })

  t.equal(response.statusCode, 204, 'Cancel order by id by client, OK. El código de respuesta es 204');

  // get the order to check the state is changed to processed
  const order = (await app.inject({
    url: '/clients/1/orders/1',
    method: 'GET'
  })).json()

  t.equal(order.state, 'cancelled', 'Decline order by id by client, OK. El estado de la orden es cancelado');

  t.end();
})

test('Decline order by id by client, not OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/11111/orders/1111/cancel',
    method: 'PUT'
  })

  t.equal(response.statusCode, 404, 'Decline order by id by client, not OK. El código de respuesta es 404');

  t.end();
})