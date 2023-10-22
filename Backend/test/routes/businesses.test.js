import { test } from 'tap'
import { build } from '../helper.js'

test('Get all businesses, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all businesses, OK. El código de respuesta es 200');
  t.end();
})

// test('Get all businesses, not OK', async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/businesses/',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all businesses, not OK. El código de respuesta es 204');
//   t.end();
// })

test("Get a business, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/3',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a business, OK. El código de respuesta es 200');
  t.end();
})

test("Get a business, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/1000',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get a business, not OK. El código de respuesta es 404');
  t.end();
})

test("Create a business, OK", async (t) => {
  const app = await build(t)

  // create a business
  const response = await app.inject({
    url: '/businesses/',
    method: 'POST',
    payload: {
      name: 'test',
      address: 'test',
      phone: 'test',
      email: "testbusiness@mail.com",
      password: "gracias"
    }
  })

  // check all the fields of the returned object are the same as the payload
  const createdBusiness = (await app.inject({
    url: '/businesses/' + response.json().id,
    method: 'GET'
  })).json()

  t.same(createdBusiness, {
    id: createdBusiness.id,
    name: 'test',
    address: 'test',
    phone: 'test',
    email: "testbusiness@mail.com"
  },
  'The created business is the same as the payload'
  )

  // check the status code
  t.equal(response.statusCode, 201, 'Create a business, OK. El código de respuesta es 201');

  // delete the created business
  const response2 = await app.inject({
    url: '/businesses/' + createdBusiness.id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Create a business, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/',
    method: 'POST',
    payload: {
      names: 'test',
      address: 'test',
      phones: 'test',
      emails: "testbusiness2@mail.com",
      passwords: "1000"
    }
  })

  t.equal(response.statusCode, 400, 'Create a business, not OK. El código de respuesta es 400');
  t.end();
})

test("Update a business, OK", async (t) => {
  const app = await build(t)

  // create a business
  const response = await app.inject({
    url: '/businesses/',
    method: 'POST',
    payload: {
      name: 'test',
      address: 'test',
      phone: 'test',
      email: "testbusiness3@mail.com",
      password: "test"
    }
  })

  const createdBusiness = (await app.inject({
    url: '/businesses/' + response.json().id,
    method: 'GET'
  })).json()

  // update the created business
  const response2 = await app.inject({
    url: '/businesses/' + createdBusiness.id,
    method: 'PUT',
    payload: {
      id: createdBusiness.id,
      name: 'tested',
      address: 'tested',
      phone: 'tested',
      email: "testbusiness3@mail.com",
      password: "tested"
    }
  })

  // check the response
  t.equal(response2.statusCode, 204, 'Update a business, OK. El código de respuesta es 204');

  // check all the fields of the updated business are the same as the payload
  const updatedBusiness = (await app.inject({
    url: '/businesses/' + createdBusiness.id,
    method: 'GET'
  })).json()

  t.same(updatedBusiness, {
    id: updatedBusiness.id,
    name: 'tested',
    address: 'tested',
    phone: 'tested',
    email: "testbusiness3@mail.com"
  },
  'The updated business is the same as the payload'
  )

  // delete the created business
  const response3 = await app.inject({
    url: '/businesses/' + createdBusiness.id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Update a business, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/1000',
    method: 'PUT',
    payload: {
      id: 1,
      name: 'test',
      address: 'test',
      phone: 'test',
      email: "test@email.com",
      password: "1"
    }
  })

  t.equal(response.statusCode, 409, 'Update a business, not OK. El código de respuesta es 409');
  t.end();
})

test("Delete a business, OK", async (t) => {
  const app = await build(t)

  // create a business
  const response = await app.inject({
    url: '/businesses/',
    method: 'POST',
    payload: {
      name: 'test',
      address: 'test',
      phone: 'test',
      email: "testbusiness4@mail.com",
      password: "test"
    }
  })

  // delete the created business
  const response2 = await app.inject({
    url: '/businesses/' + response.json().id,
    method: 'DELETE'
  })

  // check the status code
  t.equal(response2.statusCode, 204, 'Delete a business, OK. El código de respuesta es 204');

  // end the test
  t.end();
})

test("Delete a business, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/businesses/1000',
    method: 'DELETE'
  })

  t.equal(response.statusCode, 404, 'Delete a business, not OK. El código de respuesta es 404');
  t.end();
})
