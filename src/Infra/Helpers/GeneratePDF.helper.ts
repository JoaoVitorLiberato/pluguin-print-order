import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"

export function generatePrinterPDF(conteudo: string[], fileName:string) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50
  })

  const filePath = path.join(process.cwd(), "arquivos", fileName)
  const stream = fs.createWriteStream(filePath)
  doc.pipe(stream)

  doc.fontSize(12)
  doc.font("Courier")

  for (const linha of conteudo) {
    doc.text(linha, {
      align: "left"
    })
  }

  doc.end()

  return filePath
}