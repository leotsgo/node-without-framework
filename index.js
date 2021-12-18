// Minha primeira API em node, sem utilizar framework algum

const http = require('http');
const url = require('url');

// O servidor responderá a todas as requisições com uma string
const server = http.createServer((req, res) => {
    // Obtendo o caminho
    const parsedUrl = url.parse(req.url, true); // transformando a url em objeto
    const path = parsedUrl.pathname; // pegando o caminho
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // removendo os / do início e do fim

    // Obtendo o método
    const method = req.method.toLowerCase();

    // Obtendo os parâmetros
    const queryString = parsedUrl.query;

    // Enviando a resposta
    res.end('Hello World\n');

    // Logando a requisição
    console.log(`Requisição recebida no caminho: ${trimmedPath} com o método ${method} e parâmetros ${queryString}`);
});

server.listen(3000, () => {
    console.log('O servidor está rodando na porta 3000');
    }); ;