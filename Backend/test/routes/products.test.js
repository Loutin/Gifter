import { test } from 'tap'
import { build } from '../helper.js'

test('Get all products, OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get all products, OK. El código de respuesta es 200');
  t.end();
})

test('Get all products, not OK', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/',
    method: 'GET'
  })

  t.equal(response.statusCode, 204, 'Get all products, not OK. El código de respuesta es 204');
  t.end();
})

test("Get a product, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/1',
    method: 'GET'
  })

  t.equal(response.statusCode, 200, 'Get a product, OK. El código de respuesta es 200');
  t.end();
})

test("Get a product, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/1000',
    method: 'GET'
  })

  t.equal(response.statusCode, 404, 'Get a product, not OK. El código de respuesta es 404');
  t.end();
})

test("Create a product, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/',
    method: 'POST',
    payload: {
      name: 'test',
      type: 'test',
      description: 'test',
      price: 200,
      id_business: 1
    }
  })

  t.equal(response.statusCode, 201, 'Create a product, OK. El código de respuesta es 201');
  t.end();
})

test("Create a product, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/',
    method: 'POST',
    payload: {
      names: 'test',
      types: 'test',
      descriptions: 'test',
      prices: 200,
      id_businesss: 1000
    }
  })

  t.equal(response.statusCode, 400, 'Create a product, not OK. El código de respuesta es 400');
  t.end();
})

test("Update a product, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/1',
    method: 'PUT',
    payload: {
      id: 1,
      name: 'test',
      type: 'test',
      description: 'test',
      price: 200,
      id_business: 1
    }
  })

  t.equal(response.statusCode, 204, 'Update a product, OK. El código de respuesta es 204');
  t.end();
})

test("Update a product, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/1000',
    method: 'PUT',
    payload: {
      id: 1,
      name: 'test',
      type: 'test',
      description: 'test',
      price: 200,
      id_business: 1
    }
  })

  t.equal(response.statusCode, 209, 'Update a product, not OK. El código de respuesta es 209');
  t.end();
})

test("Delete a product, OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/1',
    method: 'DELETE'
  })

  t.equal(response.statusCode, 204, 'Delete a product, OK". El código de respuesta es 204');
  t.end();
})

test("Delete a product, not OK", async (t) => {
  const app = await build(t)

  const response = await app.inject({
    url: '/products/1000',
    method: 'DELETE'
  })

  t.equal(response.statusCode, 404, 'Delete a product, not OK. El código de respuesta es 404');
  t.end();
})