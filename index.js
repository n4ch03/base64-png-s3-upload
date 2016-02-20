var aws = require('aws-sdk');
var fs = require('fs');
var path = require('path');

module.exports = function () {
  store: storeFile,
  awsCredentialsFromPath: function (path) {
    aws.config.loadFromPath(path);
  },
  asS3: function() {
    this.storage = 'S3'
  }

}

function storeFile(name, imageContents, callback) {
  var base64Data = imageContents.replace(/^data:image\/png;base64,/,"");
  var buff2Send = new Buffer(base64Data,'base64');
  var jenkinsJob = process.env.JOB_NAME || 'JOB_NAME';
  var buildId = process.env.BUILD_NUMBER || 'BUILD_NUMBER';
  var name = jenkinsJob + "/" + buildId + "/" + title + '.png';
  if (this.storage === 'S3') {
    uploadS3(fileName, bucket, fileContents, callback
  } else {
    saveFile(path, fileName, fileContents, callback)
  }

}
//callback: (err) =>
function saveFile(filePath, fileName, fileContents, callback) {
  fs.writeFile(path.join(filePath,fileName + ".png"), fileContents, 'base64', callback);
}

//callback: (err) => (data)
function uploadS3(fileName, bucket, fileContents, callback) {
  var s3 = new aws.S3();
  var params = {
    Bucket: bucket,
    Key: fileName
    Body: fileContents,
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };
  s3.putObject(params, callback);
}
