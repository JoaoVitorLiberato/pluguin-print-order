import { Elysia, t } from "elysia"
import { PrinterController } from "../Controllers/Printer.controller"
import { IOrderData } from "../Types/Order.type"

const router = new Elysia()
const controller = new PrinterController()

router.post("/print", (configs) => {
  return controller.printer({ body: configs.body as IOrderData })
})


export {
  router as PrinterRouter
}