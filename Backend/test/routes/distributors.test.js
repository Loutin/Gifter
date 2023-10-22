import { test } from 'tap'
import { build } from '../helper.js'

test('Get all distributors, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all distributors, OK. El código de respuesta es 200');
  t.end();
})

// test('Get all distributors, not OK', async (t) => {
//   const app = await build(t)

//   const response = await app.inject({
//     url: '/distributors/',
//     method: 'GET'
//   })

//   t.equal(response.statusCode, 204, 'Get all distributors, not OK. El código de respuesta es 204');
//   t.end();
// })

test("Get a distributor, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/2',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a distributor, OK. El código de respuesta es 200');
  t.end();
})

test("Get a distributor, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/1000',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get a distributor, not OK. El código de respuesta es 404');
  t.end();
})

test("Create a distributor, OK", async (t) => {
  const app = await build(t)

  // create a distributor
  const response = await app.inject({
    url: '/distributors/',
    method: 'POST',
    payload: {
      name: 'test',
      phone: 'test',
      availability: 'test',
      email: "testdistributors@email.com",
      password: "1"
    }
  })

  // check all the fields of the returned object are the same as the payload
  const createdDistributor = (await app.inject({
    url: '/distributors/' + response.json().id,
    method: 'GET'
  })).json()

  t.same(createdDistributor, {
    id: createdDistributor.id,
    name: 'test',
    phone: 'test',
    availability: 'test',
    email: "testdistributors@email.com"
  },
  'The created distributor is the same as the payload'
  )

  // check the status code
  t.equal(response.statusCode, 201, 'Create a distributor, OK. El código de respuesta es 201');

  // delete the created distributor
  await app.inject({
    url: '/distributors/' + response.json().id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Create a distributor, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/',
    method: 'POST',
    payload: {
      names: 'test',
      phones: 'test',
      availabilitys: 'test',
      emails: "test@email.com",
      passwords: "1000"
    }
  })

  t.equal(response.statusCode, 400, 'Create a distributor, not OK. El código de respuesta es 400');
  t.end();
})

test("Update a distributor, OK", async (t) => {
  const app = await build(t)

  // create a distributor
  const response = await app.inject({
    url: '/distributors/',
    method: 'POST',
    payload: {
      name: 'test',
      phone: 'test',
      availability: 'test',
      email: "testdistributors2@email.com",
      password: "test"
    }
  })

  // update the created distributor
  const response2 = await app.inject({
    url: '/distributors/' + response.json().id,
    method: 'PUT',
    payload: {
      id: response.json().id,
      name: 'tested',
      phone: 'tested',
      availability: 'tested',
      email: "testdistributors2@email.com",
      password: "tested"
    }
  })

  // check the status code
  t.equal(response2.statusCode, 204, 'Update a distributor, OK. El código de respuesta es 204');

  // check all the fields of the updated distributor are the same as the payload
  const updatedDistributor = (await app.inject({
    url: '/distributors/' + response.json().id,
    method: 'GET'
  })).json()

  t.same(updatedDistributor, {
    id: updatedDistributor.id,
    name: 'tested',
    phone: 'tested',
    availability: 'tested',
    email: "testdistributors2@email.com"
  },
  'The updated distributor is the same as the payload'
  )

  // delete the created distributor
  await app.inject({
    url: '/distributors/' + response.json().id,
    method: 'DELETE'
  })

  // end the test
  t.end();
})

test("Update a distributor, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/1000',
    method: 'PUT',
    payload: {
      id: 1,
      name: 'test',
      phone: 'test',
      availability: 'test',
      email: "test@email.com",
      password: "1"
    }
  })

  t.equal(response.statusCode, 409, 'Update a distributor, not OK. El código de respuesta es 409');
  t.end();
})

test("Delete a distributor, OK", async (t) => {
  const app = await build(t)

  // create a distributor
  const response = await app.inject({
    url: '/distributors/',
    method: 'POST',
    payload: {
      name: 'test',
      phone: 'test',
      availability: 'test',
      email: "testdistributors3@email.com",
      password: "test"
    }
  })

  const response2 = await app.inject({
    url: '/distributors/' + response.json().id,
    method: 'DELETE'
  })

  t.equal(response2.statusCode, 204, 'Delete a distributor, OK. El código de respuesta es 204');
  t.end();
})

test("Delete a distributor, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/distributors/1000',
    method: 'DELETE'
  })

  t.equal(response.statusCode, 404, 'Delete a distributor, not OK. El código de respuesta es 404');
  t.end();
})