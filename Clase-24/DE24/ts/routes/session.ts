import { Router } from "express";
const session = require( "../Controller/session.controller");
let routerSession = Router();

// Rutas para la Sesion
// /sesion
routerSession.get("/login", session.create);

routerSession.get("/logout", session.delete);



export default routerSession;