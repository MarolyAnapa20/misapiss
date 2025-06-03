import ejemplo from './ejemplo.routes.js';
import prueba from './prueba.routes.js';
import { Router } from 'express';
const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/prueba', prueba);

export default indexRoutes;