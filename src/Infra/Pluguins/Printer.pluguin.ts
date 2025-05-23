import { ThermalPrinter, PrinterTypes, BreakLine, CharacterSet } from "node-thermal-printer"
import { printerIP } from "../Helpers/FoundFileIPPrinter.helper"

const IP = printerIP().then(response => response)

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: String(IP),
  removeSpecialCharacters: true,
  breakLine: BreakLine.WORD,
  characterSet: CharacterSet.PC860_PORTUGUESE,
  options: {
    timeout: 30000,
  }
})

export default printer
