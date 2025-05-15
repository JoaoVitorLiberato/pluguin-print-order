import { ThermalPrinter, PrinterTypes, BreakLine, CharacterSet } from "node-thermal-printer"

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: String(process.env.APPLICATION_PRINT_INTERFACE),
  removeSpecialCharacters: true,
  breakLine: BreakLine.WORD,
  characterSet: CharacterSet.PC860_PORTUGUESE,
  options: {
    timeout: 30000,
  }
})

export default printer
