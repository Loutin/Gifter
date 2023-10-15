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

test('Get all clients, not OK', async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/clients/',
      method: 'GET'
    })
  
    t.equal(response.statusCode, 204, 'Get all clients, not OK. El código de respuesta es 204');
    t.end();
})

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
  
    t.equal(response.statusCode, 201, 'Create a client, OK. El código de respuesta es 201');
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
  
    const response = await app.inject({
      url: '/clients/1',
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
  
    t.equal(response.statusCode, 204, 'Update a client, OK. El código de respuesta es 204');
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
  
    t.equal(response.statusCode, 209, 'Update a client, not OK. El código de respuesta es 209');
    t.end();
  })

  test("Delete a client, OK", async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/clients/1',
      method: 'DELETE'
    })
  
    t.equal(response.statusCode, 204, 'Delete a client, OK. El código de respuesta es 204');
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