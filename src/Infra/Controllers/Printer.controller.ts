import { Context } from "elysia"
import { PrintOrder } from "../Helpers/FormatPrinter.helper";
import { IOrderData } from "../Types/Order.type";

export class PrinterController  {
  async printer ({ set, body }: Context) {
    const PAYLOAD = body as IOrderData

    try {
      const responseHelper = await PrintOrder(PAYLOAD)
      if (!responseHelper || /^(erroimpressaodopedido)$/i.test(responseHelper.codigo)) {
        throw new Error("erroimpressaodopedido")
      }

      if (/^(impressoranaoconectada)$/i.test(responseHelper.codigo)) {
        set.status = 400
        console.error("Verifique se a impressora está conectada!")
        return responseHelper
      }

      console.log(`O pedido ${PAYLOAD.order.id} foi imprimido com sucesso.`)
      return responseHelper
    } catch {
      set.status = 400
      console.error(`Houve um erro ao tentar imprimir seu pedido ${PAYLOAD.order.id}`)
      return {
        pedido: PAYLOAD.order.id,
        codigo: "erroimprimirpedido",
        messagem: `Houve um erro ao tentar imprimir seu pedido.`
      }
    }
  }
}