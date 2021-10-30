import { Get, Path, Route, Tags } from 'tsoa';

import { FEDERAL_API } from '../constants/api'
import getFederalResult from '../services/getFederalResult';

@Route('/api/federal')
@Tags('Federal')
class FederalController {

  /**
   * @summary Resultado da Federal - Use o número do concurso
   * especifico ou use 'last' para o último sorteio
   */
  @Get("/:concurso")
  async index(@Path() concurso: string): Promise<any> {
    return await getFederalResult(
      concurso === 'last' ? FEDERAL_API : `${FEDERAL_API}/${concurso}`
    )
  }
}

export default new FederalController();