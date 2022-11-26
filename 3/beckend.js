
const http = require("http");
const fs = require("fs");

http.createServer(async (request, response) => {
  if (request.url == "/user") {
    const buffers = [];
    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data);
    console.log("----------------");

    if (user.login_send == "login1" && user.pass_send == "pass1") {
      console.log("ok");
      //вывод файлов в папке
      fs.readdir(`./`, (err, repository) => {
        console.log(repository);
        repository.forEach(file => {
          console.log(fs.statSync(`./` + file).size);
        });
      });
      response.end();
    } else {
      
      console.log("ne ok");
      

    }
  }
  else {
    fs.readFile("index.html", (error, data) => response.end(data));
    console.log(`Пустой запрос`)
  }
}).listen(3000, () => console.log("Сервер запущен по адресу http://localhost:3000"));