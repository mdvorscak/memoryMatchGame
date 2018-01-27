const express = require('express');
const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic('dist'));
app.listen(3000);

console.clear();
console.log('Production server listening at http://localhost:3000');
