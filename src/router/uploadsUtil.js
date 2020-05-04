const express = require('express')
const path = require('path')
const multer = require('multer')
const config = require('../../config')
const utils = require('../utils')
const db = require('../db')

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../uploads'),
  filename(_req, file, callback) {
    callback(null, utils.formatData(new Date()) + '_' + file.originalname)
  },
})
// 只允许上传图片
/*
const fileFilter = function (_req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    const err = new Error('只允许上传图片类型文件！')
    err.code = 'CODE_INVALID_FILE_TYPE'
    cb(err, false)
  }
}
*/
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024*1024,
  },
  // fileFilter,
}).single('file')

const uploadsUtil = express.Router()

uploadsUtil.post('/upload', (req, res) => {
  upload(req, res, (error) => {
    let resp
    if (error) {
      let message = '上传失败！'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '文件大小超出上限！！'
      }
      // if (error.code === 'LIMIT_FILE_SIZE') {
      //   message = '图片不允许超过2M！'
      // } else if (error.code === 'CODE_INVALID_FILE_TYPE') {
      //   message = error.message
      // }
      resp = {
        code: -1,
        message,
      }
    } else {
      const fileName = encodeURIComponent(req.file.filename)
      const url = `${config.imgUrl}/${fileName}`
      resp = {
        code: 1,
        data: {
          url,
        },
      }
      db.run(
        `insert into tb_file (id,name,type) values ('${utils.getRandomCode(
          20
        )}','${fileName}', '${req.file.mimetype.split('/')[0]}')`
      )
    }
    res.json(resp)
  })
})
module.exports = uploadsUtil
