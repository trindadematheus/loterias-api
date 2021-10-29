import axios from 'axios'
import cheerio from 'cheerio'

export default async function getLastedResult(url: string) {
  const res = await axios(url)
  const html = res.data;

  const $ = cheerio.load(html);

  let result: any = {
    tipoJogo: 'MEGA_SENA',
    dezenas: [],
    premiacoes: [],
    acumulacoes: [],
    resultadosAnteriores: []
  }

  const header = $('.lottery-totem__header').first()
  const mainCard = $('.lottery-totem__body__content.card').first()
  const lastResults = $('.result-card.lot-mega-sena')

  result.dataApuracao = header.find('.result__draw-date > strong').text()
  result.concurso = header.find('.result__draw > strong').text()
  result.localSorteio = header.find('.result__local > div > strong').text()
  result.valor = header.find('.result__prize__value').text()
  result.acumulou = mainCard.find('.text-center.text-uppercase.color-primary').length > 0

  // PREMIAÇÕES
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

        result.premiacoes.push(line)
      }
    })

  // ACUMULAÇÕES
  mainCard
    .find('.result__acumulations > div')
    .each((_, element) => {
      result.acumulacoes.push({
        titulo: $(element).find('strong').first().text(),
        valor: $(element).find('.lot-color').first().text()
      })
    })

  // DEZENAS SORTEADAS
  mainCard
    .find('.result__tens-grid > .lot-bg-light > span')
    .each((_, el) => {
      result.dezenas.push($(el).text())
    })

  lastResults.each((_, element) => {
    let line: any = {
      dezenas: []
    }

    line.data = $(element).find('.result-card__header .text-left strong').text()
    line.concurso = $(element).find('.result-card__header .text-right strong').text()
    line.valor = $(element).find('p strong').text()

    $(element).find('.result__tens-grid > .lot-bg-light > span')
      .each((_, el) => {
        line.dezenas.push($(el).text())
      })

    result.resultadosAnteriores.push(line)
  })

  return result
}

