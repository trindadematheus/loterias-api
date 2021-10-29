import Hetter from "hetter"

import MegaSena from "./controllers/MegaSena"

module.exports = async (req: any, res: any) => {
  const Route = new Hetter(req, res)

  Route.get('/megasena', MegaSena.index)
}
