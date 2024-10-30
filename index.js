const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

const ZENROWS_API_URL = "https://api.zenrows.com/v1/";
const ZENROWS_API_KEY = "a945dad5191652e8d2b89300f664f00f41e3d10c";

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
];

const app = express();
const port = 3000;

app.use(cors());

async function coletarAnunciosOLX(pesquisa, limite = 15) {
  const urlDefault = `https://www.olx.com.br/brasil?q=${encodeURIComponent(
    pesquisa
  )}`;
  // const urlEstados = `https://www.olx.com.br/estado-${encodeURIComponent}?q=${encodeURIComponent(
  // estado,
  // pesquisa
  // )}`;

  const urlOLX = `https://www.olx.com.br/brasil?q=${encodeURIComponent(
    pesquisa
  )}`;

  const headers = {
    "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    Referer: "https://www.google.com/",
  };

  const params = {
    url: urlOLX,
    apikey: ZENROWS_API_KEY,
    js_render: "true",
  };

  try {
    const response = await axios.get(ZENROWS_API_URL, { headers, params });

    if (response.status !== 200) {
      console.error(`Erro ao acessar o site da OLX: ${response.status}`);
      return null;
    }

    const $ = cheerio.load(response.data);
    const anuncios = [];
    const items = $("h2.olx-ad-card__title");

    items.each((i, item) => {
      if (i >= limite) return false;

      const titulo = $(item).text().trim();
      const precoTag = $(item)
        .closest(".olx-ad-card")
        .find(".olx-ad-card__details-price--horizontal h3.olx-ad-card__price");
      const preco = precoTag.length
        ? precoTag.text().trim()
        : "Preço não informado";
      const link = $(item).closest("a").attr("href") || "Link não disponível";

      const imagemTag =
        $(item).closest(".olx-ad-card").find("img").attr("src") ||
        "Imagem não disponível";

      anuncios.push({
        Título: titulo,
        Preço: preco,
        Link: link,
        Imagem: imagemTag,
      });
    });

    return anuncios;
  } catch (error) {
    console.error(`Erro durante a requisição: ${error}`);
    return null;
  }
}

app.get("/api/anuncios", async (req, res) => {
  const { pesquisa } = req.query;

  if (!pesquisa) {
    return res
      .status(400)
      .json({ error: "O parâmetro 'pesquisa' é obrigatório." });
  }

  const anuncios = await coletarAnunciosOLX(pesquisa);

  if (!anuncios) {
    return res.status(500).json({ error: "Erro ao coletar os anúncios." });
  }

  res.json(anuncios);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
