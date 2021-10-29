
import express from 'express'

import MegaSena from './controllers/MegaSena'

const app = express()
const port = 3000

app.get('/megasena/:concurso', (req, res) => {
  //@ts-ignore
  MegaSena.index({ req, res })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
