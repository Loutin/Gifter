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

test('Get all distributors, not OK', async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/distributors/',
      method: 'GET'
    })
  
    t.equal(response.statusCode, 204, 'Get all distributors, not OK. El código de respuesta es 204');
    t.end();
})

test("Get a distributor, OK", async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/distributors/1',
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
  
    t.equal(response.statusCode, 201, 'Create a distributor, OK. El código de respuesta es 201');
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
  
    const response = await app.inject({
      url: '/distributors/1',
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
  
    t.equal(response.statusCode, 204, 'Update a distributor, OK. El código de respuesta es 204');
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
  
    t.equal(response.statusCode, 209, 'Update a distributor, not OK. El código de respuesta es 209');
    t.end();
  })

  test("Delete a distributor, OK", async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/distributors/1',
      method: 'DELETE'
    })
  
    t.equal(response.statusCode, 204, 'Delete a distributor, OK. El código de respuesta es 204');
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