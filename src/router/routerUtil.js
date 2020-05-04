const express = require('express')
const utils = require('../utils')

const db = require('../db')

const routerUtil = express.Router()
routerUtil.use(function (req, res, next) {
  db.run(
    `insert into tb_router (id,path,method) values ('${utils.getRandomCode(
      20
    )}','${req.path}', '${req.method}')`,
    function () {
      console.log(
        `
    ****** start
    请求时间：${utils.formatData(new Date())}
    请求路径：${req.path}
    请求方法：${req.method}
    ****** end
    `
      )
      next()
    }
  )
})

module.exports = routerUtil
