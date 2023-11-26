export interface OrderDetail {
  "id_product": number,
  "quantity": number
}

export interface Order {
  "id"?: number,
  "date": string,
  "id_client": number,
  "description": string,
  "id_business": number,
  "details": OrderDetail[]
}
