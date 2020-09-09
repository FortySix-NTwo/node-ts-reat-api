import { Request, Response, NextFunction } from 'express'
//import multer from 'multer'

import { UserController /* AuthController */ } from '../controller'
//import { configUpload } from '../config'
//import { handleAuthorization } from './index'
import { HTTP400Error, registerHeaders, CacheControl } from '../utils'
//const upload = multer(configUpload)

const userRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (
      !req.body.fullname ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password
    ) {
      throw new HTTP400Error()
    }
    const headers = await registerHeaders(req, CacheControl.NO_CACHE)
    const createUser = await UserController.execute({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    return res.json({
      headers,
      statusCode: 200,
      statusMessage: 'O.K',
      data: createUser,
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
