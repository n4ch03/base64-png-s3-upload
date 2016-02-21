var chai = require('chai');
chai.should();
var mock = require('mock-require');
var uploader;
describe('base64-png-uploader', function() {
  afterEach(function () {
    delete require.cache[__dirname + '/../index.js'];
    mock.stopAll();
  });
  describe('S3', function () {
    before(function(){
      mock('aws-sdk',{
        S3: function () {
          return {
            putObject: function (params, callback) {
              params.should.have.property('Bucket', 'someFancyBucket');
              params.should.have.property('Key', 'TheFileName');
              params.Body.toString("base64").should.equal("SOMEVALIDCONTENT");
              params.should.have.property('ContentEncoding', 'base64');
              params.should.have.property('ContentType', 'image/png');
              callback();
            }
          }
        }
      })
      uploader = require(__dirname + '/../index.js');
    });
    it('should send correct information to S3 endpoint', function () {
      uploader.asS3('someFancyBucket');
      uploader.store("TheFileName", "SOMEVALIDCONTENT", function(){});
      "pepe".should.be.a("string");
    });
  });
});
