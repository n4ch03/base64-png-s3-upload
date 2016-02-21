# base64-png-uploader

Upload a base64 encoded png to S3 or file system. Other cloud storage services could be or not here soon ;)
Very useful to use with Test Automation with Selenium to store screenshots taken.

## Install

```bash
  npm install base64-png-uploader
```

## Usage in S3

```js
var uploader = require('base64-png-uploader');
// if you do not export AWS_ACCESS_KEY_ID and AWS_ACCESS_KEY_ID
uploader.awsCredentialsFromPath('path_to_JSON_FILE');
uploader.asS3('BUCKET_NAME');
uploader.store('FILE_NAME|PATH+FILE_NAME', 'BASE_64_ENCODED_PNG', function(error, data){})
```
For more information about credentials and aws-sdk click [here](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html).
The callback function will be called from s3.putObject so you maybe want to [check documentation](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property).

## Usage in filesystem

```js
var uploader = require('base64-png-uploader');
// if you do not export AWS_ACCESS_KEY_ID and AWS_ACCESS_KEY_ID
uploader.store('FILE_NAME|PATH+FILE_NAME', 'BASE_64_ENCODED_PNG', function(error){})
```
The callback function will be called from `fs.writeFile` so you maybe want to [check documentation](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback).

## Usage taking a snapshot with selenium

```js
selenium.takeScreenshot()
.then((image, err) => {
  uploader.asS3('BUCKET_NAME').store('FILE_NAME.PNG', image, (err, data) => {
    //do whatever you want after image is saved
    }
  );
});
```

## License

MIT
