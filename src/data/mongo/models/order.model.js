import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema({
    user_id: { type: Types.ObjectId, required: true, ref: "users", index: true },  // Usuario que envía

    quantity: { type: Number, default: 1 },
    state: { type: String, default: "reserver", enum: ["reserver", "payed", "delivered"], index: true },
    nameReceiver: { type: String, required: true },  // Nombre del receptor
    fromCurrency: { type: String, required: true },  // Moneda desde la que se envía
    fromAmount: { type: Number, required: true },    // Monto enviado
    toCurrency: { type: String, required: true },    // Moneda a la que se convierte
    toAmount: { type: Number, required: true },      // Monto recibido
    
    // Comprobantes
    userReceipt: { type: String },  // Comprobante subido por el usuario
    adminReceipt: { type: String }, // Comprobante enviado por el administrador al usuario
    
}, {
    timestamps: true
});

// Pre hooks para autopopular los campos user_id
schema.pre('find', function() {
    this.populate('user_id', "email name -_id");
});

schema.pre('findOne', function() {
    this.populate('user_id', "email name -_id");
});

const Order = model(collection, schema);
export default Order;
