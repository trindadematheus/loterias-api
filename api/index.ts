
import express from 'express'

import MegaSena from './controllers/MegaSena'
import Federal from './controllers/Federal'

const app = express()
const port = 3000

app.get('/api/megasena/:concurso', MegaSena.index)

app.get('/api/federal/:concurso', Federal.index)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
