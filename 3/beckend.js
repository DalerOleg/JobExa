
const http = require("http");
const fs = require("fs");
const path = require(`path`);

http.createServer(async (request, response) => {
  if (request.url == "/user") {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json
    console.log("----------------");

    if (user.login_send == "login1" && user.pass_send == "pass1") {
      console.log("ok");
      ///вывод файлов в папке
      fs.readdir(`.`, (err, data) => {
        console.log(data);
        data.forEach(file => {
          console.log(file + ` ` + path.extname(file));
          console.log(fs.statSync(`./` + file).size);
        });
      });
    } else {
      console.log("ne ok");
    }

    // // изменяем данные полученного объекта
    // user.name = user.name + " Smith";
    // user.age += 1;
    // // отправляем измененый объект обратно клиенту
    // response.end(JSON.stringify(user));
  }
  else {
    fs.readFile("index.html", (error, data) => response.end(data));
    console.log(`Пустой запрос`)
  }
}).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));