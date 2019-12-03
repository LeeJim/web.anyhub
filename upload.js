var fs = require('fs');
var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key';
qiniu.conf.SECRET_KEY = 'Secret_Key';
bucket = 'Bucket_Name';
key = 'websites.json';

var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key);

//生成上传 Token
token = putPolicy.token();

//要上传文件的本地路径
filePath = './ruby-logo.png'

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
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

//调用uploadFile上传
uploadFile(token, key, filePath);
module.exports = function(data) {
    // fs.createWriteStream('./tmp.json', )
    qiniu.io.putFile()
}