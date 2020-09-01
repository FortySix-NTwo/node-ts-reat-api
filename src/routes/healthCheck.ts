import { Request, Response } from 'express'
import { Router } from 'express-async-router'

const reqOptions = (req: Request) => ({
  path: req.path,
  methods: req.method,
  headers: req.headers,
  host: req.hostname,
  baseUrl: req.baseUrl,
  ip: req.ip,
})

const resOptions = (res: Response) => ({
  crossOrigin: res.header('Access-Control-Allow-Origin', '*'),
  methods: res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, OPTIONS'
  ),
  headers: res.header('Access-Control-Allow-Headers', 'Content-Type'),
  cache: res.header('Cache-Control', 'no-cache'),
})

const healthCheck = (router: Router) =>
  router.use('/api', (req: Request, res: Response) => {
    const data = reqOptions(req)
    res
      .status(200)
      .json({
        headers: resOptions(res),
        message: 'O.K',
        data,
      })
      .end()
  })

export default [healthCheck]
