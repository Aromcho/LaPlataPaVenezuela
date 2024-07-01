import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const tasaSchema = new Schema({
  monedaDestino: { type: String, required: true },
  tasa: { type: Number, required: true },
}, { _id: true });

const productSchema = new Schema({
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  moneda: { type: String, required: true },
  tasas: [tasaSchema],
}, {
  timestamps: true
});

// Aplicamos el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

// Creamos el modelo de producto con el esquema definido
const Product = model("products", productSchema);

export default Product;
