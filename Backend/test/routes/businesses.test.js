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

test('Get all businesses, not OK', async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/businesses/',
      method: 'GET'
    })
  
    t.equal(response.statusCode, 204, 'Get all businesses, not OK. El código de respuesta es 204');
    t.end();
})

test("Get a business, OK", async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/businesses/1',
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
  
    t.equal(response.statusCode, 201, 'Create a business, OK. El código de respuesta es 201');
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
        emails: "test@email.com",
        passwords: "1000"
      }
    })
  
    t.equal(response.statusCode, 400, 'Create a business, not OK. El código de respuesta es 400');
    t.end();
  })
  
  test("Update a business, OK", async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/businesses/1',
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
  
    t.equal(response.statusCode, 204, 'Update a business, OK. El código de respuesta es 204');
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
  
    t.equal(response.statusCode, 209, 'Update a business, not OK. El código de respuesta es 209');
    t.end();
  })

  test("Delete a business, OK", async (t) => {
    const app = await build(t)
  
    const response = await app.inject({
      url: '/businesses/3',
      method: 'DELETE'
    })
  
    t.equal(response.statusCode, 204, 'Delete a business, OK. El código de respuesta es 204');
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
