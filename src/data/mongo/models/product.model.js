import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const tasaSchema = new Schema({
  monedaDestino: { type: String, required: true },
  tasa: { type: Number, required: true },
}, { _id: true });

const datosTransferenciaSchema = new Schema({
  nombre: { type: String, required: true },  // Titular de la cuenta
  cbu: { type: String, required: true },     // Número de CBU
  alias: { type: String },                   // Alias de la cuenta (opcional)
}, { _id: false });

const productSchema = new Schema({
  imagen: { type: String, required: true },   // Imagen del producto
  nombre: { type: String, required: true },   // Nombre del producto
  moneda: { type: String, required: true },   // Moneda del producto
  cuenta: [datosTransferenciaSchema],         // Datos de transferencia
  tasas: [tasaSchema],                        // Tasas de cambio
}, {
  timestamps: true
});

// Aplicamos el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

// Creamos el modelo de producto con el esquema definido
const Product = model("products", productSchema);

export default Product;
