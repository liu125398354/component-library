/**
 * Created by liunannan on 2020/10/9.
 */

const express = require('express')
const fs = require('fs')
const multiparty = require('multiparty')
const formidable = require('formidable')
const router = express.Router()

router.post('/api/video/getblob', (req, res) => {
  try {
    let data = fs.readFileSync('../src/assets/video/example.mp4')
    // console.log(mockData)
    res.json({
      errno: 1,
      data: data
    })
  } catch (e) {
    console.log('error')
    res.send(e)
  }
})

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

router.post('/api/uploadChunk', async function(req, res) {

  let form = new multiparty.Form(); //新建表单
  //设置编辑
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "./tempCopy"; // "Uploads/";
  //设置单文件大小限制
  // form.maxFilesSize = 200 * 1024 * 1024;
  /*form.parse表单解析函数，fields是生成数组用获传过参数，files是bolb文件名称和路径*/
  try {
    let [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject('test err');
        resolve([fields, files]);
      })
    })
    files = files['file'][0]; //获取bolb文件
    let index = fields['index'][0]; //当前片数
    let total = fields['total'][0]; //总片数
    let name = fields['name'][0]; //文件名称

    let url = './tempCopy/' + name + index; //临时bolb文件新名字
    fs.renameSync(files.path, url); //修改临时文件名字

    let pathname = './uploadFile/' + name; // 上传文件存放位置和名称
    if (index == total) { // 当最后一个分片上传成功，进行合并
      // 检查文件是存在，如果存在，重新设置名称
      let NonExist = await new Promise((resolve, reject) => {
        fs.access(pathname, fs.F_OK, (err) => {
          resolve(err);
        });
      })
      let md5 = fields['md5'][0]; //md5值
      let info = fields['info'][0]
      console.log('md5值--->',md5)
      console.log('文件信息--->',info)
      console.log(NonExist)
      if (!NonExist) {
        let myDate = Date.now();
        pathname = './uploadFile/' + myDate + name;
      }
      //logs.info('上传文件：' + pathname);
      console.log('上传文件：' + pathname);
      /*进行合并文件，先创建可写流，再把所有BOLB文件读出来，
          流入可写流，生成文件
          fs.createWriteStream创建可写流
          aname是存放所有生成bolb文件路径数组:
          ['Uploads/3G.rar1','Uploads/3G.rar2',...]
      */
      let writeStream = fs.createWriteStream(pathname);
      let aname = [];
      for (let i = 1; i <= total; i++) {
        let url = './tempCopy/' + name + i;
        let data = await new Promise(function (resolve, reject) {
          fs.readFile(url, function (error, data) {
            if (error) reject(error);
            resolve(data);
          });
        });
        //把数据写入流里
        writeStream.write(data);
        //删除生成临时bolb文件
        fs.unlink(url, () => {});
      }
      writeStream.end();
      //返回给客户端，上传成功
      let data = JSON.stringify({
        'code': 0,
        'index': index,
        'msg': '上传成功'
      });
      res.send(data); //返回数据
    } else { //还没有上传文件，请继续上传
      let data = JSON.stringify({
        'code': 1,
        'index': index,
        'msg': '继续上传'
      });
      res.send(data); //返回数据
    }
  } catch (e) {
    //logs.info(e);
    console.log(e)
    res.send(e); //返回数据
  }
})


module.exports = router
