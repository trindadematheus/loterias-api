import { Route, Tags, Get, Path } from '@tsoa/runtime';

import getMegaSenaResult from '../services/getMegaSenaResult'
import { MEGA_SENA_API } from '../constants/api'

@Route('/api/megasena')
@Tags('Mega Sena')
class MegaSenaController {

  /**
   * use 'last' if you want get the last result
   */
  @Get("/:concurso")
  async index(@Path() concurso: string): Promise<any> {
    return await getMegaSenaResult(
      concurso === 'last' ? MEGA_SENA_API : `${MEGA_SENA_API}/${concurso}`
    )
  }
}

export default new MegaSenaController();