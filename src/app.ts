import { Elysia } from "elysia"
import dotenv from "dotenv"
import { PrinterRouter } from "./Infra/Routes/Printer.route"


dotenv.config()

const app = new Elysia({
  serve: {
    idleTimeout: 30
  }
})

app.use(PrinterRouter)

export default app
