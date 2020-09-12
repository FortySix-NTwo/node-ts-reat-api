import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const UPLOAD_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')

export const store = {
  storage: multer.diskStorage({
    destination: UPLOAD_FOLDER,
    filename(_request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
  directory: UPLOAD_FOLDER,
}
