import { VercelResponse } from '@vercel/node'

import getLastedResult from "../../services/MegaSena/getLastedResult";

class MegaSenaController {
  async index({ res }: { res: VercelResponse }) {
    const result = await getLastedResult()

    res.json(result)
  }
}

export default new MegaSenaController();