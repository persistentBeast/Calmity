const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "abbyshake",
    api_key: "914682359323521",
    api_secret: "sU_Y9k00-q0OXdTrGk_3JD6OzIY"
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Calmity',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

module.exports = {

    cloudinary,
    storage

}
