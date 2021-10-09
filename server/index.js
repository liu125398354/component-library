/**
 * Created by liunannan on 2020/10/9.
 */

const api = require('./api');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html);
});

server.listen(3000);
console.log('success listen ......');
