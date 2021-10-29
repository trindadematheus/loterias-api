import Hetter from "hetter"

import MegaSena from "./controllers/MegaSena"
import Federal from "./controllers/Federal"

module.exports = async (req: any, res: any) => {
  const Route = new Hetter(req, res)

  Route.get('/megasena/:concurso', MegaSena.index)
  Route.get('/federal/:concurso', Federal.index)
}
