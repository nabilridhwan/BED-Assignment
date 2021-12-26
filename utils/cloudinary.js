const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: "dqxawxewb",
    api_key: "534278375837782",
    api_secret: "vpVQp-rWDoF5IC68oJCzAS8fDR8",
    
}) 

const uploadFileToCloudinary = (buffer, cloudinaryFolderName) => {
    return new Promise(function (resolve, reject) {
        //Create a powerful, writable stream object which works with Cloudinary
        let stream = cloudinary.uploader.upload_stream({
            folder: cloudinaryFolderName,
            allowed_formats: "png,jpg",
            resource_type: "image"
        },(error, result) => {
            if(result){
                resolve(result)
            }else{
                reject(error)
            }
        })

        streamifier.createReadStream(buffer).pipe(stream);
        
    }); //End of Promise 
}

const deleteFileFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if(result){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

module.exports = {uploadFileToCloudinary, deleteFileFromCloudinary} 