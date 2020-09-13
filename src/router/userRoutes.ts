import { Request, Response, NextFunction } from 'express'
//import multer from 'multer'

import { UserController /* AuthController */ } from '../controller'
// import {configUpload, appLogger } from '../config'
//import { handleAuthorization } from './index'
import { HTTPErrors } from '../adapters'

import { ICreateDTO } from '../entity'
//const upload = multer(configUpload)

const userRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data: ICreateDTO = {
      fullname: req.params.fullname,
      username: req.params.username,
      email: req.params.email,
      password: req.params.password,
    }
    if (!data) {
      throw new HTTPErrors('Unauthorized', 400)
    }
    const user = new UserController('/api/v1/users', false).execute(data)
    if (!user) {
      throw new HTTPErrors('Unable to Connect to Database', 500)
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

// userRouter.patch('/avatar', handleAuthorization, upload.single('avatar') async(request, response): Promise<any> => {
//  const updateAvatar = new AvatarController()
//  const user = await updateAvatar.execute({
//    user_id: request.user.id,
//    avatarFilename: request.file.filename
//  })

//  return response.json(user)
// })

export default userRouter
