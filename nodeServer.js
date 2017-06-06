const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/elemeDB')
mongoose.connection.on("open", function() {
  console.log("连接上数据库啦")
});
mongoose.connection.on("error", function() {
  console.log("数据库出错啦")
});

const schema = mongoose.Schema
const aModel = new schema({ //定义数据类型
  seller: Object,
  goods: Array,
  ratings: Array
})

const MDL = mongoose.model('elemes', aModel) //创建或连接到指定集合
// var instance = new MDL()

app.use(bodyParser.json()) //request.body解析中间件
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/data', (req, res, next) => { //中间件
  console.log('查询总数据' + ' -- ' + new Date())
  next()
}, (req, res) => {
  MDL.find({}, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

app.get('/seller', (req, res, next) => {
  console.log('访问了seller数据' + ' -- ' + new Date())
  next()
}, (req, res) => {
  MDL.find({}, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.json(results[0].seller)
    }
  })
})

app.get('/ratings', (req, res, next) => {
  console.log('访问了ratings数据' + ' -- ' + new Date())
  next()
}, (req, res) => {
  MDL.find({}, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.json(results[0].ratings)
    }
  })
})

app.get('/goods', (req, res, next) => {
  console.log('访问了goods数据' + ' -- ' + new Date())
  next()
}, (req, res) => {
  MDL.find({}, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      res.json(results[0].goods)
    }
  })
})

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '.'))) //静态文件暴露
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
