import { processQueue, PRINT_QUEUE } from "./PrinterQueue.middleware"
import { IOrderData } from "../Types/Order.type"
import { IMiddlewarePrinting } from "../Types/PrinterQueue.type"
import { generatePrintLines } from "../Helpers/GeneratePrintLine.helper"
import { generatePrinterPDF } from "../Helpers/GeneratePDF.helper"

// BEMAATCH 4200-TH 80mm - size:48

export async function PrintOrder (data: IOrderData): Promise<IMiddlewarePrinting> {
 return new Promise(async (resolve) => {
  const printer = await import("../Pluguins/Printer.pluguin").then(p => p.default);
    PRINT_QUEUE.push(async () => {
      try {
        const connected = await printer.isPrinterConnected()
        if (!connected) {
          resolve({
            pedido: data.order.id,
            codigo: "impressoranaoconectada",
            messagem: "Verifique se a impressora está conectada à rede corretamente."
          })
        }

        const MAX_LENGTH = Number(process.env.APPLICATION_PRINT_LINE_SIZE)
        const LINES = generatePrintLines(data, MAX_LENGTH)

        generatePrinterPDF(LINES, `pedido-${data.order.id}.pdf`)

        printer.alignLeft()
        LINES.forEach(line => printer.println(line))
        printer.cut()
        await printer.execute()

        resolve({
          codigo: "pedidoimprimido",
          messagem: "Imprimiu com sucesso"
        })
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)

        resolve({
          codigo: "erroimpressaodopedido",
          messagem: `Houve um erro ao tentar imprimir o pedido ${data.order.id}`
        })
      }
    })

    await processQueue()
  })
}
