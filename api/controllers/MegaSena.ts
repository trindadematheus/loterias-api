import { Route, Tags, Get, Path } from '@tsoa/runtime';

import getMegaSenaResult from '../services/getMegaSenaResult'
import { MEGA_SENA_API } from '../constants/api'

@Route('/api/megasena')
@Tags('Mega Sena')
class MegaSenaController {

  /**
   * @summary Resultado da Mega Sena - Use o número do concurso
   * especifico ou use 'last' para o último sorteio
   */
  @Get("/:concurso")
  async index(@Path() concurso: string): Promise<any> {
    return await getMegaSenaResult(
      concurso === 'last' ? MEGA_SENA_API : `${MEGA_SENA_API}/${concurso}`
    )
  }
}

export default new MegaSenaController();