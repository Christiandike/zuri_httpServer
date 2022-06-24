//importing node modules
const http = require('http');
const fs = require('fs');

//setting the content type
const htmlContent = {'Content-Type': 'text/html'};

//a function to render the html to the client
function renderHTML(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if(err) {
      res.writeHead(404, htmlContent);
      res.end('<h3>Page Not Found</h3>')
    } else {
      res.end(content);
    }
  });
}

const server = http.createServer((req, res) => {
  res.writeHead(200, htmlContent);
  
  const url = req.url;
  
  //creating routes for rendering different pages
  switch(url) {
    case '/':
      renderHTML('./home.html', res);
      break;
    case '/about':
      renderHTML('./about.html', res);
      break;
    case '/contact':
      renderHTML('./contact.html', res);
      break;
    case '/home':
      res.writeHead(307, {'location': '/'});
      res.end();
      break;
    default:
      res.writeHead(404, htmlContent);
      res.end('<h3>Page Not Found</h3>');
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
});