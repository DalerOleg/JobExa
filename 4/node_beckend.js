const http = require(`http`);
let requestCount = 0;
const server = http.createServer( (request, response) => {
    ++requestCount;
    response.write(`LOLOLOLO ` + requestCount)
    response.end()
});
server.listen(3000);
