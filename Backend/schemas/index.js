import businessesSchemas from "./businesses/businesses.js";
import clientsSchemas from "./clients/clients.js";
import distributorsSchemas from "./distributors/distributors.js";
import productsSchemas from "./products/products.js";
import ordersSchemas from "./orders/orders.js";
import deliveriesSchemas from "./deliveries/deliveries.js";

const generic204ResponseSchema = {
  $id: "generic204ResponseSchema",
  "description": "Ok. No content.",
  type: "null",
}

const generic404ResponseSchema = {
  $id: "generic404ResponseSchema",
  "description": "Not found.",
  type: "null",
}

const schemas = {
  generic204ResponseSchema, generic404ResponseSchema,
  ...businessesSchemas,
  ...clientsSchemas,
  ...distributorsSchemas,
  ...productsSchemas,
  ...ordersSchemas,
  ...deliveriesSchemas
}

export default schemas;