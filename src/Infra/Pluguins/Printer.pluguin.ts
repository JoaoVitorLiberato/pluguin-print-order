import { ThermalPrinter, PrinterTypes, BreakLine, CharacterSet } from "node-thermal-printer"

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: `${String(process.env.APPLICATION_PRINT_IP)}:${String(process.env.APPLICATION_PRINT_PORT)}`,
  removeSpecialCharacters: false,
  breakLine: BreakLine.WORD,
  characterSet: CharacterSet.PC860_PORTUGUESE,
  options: {
    timeout: 30000,
  }
})

export default printer
