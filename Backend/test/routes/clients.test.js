import { test } from 'tap'
import { build } from '../helper.js'

test('Get all clients, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all clients, OK. El código de respuesta es 200');
  t.end();
})

// test('Get all clients, not OK', async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/clients/',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all clients, not OK. El código de respuesta es 204');
//   t.end();
// })

test("Get a client, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a client, OK. El código de respuesta es 200');
  t.end();
})

test("Get a client, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1000',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get a client, not OK. El código de respuesta es 404');
  t.end();
})

test("Create a client, OK", async (t) => {
  const app = await build(t)

  // create a client
  const response = await app.inject({
    url: '/clients/',
    method: 'POST',
    payload: {
      "name": "test",
      "email": "testclient@email.com",
      "password": "test",
      "phone": "test",
      "description": "test",
    }
  })

  // check all the fields of the returned object are the same as the payload
  const createdClient = (await app.inject({
    url: '/clients/' + response.json().id,
    method: 'GET'
  })).json()

  t.same(createdClient, {
    id: createdClient.id,
    name: 'test',
    email: "testclient@email.com",
    phone: "test",
    description: "test",
  },
  'The created client is the same as the payload'
  )

  // check the response
  t.equal(response.statusCode, 201, 'Create a client, OK. El código de respuesta es 201');

  // delete the created client
  await app.inject({
    url: '/clients/' + response.json().id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Create a client, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/',
    method: 'POST',
    payload: {
      "names": "test",
      "emails": "test@email.com",
      "passwords": "test",
      "phones": "test",
      "descriptions": "test",
    }
  })

  t.equal(response.statusCode, 400, 'Create a client, not OK. El código de respuesta es 400');
  t.end();
})

test("Update a client, OK", async (t) => {
  const app = await build(t)

  // create a client
  const response = await app.inject({
    url: '/clients/',
    method: 'POST',
    payload: {
      "name": "test",
      "email": "testclient2@email.com",
      "password": "test",
      "phone": "test",
      "description": "test",
    }
  })

  // update the created client
  const response2 = await app.inject({
    url: '/clients/' + response.json().id,
    method: 'PUT',
    payload: {
      id: response.json().id,
      "name": "tested",
      "email": "testclient2@email.com",
      "password": "tested",
      "phone": "tested",
      "description": "tested",
    }
  })

  // check the response
  t.equal(response2.statusCode, 204, 'Update a client, OK. El código de respuesta es 204');

  // check all the fields of the updated client are the same as the payload
  const updatedClient = (await app.inject({
    url: '/clients/' + response.json().id,
    method: 'GET'
  })).json()

  t.same(updatedClient, {
    id: updatedClient.id,
    name: 'tested',
    email: "testclient2@email.com",
    phone: "tested",
    description: "tested",
  },
  'The updated client is the same as the payload'
  )

  // delete the created client
  await app.inject({
    url: '/clients/' + response.json().id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Update a client, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1000',
    method: 'PUT',
    payload: {
      id: 1,
      "name": "test",
      "email": "test@email.com",
      "password": "test",
      "phone": "test",
      "description": "test",
    }
  })

  t.equal(response.statusCode, 409, 'Update a client, not OK. El código de respuesta es 409');
  t.end();
})

test("Delete a client, OK", async (t) => {
  const app = await build(t)

  // create a client
  const response = await app.inject({
    url: '/clients/',
    method: 'POST',
    payload: {
      "name": "test",
      "email": "testclient3@email.com",
      "password": "test",
      "phone": "test",
      "description": "test",
    }
  })

  const response2 = await app.inject({
    url: '/clients/' + response.json().id,
    method: 'DELETE'
  })

  t.equal(response2.statusCode, 204, 'Delete a client, OK. El código de respuesta es 204');
  t.end();
})

test("Delete a client, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1000',
    method: 'DELETE'
  })

  t.equal(response.statusCode, 404, 'Delete a client, not OK. El código de respuesta es 404');
  t.end();
})

test("Get a client favorite products, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1/favorite-products',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a client favorite products, OK. El código de respuesta es 200');
  t.end();
})

// test("Get a client favorite products, not OK", async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/clients/1/favorite-products',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get a client favorite products, not OK. El código de respuesta es 204');
//   t.end();
// })

