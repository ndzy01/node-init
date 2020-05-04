const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('./config')
const router = require('./src/router')

const utils = require('./src/utils')

const app = express()
app.set('port', process.env.PORT || config.port)
app.use('/', express.static('./public/'))
// ## 文件上传
app.use('/uploads', express.static('./uploads/'))
utils.createDir('./uploads') // 文件夹如果不存在则创建

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
app.use(
  cors({
    origin: config.originUrl, //允许访问
    optionsSuccessStatus: 200,
  })
)

// ## 路由
// routerUtils
app.use('/', router.routerUtil)
app.use('/', router.uploadsUtil)

// ## 监听端口
app.listen(app.get('port'), () => {
  console.log(`app listening on port ${app.get('port')}!`)
})
