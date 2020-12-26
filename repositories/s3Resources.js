const AWS = require("aws-sdk");
const { awsConst }  = require('../config');

const s3ResourcesRepository = {
  createNewFile (name, buffer) {
    const objectParams = {
      Bucket: awsConst.bucketName,
      Key: `${name}.jpg`,
      Body: buffer,
      ACL: 'public-read',
    };
    const uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();

    return uploadPromise.then(data => {
      console.log(data);
      const full_size_url = `https://${awsConst.bucketName}.s3.${awsConst.region}.amazonaws.com/${name}.jpg`;
      return { full_size_url };
    });
  },
};
module.exports = s3ResourcesRepository;