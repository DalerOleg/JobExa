// const http = require("http");
// const fs = require("fs");

// http.createServer(async (request, response) => {

//     let body = ``;
//     request.on(`data`, chunk => {
//         body += chunk.toString();
//     });
//     request.on(`end`, () => {
//         console.log(body);
//         response.end(`ok`);
//     })
//     }).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));

const http = require("http");
const fs = require("fs");
 
http.createServer(async (request, response) => {
      
    if(request.url == "/user"){
         console.log("err1");
          const buffers = [];
          for await (const chunk of request) {
            console.log("err2");
            buffers.push(chunk);
            console.log("err3");
          }
          console.log("err4");
        const data = Buffer.concat(buffers).toString();
        console.log("err5");
        const user = JSON.parse(data); // парсим строку в json
        console.log("err6");
        // // изменяем данные полученного объекта
        // user.name = user.name + " Smith";
        // user.age += 1;
        // // отправляем измененый объект обратно клиенту
        // response.end(JSON.stringify(user));
    }
    else{
        fs.readFile("index.html", (error, data) => response.end(data));
        console.log(`eRrrororororo`)
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));