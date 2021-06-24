import { Router } from "express";
const forExerciseController = require('../controller/forExercise.controller')

let routerForExercises = Router();

// Rutas Para Ejercicios

routerForExercises.get("/info", forExerciseController.getInfo);

export default routerForExercises;