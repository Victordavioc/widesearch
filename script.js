const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

const ZENROWS_API_URL = 'https://api.zenrows.com/v1/';

const ZENROWS_API_KEY = '00b37a7cc5282bc56764eae54a6b3679c62f65e6';

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
];

async function coletarAnunciosOLX(pesquisa, limite = 15) {
    const urlOLX = `https://www.olx.com.br/brasil?q=${encodeURIComponent(pesquisa)}`;

    const headers = {
        'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://www.google.com/'
    };

    const params = {
        url: urlOLX,
        apikey: ZENROWS_API_KEY,
        js_render: 'false' 
    };

    try {
        const response = await axios.get(ZENROWS_API_URL, { headers, params });

        if (response.status === 200) {
            console.log("Conexão bem-sucedida via ZenRows!");
        } else {
            console.error(`Erro ao acessar o site da OLX: ${response.status}`);
            console.error(`Motivo: ${response.data}`);
            return;
        }

        const´ $ = cheerio.load(response.data);

        const anuncios = [];
        const items = $('h2.olx-ad-card__title');

        items.each((i, item) => {
            if (i >= limite) return false; 

            const titulo = $(item).text().trim();
            const precoTag = $(item).next('h3.olx-ad-card__price');
            const preco = precoTag.length ? precoTag.text().trim() : "Preço não informado";
            const link = $(item).closest('a').attr('href') || "Link não disponível";

            anuncios.push({
                Título: titulo,
                Preço: preco,
                Link: link
            });
        });

        return anuncios;
        
    } catch (error) {
        console.error(`Erro durante a requisição: ${error}`);
        return null;
    }
}

function mostrarAnuncios(anuncios) {
    if (anuncios && anuncios.length > 0) {
        anuncios.forEach(anuncio => {
            console.log(`Título: ${anuncio.Título}`);
            console.log(`Preço: ${anuncio.Preço}`);
            console.log(`Link: ${anuncio.Link}`);
            console.log('----------------------------');
        });
    } else {
        console.log("Nenhum anúncio encontrado.");
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



rl.question("Digite o produto que deseja buscar: ", async (pesquisa) => {
    const anuncios = await coletarAnunciosOLX(pesquisa);
    mostrarAnuncios(anuncios);
    rl.close(); 
});

