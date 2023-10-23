import { test } from 'tap'
import { build } from '../helper.js'

test("Get all deliveries by distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all deliveries by distributor, OK. El código de respuesta es 200');
  t.end();
})

// test("Get all deliveries by distributor, not OK", async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/distributors/2/deliveries/',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all deliveries by distributor, not OK. El código de respuesta es 204');
//   t.end();
// })

test("Get all processed deliveries by distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/processed',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all processed deliveries by distributor, OK. El código de respuesta es 200');
  t.end();

})

// test("Get all processed deliveries by distributor, not OK", async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/distributors/2/deliveries/processed/',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all processed deliveries by distributor, OK. El código de respuesta es 204');
//   t.end();

// })

test("Accept a processed order by distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/processed/2/accept',
    method: 'POST'
  })

  t.equal(response.statusCode, 204, 'Accept a processed order by distributor, OK. El código de respuesta es 204');

  // get the delivery to check the state is changed to pending
  const delivery = (await app.inject({
    url: '/distributors/2/deliveries/2',
    method: 'GET'
  })).json()

  t.equal(delivery.state, 'pending', 'Accept a processed order by distributor, OK. El estado de la orden es pending');

  t.end();
})

test("Accept a processed order by distributor, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/processed/2222/accept',
    method: 'POST'
  })

  t.equal(response.statusCode, 404, 'Accept a processed order by distributor, OK. El código de respuesta es 404');

  t.end();
})

test("Get a delivery by distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/1',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a delivery by distributor, OK. El código de respuesta es 200');

  t.end();
})

test("Get a delivery by distributor, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/1111111',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get a delivery by distributor, not OK. El código de respuesta es 404');

  t.end();
})

test("Put a delivery in progress by distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/processed/3/accept',
    method: 'POST'
  })

  const response2 = await app.inject({
    url: '/distributors/2/deliveries/3/in-progress',
    method: 'PUT'
  })

  t.equal(response2.statusCode, 204, 'Put a delivery in progress by distributor, OK. El código de respuesta es 204');

  // get the delivery to check the state is changed to in progress
  const delivery = (await app.inject({
    url: '/distributors/2/deliveries/3',
    method: 'GET'
  })).json()

  t.equal(delivery.state, 'inProgress', 'Put a delivery in progress by distributor, OK. El estado de la orden es inProgress');

  t.end();
})

test("Put a delivery in progress by distributor, not OK", async (t) => {
const app = await build(t)

const response = await app.inject({
  url: '/distributors/2/deliveries/22222/in-progress',
  method: 'PUT'
})

t.equal(response.statusCode, 404, 'Put a delivery in progress by distributor, not OK. El código de respuesta es 404');

t.end();
})

test("Put a delivery delivered by distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2/deliveries/processed/4/accept',
    method: 'POST'
  })

  const response2 = await app.inject({
    url: '/distributors/2/deliveries/4/delivered',
    method: 'PUT'
  })

  t.equal(response2.statusCode, 204, 'Put a delivery delivered by distributor, OK. El código de respuesta es 204');

  // get the delivery to check the state is changed to delivered
  const delivery = (await app.inject({
    url: '/distributors/2/deliveries/4',
    method: 'GET'
  })).json()

  t.equal(delivery.state, 'delivered', 'Put a delivery delivered by distributor, OK. El estado de la orden es delivered');

  t.end();
})

test("Put a delivery delivered by distributor, not OK", async (t) => {
const app = await build(t)

const response = await app.inject({
  url: '/distributors/2/deliveries/22222/delivered',
  method: 'PUT'
})

t.equal(response.statusCode, 404, 'Put a delivery delivered by distributor, not OK. El código de respuesta es 404');

t.end();
})