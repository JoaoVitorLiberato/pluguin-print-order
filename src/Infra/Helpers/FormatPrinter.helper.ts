import printer from "../Pluguins/Printer.pluguin"
import { processQueue, PRINT_QUEUE } from "../Middlewares/PrinterQueue.middleware"
import { slugify } from "./StringFormater.helper"
import { wrapText } from "./WrapText.helper"
import { IOrderData } from "../Types/Order.type"
import { IMiddlewarePrinting } from "../Types/PrinterQueue.type"

// BEMAATCH 4200-TH 80mm - size:48

export async function PrintOrder (data: IOrderData): Promise<void|IMiddlewarePrinting> {
  return new Promise((resolve) => {
    PRINT_QUEUE.push(async () => {
    try {
      const MAX_LENGTH_LINE = Number(process.env.APPLICATION_PRINT_LINE_SIZE)
      const { consumidor, order } = data

      printer.alignCenter()
      printer.setTextDoubleHeight()
      printer.println("NOVO PEDIDO")
      printer.setTextNormal()
      printer.alignLeft()

      printer.println("-".repeat(MAX_LENGTH_LINE))
      printer.println(`Nº: ${order.id}`)
      printer.println("-".repeat(MAX_LENGTH_LINE))

      const nameLines = wrapText(slugify(consumidor.nome), MAX_LENGTH_LINE)
      nameLines.forEach((line, index) =>
        printer.println(index === 0 ? `Nome: ${line}` : `      ${line}`)
      )

      printer.println(`Tel: ${consumidor.telefone}`)
      const enderecoLines = wrapText(consumidor.endereco, MAX_LENGTH_LINE)
      enderecoLines.forEach((line, index) =>
        printer.println(index === 0 ? `End: ${line}` : `      ${line}`)
      )

      printer.println("-".repeat(MAX_LENGTH_LINE))

      printer.println("Itens:")
      for (const item of order.items) {
        const itemName = wrapText(item.name, MAX_LENGTH_LINE - 10)
        printer.println(`- ${itemName[0]}  R$ ${item.price}`)
        for (let i = 1; i < itemName.length; i++) {
          printer.println(`  ${itemName[i]}`)
        }

        if (item.optionals) {
          for (const optional of item.optionals) {
            const optName = wrapText(optional.name, MAX_LENGTH_LINE - 10)
            printer.println(`  + ${optName[0]}  R$ ${optional.price}`)
            for (let i = 1; i < optName.length; i++) {
              printer.println(`    ${optName[i]}`)
            }
          }
        }
      }

      printer.println("-".repeat(MAX_LENGTH_LINE))

      if (order.observation) {
        const obsLines = wrapText(order.observation, MAX_LENGTH_LINE)
        printer.println("Observações:")
        obsLines.forEach(line => printer.println(line))
      }

      printer.println("-".repeat(MAX_LENGTH_LINE))
      printer.println(" ")
      printer.cut()

      await printer.execute()
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)

      resolve({
        codigo: "erro-impressao",
        messagem: `Houve um erro ao tentar imprimir o pedido ${data.order.id}`
      })
    }

      processQueue()
    })
  })
}
