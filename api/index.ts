
import express, { response } from 'express'
import swaggerUi from 'swagger-ui-express'
import morgan from "morgan";

import MegaSena from './controllers/MegaSena'
import Federal from './controllers/Federal'

const app = express()
const port = 3000

app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.get('/api/megasena/:concurso', async (req, res) => {
  const response = await MegaSena.index(req.params.concurso)

  res.json(response)
})
app.get('/api/federal/:concurso', async (req, res) => {
  const response = await Federal.index(req.params.concurso)

  res.json(response)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
