import { Request, Response } from 'express';

import { FEDERAL_API } from '../constants/api'
import getFederalResult from '../services/getFederalResult';

class FederalController {
  async index(req: Request, res: Response) {
    const concurso = req.params.concurso;

    const result = await getFederalResult(
      concurso === 'last' ? FEDERAL_API : `${FEDERAL_API}/${concurso}`
    )

    return res.json(result)
  }
}

export default new FederalController();