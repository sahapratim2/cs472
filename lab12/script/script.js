
// Solution 1
Array.prototype.even = function () {
  return this.filter((element) => element % 2 === 0);
};

Array.prototype.odd = function () {
  return this.filter((element) => element % 2 !== 0);
};

const testArray = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(testArray.even()); // [2, 4, 6, 8]
console.log(testArray.odd()); // [1, 3, 5, 7]

//-------------------------------------------------------------------------------------------------------

// Solution 2

const http = require("http");
const fs = require("fs");
const { resolve } = require("path");

const server = http.createServer((request, response) => {
    let path = request.url;
    if(path.toLowerCase() === "/pdf"){
        fs.readFile('./file/lab9class.pdf', (err, data) => {
            if (err) {
                response.writeHead(400,{'Content-type':'text/html'});
                console.log(err);
                response.end("No such pdf");
            }else{
                response.writeHead(200, {'Content-type':'application/pdf'});
                response.end(data);
            }
            console.log("Request for pdf file!!!");
        })
    }
    else if(path.toLowerCase() === "/image"){
        fs.readFile('./file/happymood.jpeg', (err, data) => {
            if (err) {
                response.writeHead(400,{'Content-type':'text/html'});
                console.log(err);
                response.end("No such image");
            }else{
                response.writeHead(200, {'Content-type':'image/jpeg'});
                response.end(data);
            }
            console.log("Request for Image file!!!");
        }) 
    }
    else if(path.toLowerCase() === "/home"){
        response.end("Welcome to my website");
        
        console.log("Request for home page!!!");
    }
    else{
        response.writeHead(404);
        response.end("Error 404: Page not Found");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server has started...');
});
