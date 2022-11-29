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
      console.log("ok");
      response.end("autoriz OK");

      bot.start((ctx) => {
        ctx.reply('hello world!')
        ctx.telegram.sendMessage(adminId, 'Логин авторизованного пользователя: ' + user.login_send)
      })
      bot.command('info', (ctx) => ctx.reply('я ничего не умею'))
      bot.telegram.sendMessage(adminId, 'Логин пользователя: ' + user.login_send)
      bot.launch();

    } else {
      console.log("ne ok");
      response.end(null);
    }
  }
  else {
    fs.readFile("index.html", (error, data) => response.end(data));
    console.log("Пустой запрос")
  }

  if (request.url == "/dirRes") {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const textReq = Buffer.concat(buffers).toString();
    if (textReq == 'reqToDir') {
      let fileArr = [], fileArrMess;

      fs.readdir("./", (err, repository) => {
        repository.forEach(file => {
          //кэширование
          try {
            const success = cache.set('key', repository, 60)
            console.log(success)
        } catch (error) {
            console.log('error')
        }
        fileArr.push(file);
        console.log(fileArr);
        });
        fileArrMess = fileArr.toString();
        response.end(fileArrMess);
      });
    }

  }
  else {
    fs.readFile("index.html", (error, data) => response.end(data));
    console.log("Пустой запрос")
  }
}).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));