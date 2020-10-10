/**
 * Created by liunannan on 2020/10/9.
 */

const express = require('express')
const fs = require('fs')
const formidable = require('formidable')
const router = express.Router()

router.post('/api/apk/upload', (req, res) => {
  function common(allFiles) {
    let oldPath = __dirname + '/' + allFiles.path
    let splitName = allFiles.name.split('.')
    let splitPath = allFiles.path.split('_')
    let fileName = splitPath[splitPath.length - 1]
    let extName = '.' + splitName[splitName.length - 1]
    let newPath = __dirname + '/uploadFile/' + fileName + extName
    fs.rename(oldPath, newPath, function(err) {
      if (err) {
        console.log('fail: ' + err)
      }
    })
  }

  let form = new formidable.IncomingForm()
  form.multiples = true;
  form.uploadDir = './uploadFile'
  form.maxFileSize = 600 * 1024 * 1024
  form.parse(req, function(err, fields, files) {
    let allFiles = files.file
    // console.log('files--->', files)
    console.log('文件信息---->',allFiles)
    let poster = files.poster
    if (allFiles) {
      if (allFiles.length === undefined) {
        common(allFiles)
      } else {
        allFiles.forEach(function(value, index) {
          let oldPath = __dirname + '/' + value.path
          let splitName = value.name.split('.')
          let splitPath = value.path.split('_')
          let fileName = splitPath[splitPath.length - 1]
          let extName = '.' + splitName[splitName.length - 1]
          let newPath = __dirname + '/uploadFile/' + fileName + extName
          fs.rename(oldPath, newPath, function(err) {
            if (err) {
              console.log('fail: ' + err)
            }
          })
        })
      }
    }
    if (poster) {
      common(poster)
    }
    res.json({
      errno: 0,
      status: 'succeed'
    })
  })
})


module.exports = router