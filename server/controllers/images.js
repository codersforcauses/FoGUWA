const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  region: 'ap-southeast-2',
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
})

const config = {
  bucket_name: 'foguwa-images',
  uploadExpiry: 60, // 10 min
  fileMinSize: 100,
  fileMaxSize: 8 * 1000 * 1000 * 1000 // 1 Gb
}

const getUploadLink = (key, contentType) => {
  const params = {
    Bucket: config.bucket_name,
    Key: key,
    Expires: config.uploadExpiry,
    ContentType: contentType
  }

  return s3.getSignedUrl('putObject', params)
}

module.exports = { getUploadLink }
