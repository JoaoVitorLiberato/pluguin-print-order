import { Elysia } from "elysia"
import dotenv from "dotenv"

dotenv.config()

const app = new Elysia({
  serve: {
    idleTimeout: 30
  }
})

export default app
