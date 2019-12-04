let fs = require('fs');
let qiniu = require("qiniu");
let core = require('@actions/core');

qiniu.conf.ACCESS_KEY = core.getInput('QN_ACCESS_KEY');
qiniu.conf.SECRET_KEY = core.getInput('QN_SECRET_KEY');
let bucket = 'shenzhen';
let key = 'websites.json';

let putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key);

// 生成上传 Token
let token = putPolicy.token();

// 构造上传函数
function uploadFile(uptoken, key, localFile) {
  let extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}

module.exports = function(data) {
  fs.writeFileSync('./tmp.json', data)
  uploadFile(token, key, './tmp.json');
}