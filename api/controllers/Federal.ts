import { Get, Path, Route, Tags } from 'tsoa';

import { FEDERAL_API } from '../constants/api'
import getFederalResult from '../services/getFederalResult';

@Route('/api/federal')
@Tags('Federal')
class FederalController {

  /**
   * use 'last' if you want get the last result
   */
  @Get("/:concurso")
  async index(@Path() concurso: string): Promise<any> {
    return await getFederalResult(
      concurso === 'last' ? FEDERAL_API : `${FEDERAL_API}/${concurso}`
    )
  }
}

export default new FederalController();