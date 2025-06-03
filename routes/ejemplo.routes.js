import { Router } from "express";
import {
    deleteEjemplo,
    getAllEjemplos,
    getEjemploById,
    postEjemplo,
    putEjemplo
} from "../controllers/ejemplo.controller.js";
const ejemplo = Router();


ejemplo.get('/', getAllEjemplos);

ejemplo.get('/:id', getEjemploById);

ejemplo.put('/:id', putEjemplo);

ejemplo.post('/', postEjemplo);

ejemplo.delete('/:id', deleteEjemplo);

export default ejemplo;