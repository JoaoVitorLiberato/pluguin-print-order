import { IPrintWorker } from "../Types/PrinterQueue.type"

export const PRINT_QUEUE: Array<IPrintWorker> = []
let processingOrder = false


export async function processQueue (): Promise<void> {
  if (processingOrder || PRINT_QUEUE.length === 0) return

  processingOrder = true

  const ORDER_PRINTING = PRINT_QUEUE.shift()

  if (ORDER_PRINTING) {
    try {
      await ORDER_PRINTING()
    } catch (err) {
      console.error("Error ao processar impressão")
    }
  }

  processingOrder = false

  setTimeout(processQueue, 500)
}