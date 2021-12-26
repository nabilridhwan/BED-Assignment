const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: "dqxawxewb",
    api_key: "534278375837782",
    api_secret: "vpVQp-rWDoF5IC68oJCzAS8fDR8",
    
}) 

const uploadFileToCloudinary = (filepath, cloudinaryFolderName) => {
    return new Promise(function (resolve, reject) {
        //Create a powerful, writable stream object which works with Cloudinary
        cloudinary.uploader.upload(filepath, {
            folder: cloudinaryFolderName,
            allowed_formats: "png,jpg",
            resource_type: "image",
        }).then(result => {
            resolve(result)
        }).catch(error => {
            reject(error)
        })
    }); //End of Promise 
}

module.exports = uploadFileToCloudinary