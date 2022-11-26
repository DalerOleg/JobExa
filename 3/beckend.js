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

    if (user.login_send == "login1" && user.pass_send == "pass1") {
      console.log("ok");
      response.end("autoriz OK");
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