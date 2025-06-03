import mongoose from "mongoose";

const pruebaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: false
  },
  contacto: {
    type: [String],
    required: false
  }
});

const Prueba = mongoose.model("Prueba", pruebaSchema);

export default Prueba;