import express from 'express';
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('../server/openapi.json');
const passport = require('passport');

const router = express.Router();
import RouterProductos from "../routes/productos.routes";
import routerSession from "../routes/session.routes";
import routerForExercise from "../routes/forExercise.routes";
import routerCarrito from './carritos.routes';
import { graphqlHTTP } from 'express-graphql';
const schema = require('../graphQL/schema');

const routerProductos = new RouterProductos()

router.use('/', routerSession);
router.use('/api', passport.authenticate('jwt', { session: false }), routerProductos.start());
router.use('/api', passport.authenticate('jwt', { session: false }), routerCarrito);
router.use("/exercise", routerForExercise);
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

// Handle errors.
router.use(function (err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({ error: err });
});

export default router