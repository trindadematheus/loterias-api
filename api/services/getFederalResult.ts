import axios from 'axios'
import cheerio from 'cheerio'

export default async function getFederalResult(url: string) {
  const res = await axios(url)
  const html = res.data;

  const $ = cheerio.load(html);

  let result: any = {
    tipoJogo: 'FEDERAL',
    resultadosAnteriores: []
  }

  const header = $('.lottery-totem__header').first()
  const mainCard = $('.lottery-totem__body__content.card').first()
  const lastResults = $('.result-card.lot-loteria-federal')

  result.dataApuracao = header.find('.result__draw-date > strong').text()
  result.concurso = header.find('.result__draw > strong').text()
  result.localSorteio = header.find('.result__local > div > strong').text()
  result.valor = header.find('.result__prize__value').text()

  // RESULTADOS
  let resultados = [];
  mainCard
    .find('.result__federal-item')
    .each((_, element) => {
      resultados.push({
        posicao: $(element).find('strong').text(),
        numero: $(element).find('.result__federal-item__val.lot-bg').text(),
      })
    })

  // PREMIACOES
  let premiacoes = [];
  mainCard
    .find('.result__table-prize tr')
    .each((idx, element) => {
      if (idx > 0) {
        let line = {
          premiacao: '',
          ganhadores: '',
          premio: ''
        }

        $(element).find('td').each((i, el) => {
          switch (i) {
            case 0:
              line.premiacao = $(el).text()
              break;
            case 1:
              line.ganhadores = $(el).text()
              break;
            case 2:
              line.premio = $(el).text()
              break;
            default:
              break;
          }
        })

        premiacoes.push(line)
      }
    })

  const resultadoCompleto = resultados.reduce((acc, res) => {
    const finded = premiacoes.find(pre => pre.premiacao.includes(res.posicao))

    if (!finded) return;

    acc.push({
      ...res,
      ...finded
    })

    return acc;
  }, [])

  // ULTIMOS RESULTADOS
  lastResults.each((_, element) => {
    let line: any = {
      dezenas: []
    }

    line.data = $(element).find('.result-card__header .text-left strong').text()
    line.concurso = $(element).find('.result-card__header .text-right strong').text()
    line.valor = $(element).find('p strong').text()

    $(element).find('.result__federal-item__val.lot-bg')
      .each((_, el) => {
        line.dezenas.push($(el).text())
      })

    result.resultadosAnteriores.push(line)
  })

  return { ...result, resultados: resultadoCompleto }
}