test("Post a client favorite product, OK", async (t) => {
  const app = await build(t)

  // create a product
  const response = await app.inject({
    url: '/businesses/3/products',
    method: 'POST',
    payload: {
      name: 'test-favorite',
      type: 'test-favorite',
      description: 'test-favorite',
      price: 200,
      id_business: 3
    }
  })

  // add the product to the client favorite products
  const response2 = await app.inject({
    url: '/clients/1/favorite-products' + '/' + response.json().id,
    method: 'POST'
  })

  // check the response
  t.equal(response2.statusCode, 201, 'Post a client favorite product, OK. El código de respuesta es 201');

  // delete the created product from the client favorite products
  await app.inject({
    url: '/clients/1/favorite-products/' + response.json().id,
    method: 'DELETE'
  })

  // delete the created product
  await app.inject({
    url: '/businesses/3/products/' + response.json().id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Post a client favorite product, not OK", async (t) => {
  const app = await build(t)

  // add the product to the client favorite products
  const response = await app.inject({
    url: '/clients/1111/favorite-products/1111',
    method: 'POST'
  })

  // check the response
  t.equal(response.statusCode, 404, 'Post a client favorite product, not OK. El código de respuesta es 404');

  // end the test
  t.end();
})

test("Delete a client favorite product, OK", async (t) => {
  const app = await build(t)

  // create a product
  const response = await app.inject({
    url: '/businesses/3/products',
    method: 'POST',
    payload: {
      name: 'test-favorite2',
      type: 'test-favorite2',
      description: 'test-favorite2',
      price: 200,
      id_business: 3
    }
  })

  // add the product to the client favorite products
  const response2 = await app.inject({
    url: '/clients/1/favorite-products' + '/' + response.json().id,
    method: 'POST'
  })

  const response3 = await app.inject({
    url: '/clients/1/favorite-products/' + response.json().id,
    method: 'DELETE'
  })

  // delete the created product
  await app.inject({
    url: '/businesses/3/products/' + response.json().id,
    method: 'DELETE'
  })

  // check the response
  t.equal(response3.statusCode, 204, 'Delete a client favorite product, OK. El código de respuesta es 204');

  // end the test
  t.end();
})

test("Delete a client favorite product, not OK", async (t) => {
  const app = await build(t)

  // delete the created product
  const response = await app.inject({
    url: '/clients/1111/favorite-products/1111',
    method: 'DELETE'
  })

  // check the response
  t.equal(response.statusCode, 404, 'Delete a client favorite product, not OK. El código de respuesta es 404');

  // end the test
  t.end();
})

test("Get a client favorite businesses, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/clients/1/favorite-businesses',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a client favorite businesses, OK. El código de respuesta es 200');
  t.end();
})

// test("Get a client favorite businesses, not OK", async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/clients/1/favorite-businesses',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get a client favorite businesses, not OK. El código de respuesta es 204');
//   t.end();
// })

test("Post a client favorite business, OK", async (t) => {
  const app = await build(t)

  // create a business
  const response = await app.inject({
    url: '/businesses/',
    method: 'POST',
    payload: {
      name: 'test',
      address: 'test',
      phone: 'test',
      email: "testbusiness5@mail.com",
      password: "test"
    }
  })

  // add the business to the client favorite businesses
  const response2 = await app.inject({
    url: '/clients/1/favorite-businesses' + '/' + response.json().id,
    method: 'POST'
  })

  // check the response
  t.equal(response2.statusCode, 201, 'Post a client favorite business, OK. El código de respuesta es 201');

  // delete the created business from the client favorite businesses
  await app.inject({
    url: '/clients/1/favorite-businesses/' + response.json().id,
    method: 'DELETE'
  })

  // delete the created business
  await app.inject({
    url: '/businesses/' + response.json().id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Post a client favorite business, not OK", async (t) => {
  const app = await build(t)

  // add the business to the client favorite businesses
  const response = await app.inject({
    url: '/clients/1111/favorite-businesses/1111',
    method: 'POST'
  })

  // check the response
  t.equal(response.statusCode, 404, 'Post a client favorite business, not OK. El código de respuesta es 404');

  // end the test
  t.end();
})

test("Delete a client favorite business, OK", async (t) => {
  const app = await build(t)

  // create a business
  const response = await app.inject({
    url: '/businesses/',
    method: 'POST',
    payload: {
      name: 'test',
      address: 'test',
      phone: 'test',
      email: "testbusiness6@mail.com",
      password: "test"
    }
  })

  // add the business to the client favorite businesses
  const response2 = await app.inject({
    url: '/clients/1/favorite-businesses' + '/' + response.json().id,
    method: 'POST'
  })

  // delete the created business from the client favorite businesses
  const response3 = await app.inject({
    url: '/clients/1/favorite-businesses/' + response.json().id,
    method: 'DELETE'
  })

  // check the response
  t.equal(response3.statusCode, 204, 'Delete a client favorite business, OK. El código de respuesta es 204');

  // end the test
  t.end();

})

test("Delete a client favorite business, not OK", async (t) => {
  const app = await build(t)

  // delete the created business
  const response = await app.inject({
    url: '/clients/1111/favorite-businesses/1111',
    method: 'DELETE'
  })

  // check the response
  t.equal(response.statusCode, 404, 'Delete a client favorite business, not OK. El código de respuesta es 404');

  // end the test
  t.end();
})