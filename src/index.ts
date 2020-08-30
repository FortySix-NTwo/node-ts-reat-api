import { Server } from './server'

const server = new Server()

const main = async () => {
  try {
    await server.start()
  } catch (error) {
    await server.stop(error)
  }
}

main()
