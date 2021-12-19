// Minha primeira API em node, sem utilizar framework algum

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

    // Obtendo os headers
    const headers = req.headers;

    // Obtendo o payload, se ele existir
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        // Escolhendo o handler adequado
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Criando o objeto data
        const data = {
          trimmedPath,
          queryString,
          method,
          headers,
          payload: buffer,
        }

        // Chamando o handler
        chosenHandler(data, (statusCode, payload) => {
          // usando o statusCode e o payload para responder
          statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
          payload = typeof(payload) === 'object' ? payload : {};

          // Convertendo o payload em string
          const payloadString = JSON.stringify(payload);

          // Enviando a resposta
          res.setHeader('Content-Type', 'application/json');
          res.writeHead(statusCode);
          res.end(payloadString);

          // Logando a requisição
          console.log(`Retornando a resposta com codigo: ${statusCode} e payload: ${payloadString}`);
        });


    });
});

server.listen(3000, () => {
    console.log('O servidor está rodando na porta 3000');
}); ;

// Define os handlers
const handlers = {};

// Sample handler
handlers.sample = (data, callback) => { 
  callback(406, {'name': 'sample handler'});
};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};


// Define as rotas
const router = {
  'sample' : handlers.sample,
}

