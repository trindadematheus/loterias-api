import { VercelResponse } from '@vercel/node'

import getMegaSenaResult from '../services/getMegaSenaResult'
import { MEGA_SENA_API } from '../constants/api'

class MegaSenaController {
  async index({ req, res }: { req: any, res: VercelResponse }) {
    const concurso = req.params.concurso;

    const result = await getMegaSenaResult(
      concurso === 'lasted' ? MEGA_SENA_API : `${MEGA_SENA_API}/${concurso}`
    )

    return res.json(result)
  }
}

export default new MegaSenaController();