

const multer = require('multer')
const fs = require('fs')
const path = require('path')

const fileStorage=multer.diskStorage({
      destination:function(req,file,cb){
        if(fs.existsSync(folderDirectory)){
          cb(null,folderDirectory)
        }else{
          try {
            fs.mkdirSync(folderDirectory)
            cb(null,folderDirectory)
          } catch (error) {
          cb(error,folderDirectory)
          }
        }
      },
      filename:function(req,file,cb){
        console.log('file in name function')
        cb(null,`${Date.now()}--draftFile--${path.extname(file.originalname)}`)
      }
    })
  
    const folderDirectory='./images'
      const fileFilter = (req, file, cb) => {
        console.log('file', file)
        if (
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'application/tiff'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      };

exports.uploads = multer({ storage: fileStorage, fileFilter: fileFilter}).single('image')
