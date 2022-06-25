/**
 * Created by liunannan on 2020/10/9.
 */

const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const session = require('express-session')
// const cookieParser = require('cookie-parser');
// express中是把session信息存储在内存中
// 配置session
// app.use(cookieParser)
app.use(session({
  secret: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d', // 设置签名秘钥 内容可以任意填写
  cookie: { maxAge: 80 * 1000 }, // 设置cookie的过期时间，例：80s后    session和相应的cookie失效过期
  resave: true, // 强制保存，如果session没有被修改也要重新保存
  saveUninitialized: false // 如果原先没有session那么久设置，否则不设置
}))
const server = require('http').Server(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(api)
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

server.listen(3000)
console.log('success listen ......')
