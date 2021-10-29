
import express from 'express'

import MegaSena from './controllers/MegaSena'
import Federal from './controllers/Federal'

const app = express()
const port = 3000

app.get('/api/megasena/:concurso', (req, res) => {
  //@ts-ignore
  MegaSena.index({ req, res })
})

app.get('/api/federal/:concurso', (req, res) => {
  //@ts-ignore
  Federal.index({ req, res })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
