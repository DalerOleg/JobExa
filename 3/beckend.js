const http = require("http");
const fs = require("fs");

const { Telegraf } = require('telegraf')
const bot = new Telegraf('5989244834:AAE7w6UfzPsd6Aey_omTY1AnnVwYB93QSrs')
const adminId = '1376103570' // id аккаунта в telegram

const Ncache = require("node-cache")
const cache = new Ncache({ stdTTL: 60, checkperiod: 120 })

http.createServer(async (request, response) => {
  if (request.url == "/user") {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data);

    if (user.login_send == "login1" && user.pass_send == "pass1") {
      const errore_html = {
        html_code: "<p> cocococococcococococo </p>",
    };
      console.log("ok");
      console.log(JSON.stringify(errore_html));
      response.end(JSON.stringify(errore_html));
      
    } else {
      console.log("ne ok");
      
    }
  }
  ////
  if (request.url == "/downloadFile") {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();

    
    console.log(data);
    response.end(data);
  }
  /////

  else {
    fs.readFile("index.html", (error, data) => response.end(data));
    console.log("Пустой запрос")
  }
}).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));