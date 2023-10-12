import businessesSchemas from "./businesses/businesses";
import clientsSchemas from "./clients/clients";
import distributorsSchemas from "./distributors/distributors";
import productsSchemas from "./products/products";
import ordersSchemas from "./orders/orders";

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
  ...ordersSchemas
}

export default schemas;