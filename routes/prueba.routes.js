import { Router } from "express";
import {
    deletePrueba,
    getAllPruebas,
    getPruebaById,
    postPrueba,
    putPrueba
} from "../controllers/prueba.controller.js";
const prueba = Router();


prueba.get('/', getAllPruebas);

prueba.get('/:id', getPruebaById);

prueba.put('/:id', putPrueba);

prueba.post('/', postPrueba);

prueba.delete('/:id', deletePrueba);

export default prueba;