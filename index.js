var aws = require('aws-sdk');
var fs = require('fs');

function storeFile(fileName, imageContents, callback) {
  var base64Data = imageContents.replace(/^data:image\/png;base64,/,"");
  var buff2Send = new Buffer(base64Data,'base64');
  if (this.storage === 'S3') {
    uploadS3.call(this,fileName, buff2Send, callback);
  } else {
    saveFile(fileName, buff2Send, callback);
  }

}
//callback: (err) =>
function saveFile(fileName, fileContents, callback) {
  fs.writeFile(fileName, fileContents, 'base64', callback);
}

//callback: (err) => (data)
function uploadS3(fileName, fileContents, callback) {
  var s3 = new aws.S3();
  var params = {
    Bucket: this.bucket,
    Key: fileName,
    Body: fileContents,
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };
  s3.putObject(params, callback);
}

module.exports = {
  store: storeFile,
  awsCredentialsFromPath: function (path) {
    aws.config.loadFromPath(path);
    return this;
  },
  asS3: function(bucket) {
    this.storage = 'S3';
    this.bucket = bucket;
    return this;
  }

}
