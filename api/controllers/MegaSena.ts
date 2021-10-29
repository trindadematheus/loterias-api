import { Response, Request } from 'express'

import getMegaSenaResult from '../services/getMegaSenaResult'
import { MEGA_SENA_API } from '../constants/api'

class MegaSenaController {
  async index(req: Request, res: Response) {
    const concurso = req.params.concurso;

    const result = await getMegaSenaResult(
      concurso === 'last' ? MEGA_SENA_API : `${MEGA_SENA_API}/${concurso}`
    )

    return res.json(result)
  }
}

export default new MegaSenaController();