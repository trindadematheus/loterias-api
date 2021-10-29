import { VercelResponse } from '@vercel/node'

import { FEDERAL_API } from '../constants/api'
import getFederalResult from '../services/getFederalResult';

class FederalController {
  async index({ req, res }: { req: any, res: VercelResponse }) {
    const concurso = req.params.concurso;

    const result = await getFederalResult(
      concurso === 'last' ? FEDERAL_API : `${FEDERAL_API}/${concurso}`
    )

    return res.json(result)
  }
}

export default new FederalController();