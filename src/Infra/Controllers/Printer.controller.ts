import { IOrderData } from "../Types/Order.type";
import { PrintOrder } from "../Helpers/FormatPrinter.helper";

export class PrinterController  {
  async printer (data: { body: IOrderData }) {
    try {
      const { body } = data

      const responseHelper = await PrintOrder(body)

      if (responseHelper && /^(erro-print)$/i.test(responseHelper.codigo)) {
        return responseHelper
      }

      return {
        messagem: "O pedido foi para a fila de impressão"
      }
    } catch {
      return {
        codigo: "erro-print-order",
        messagem: "Houve um erro ao tentar imprimir seu pedido."
      }
    }
  }
}