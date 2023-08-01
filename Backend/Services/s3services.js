const AWS = require("aws-sdk");

const uploadToS3 = (data, fileName) => {
    const BUCKET_NAME = 'expensetracker1213';
    const IAM_USER_KEY = 'AKIAYTSZOJCVBV2USSLZ';
    const IAM_USER_SECRET = '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';
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    });

    let params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    }
    // s3bucket.upload(params, (err, s3response) => {
    //     if (err) {
    //         console.log('Something went wrong', err);
    //     } else {
    //         console.log('Successfully uploaded', s3response);
    //         return s3response;
    //     }
    // })

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something went wrong', err);
                reject(err);
            } else {
                console.log('Successfully uploaded', s3response);
                resolve(s3response.Location);
            }
        });

    });
}

module.exports = { uploadToS3 }