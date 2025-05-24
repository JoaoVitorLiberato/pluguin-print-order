import { ThermalPrinter, PrinterTypes, BreakLine, CharacterSet } from "node-thermal-printer"
import { printerIP } from "../../../ip.config"

export default (async () => {
  const IPs = await printerIP()
  let configPrinter

  for (const ip of IPs) {
    configPrinter = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: String(ip),
      removeSpecialCharacters: true,
      breakLine: BreakLine.WORD,
      characterSet: CharacterSet.PC437_USA,
      options: {
        timeout: 30000,
      }
    })
  }

  return configPrinter as ThermalPrinter
})()
