const http = require("http");
const fs = require("fs");

const { Telegraf } = require('telegraf')
const bot = new Telegraf('5989244834:AAE7w6UfzPsd6Aey_omTY1AnnVwYB93QSrs') // ссылка на бота http://t.me/Badestbotonplanet_bot
const adminId = '1376103570' // можно поменять для теста

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
        ctx.reply('Добро пожаловать, можете мне не писать, я не отвечу. Ваш, Бот!')
        ctx.telegram.sendMessage(adminId, 'Логин пользователя: ' + user.login_send)
      })
      bot.command('info', (ctx) => ctx.reply('Я создан ТОЛЬКО для того, чтобы показать навыки Хозяина'))
      bot.telegram.sendMessage(adminId, 'Логин пользователя: ' + user.login_send)
      bot.launch()// знаю что крашит при обновлении страницы, не могу понять как прекращать работу бота при обновлении страницы

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
          //кэштрование
          try {
            const success = cache.set('key', repository, 60)
            console.log(success)
        } catch (error) {
            console.log('error')
        }
        ///
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