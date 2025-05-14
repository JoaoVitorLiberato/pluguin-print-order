import { IOrderData } from "../Types/Order.type";
import { PrintOrder } from "../Helpers/FormatPrinter.helper";

export class PrinterController  {
  async printer (data: { body: IOrderData }) {
    const { body } = data

    const responseHelper = await PrintOrder(body)

    if (responseHelper && /^(erro-impressao)$/i.test(responseHelper.codigo)) {
      return responseHelper
    }

    return {
      messagem: "O pedido foi para a fila de impressão"
    }
  }
}