import { Router } from 'express-async-router'
import swaggerUi from 'swagger-ui-express'

// import swaggerDocument from '../config/swagger.json';

const swaggerDocs = (router: Router) =>
  router.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(/* swaggerDocument */)
  )

export default [swaggerDocs]
