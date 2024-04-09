const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const port = 3000;

// 设置任何域名都可以访问
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });
app.use(cors());
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 传输 pdf 流
app.get('/pdf', (req, res) => {
    let filePath = path.resolve(__dirname, './test.pdf');
    let fileStream = fs.createReadStream(filePath);
    let stat = fs.statSync(filePath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'inline; filename=test.pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    fileStream.pipe(res);
});
 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});