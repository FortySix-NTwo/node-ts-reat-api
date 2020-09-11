import { Router } from 'express'
//import multer from 'multer'

import { UserController /* AuthController */ } from '../controller'
// import {configUpload, appLogger } from '../config'
//import { handleAuthorization } from './index'
import { HTTP400Error } from '../utils'
import { ICreateDTO } from '../entity'
//const upload = multer(configUpload)

const userRouter = (router: Router) => {
  router.post(
    '/api/v1/user',
    async (req, res, next): Promise<any> => {
      try {
        const data: ICreateDTO = {
          fullname: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }
        if (!data) {
          throw new HTTP400Error()
        }
        const user = await UserController.execute(data)
        if (!user) {
          throw new Error('Unable to Connect to Database')
        }
        const { statusCode, statusMessage } = res
        return res.status(200).json({
          statusCode,
          statusMessage,
          data: user,
        })
      } catch (error) {
        next(error)
      }
    }
  )
}

// userRouter.patch('/avatar', handleAuthorization, upload.single('avatar') async(request, response): Promise<any> => {
//  const updateAvatar = new AvatarController()
//  const user = await updateAvatar.execute({
//    user_id: request.user.id,
//    avatarFilename: request.file.filename
//  })

//  return response.json(user)
// })

export default [userRouter]
