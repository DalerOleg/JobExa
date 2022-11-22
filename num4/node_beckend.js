// const http = require(`http`);
// let requestCount = 0;
// const server = http.createServer( (request, response) => {
//     ++requestCount;
//     response.write(`LOLOLOLO ` + requestCount)
//     response.end()
// });
// server.listen(3000);

//way1
// const fs = require(`fs`);
// const path = require(`path`);
// const student = require(`./one.json`);
// const csv = require('csv-parser')
;// fs.readFile(`test.js`, `utf-8`,(err,data) => {
//     console.log(data)  ;     
// });
// //way 2
// let text = fs.readFileSync(`test.js`, `utf-8`);
// console.log(text);
// console.log(`=============`)

// вывод файлов в папке
// fs.readdir(`test`, (err, data) => {
//     console.log(data); 
//     data.forEach(file => {
//         console.log(file+` `+path.extname(file));
//         console.log(fs.statSync(`test/`+file).size);
//     });
// });

//запись в файл
// fs.writeFile(`test/newfile.txt`, `!!!!!!!!!!!!!!!`, (err) => {
//     if (err) console.log(err);
// });

// запись json file

// const man = {
//     name: `Alex`,
//     age: 22,
//     deparment: `His`,
//     car: `vaz` 
// };

// fs.writeFile(`one.json`, JSON.stringify(man), (err) => {
//     if (err) console.log(`error`);
// });

// read json file

// console.log(student);

// read csv file

// const results = [];

// fs.createReadStream('./tab.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//   });

const http = require(`http`);
const url = require(`url`);
const {parse} = require(`querystring`);
// get -> получить обработать 
 http.createServer((request,response) => {
  console.log(`server work`);
  if (request.method == `GET`) {
  console.log(request.method);
  let urlRequest = url.parse(request.url, true);
  console.log(urlRequest.query.test);
  if (urlRequest.query.test % 2 ==0) {
    response.end(`even`);
  }
  response.end(`odd`);
}
else {
   //post
 let body = ``;
 request.on(`data`, chunk => {
 body += chunk.toString();
});
 request.on(`end`, () => {
   console.log(body);
   let params = parse(body);
   console.log(params);
   console.log(params.hi);
   response.end(`ok`);
 })
}
 }).listen(3000)

