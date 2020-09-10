import { Request, Response, NextFunction } from 'express'
//import multer from 'multer'

import { UserController /* AuthController */ } from '../controller'
import { /* configUpload */ appLogger } from '../config'
//import { handleAuthorization } from './index'
import { HTTP400Error } from '../utils'
import { ICreateDTO } from '../entity'
//const upload = multer(configUpload)

const userRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (
      !req.body.fullName ||
      !req.body.userName ||
      !req.body.email ||
      !req.body.password
    ) {
      throw new HTTP400Error()
    }
    const { fullName, userName, email, password } = req.body
    appLogger.info('userRouter')

    const data: ICreateDTO = {
      fullname: fullName,
      username: userName,
      email,
      password,
    }

    const user = await UserController.execute(data)
    if (!user) {
      throw new Error('Unable to Connect to Database')
    }
    const { statusCode, statusMessage } = res
    res.status(200).json({
      statusCode,
      statusMessage,
      data: user,
    })
    return user
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
