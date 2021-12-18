// Minha primeira API em node, sem utilizar framework algum

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World\n');
});

server.listen(3000, () => {
    console.log('O servidor está rodando na porta 3000');
    }); ;