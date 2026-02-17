
import express, { response } from 'express'
import swaggerUi from 'swagger-ui-express'
import morgan from "morgan";
import {Resend} from "resend"

import MegaSena from './controllers/MegaSena'
import Federal from './controllers/Federal'

const app = express()
const port = 3000

const resend = new Resend("re_ZoYYe27R_9FGY9VEokbPpfs58iYUo4QmC");

app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    customCssUrl: 'https://unpkg.com/swagger-ui-dist@3.52.5/swagger-ui.css',
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.get('/api/megasena/:concurso', async (req, res) => {
  const response = await MegaSena.index(req.params.concurso)

  res.json(response)
})
app.get('/api/federal/:concurso', async (req, res) => {
  const response = await Federal.index(req.params.concurso)

  res.json(response)
})

app.post('/api/hotmart/webhook', async (req, res) => {
  try {
    const {data} = req.body;

    // do jeito que você pediu
    const email = data.buyer?.email;
    const buyerName = data.buyer?.name?.split(" ")?.[0] ?? "Olá";

    if (!email) {
      return res.status(400).json({ ok: false, error: "buyer.email ausente" });
    }

    const accessLink = "https://drive.google.com/drive/folders/1fHLilR0SgSI-Yc3fm2yvzI_DKcuo5LeK?usp=drive_link";
    const subject = "Acesso liberado: Guia Quaresma Transformadora";

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Oi, ${buyerName}!</p>
        <p>Seu pagamento foi confirmado ✅</p>
        <p>O acesso ao <strong>Guia Quaresma Transformadora</strong> já está liberado.</p>
        <p>
          Link de acesso:
          <a href="${accessLink}">${accessLink}</a>
        </p>
      </div>
    `;

    const from = "Quaresma Transformadora <nao-responda@melhoresprodutosdigitaisbr.com.br>";
    
    const result = await resend.emails.send({
      from,
      to: email,
      subject,
      html,
    });

   res.status(200).json({ ok: true, result });
  } catch (err) {
   res.status(500).json({
      ok: false,
      error: err?.message || "Erro desconhecido",
    });
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
