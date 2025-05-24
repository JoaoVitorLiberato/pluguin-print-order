import { ThermalPrinter, PrinterTypes, BreakLine, CharacterSet } from "node-thermal-printer"
import { printerIP } from "../../../ip.config"

export default (async () => {
  const IP = await printerIP()

  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: String(IP),
    removeSpecialCharacters: true,
    breakLine: BreakLine.WORD,
    characterSet: CharacterSet.PC437_USA,
    options: {
      timeout: 30000,
    }
  })

  return printer
})()
