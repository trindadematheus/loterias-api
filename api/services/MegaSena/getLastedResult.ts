import axios from 'axios'
import cheerio from 'cheerio'

export default async function getLastedResult() {
  const megaSenaUrl = 'https://supersena.com.br/megasena-resultado-hoje'

  const res = await axios(megaSenaUrl)
  const html = res.data;

  const $ = cheerio.load(html);

  let result: any = {}

  $('.font-weight-bold.lead.mt-3.alert-success.p-3.rounded').each((i, element) => {
    result.numbers = $(element).text().replace(/ /g, '').trim().split('-')
  })

  return result
}
