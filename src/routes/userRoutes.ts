import { Request, Response, NextFunction } from 'express'
//import multer from 'multer'

import { UserController /* AuthController */ } from '../controller'
import { /* configUpload */ appLogger } from '../config'
//import { handleAuthorization } from './index'
import { HTTP400Error, registerHeaders, CacheControl } from '../utils'
import { ICreateDTO } from '../entity'
//const upload = multer(configUpload)

const userRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req) {
      throw new HTTP400Error()
    }
    appLogger.info('userRouter')
    const { fullname, username, email, password } = req.body

    const params: ICreateDTO = {
      fullname,
      username,
      email,
      password,
    }

    const user = await UserController.execute(params)
    if (!user) {
      throw new Error('Unable to Connect to Database')
    }
    const { statusCode, statusMessage } = res
    return res
      .status(200)
      .json({
        request: await registerHeaders(req, CacheControl.NO_CACHE),
        status: statusCode,
        message: statusMessage,
        data: user,
      })
      .end()
  } catch (error) {
    next(error)
  }
}
// userRouter.patch('/avatar', handleAuthorization, upload.single('avatar') async(request, response): Promise<any> => {
//  const updateAvatar = new AvatarController()
//  const user = await updateAvatar.execute({
//    user_id: request.user.id,
//    avatarFilename: request.file.filename
//  })

//  return response.json(user)
// })

export default userRouter
