import { IOrderData } from "../Types/Order.type"
import { wrapText } from "./WrapText.helper"
import { formatedPrice } from "./formatedPrice.helper"

export function generatePrintLines(data: IOrderData, maxLength: number): string[] {
  const lines: string[] = []
  const { consumidor, order, loja } = data

  lines.push("")
  lines.push("NOVO PEDIDO")
  lines.push("")
  lines.push("-".repeat(maxLength))
  lines.push(`Pedido: ${order.id}`)
  lines.push("-".repeat(maxLength))

  if (loja?.mesa) lines.push(`Mesa: ${loja.mesa}`)

  const nameLines = wrapText(consumidor.nome, maxLength)
  nameLines.forEach((line, index) =>
    lines.push(index === 0 ? `Nome: ${line}` : `      ${line}`)
  )

  lines.push(`Tel: ${consumidor.telefone}`)
  lines.push("Endereço:")
  const enderecoLines = wrapText(consumidor.endereco, maxLength)
  lines.push(...enderecoLines)

  lines.push("-".repeat(maxLength))
  lines.push("Itens:")

  for (const item of order.items) {
    const itemName = wrapText(item.name, maxLength - 10)
    lines.push(` - ${itemName[0]}  R$ ${item.price}`)
    for (let i = 1; i < itemName.length; i++) {
      lines.push(`   ${itemName[i]}`)
    }

    if (item.optionals && item.optionals.length > 0) {
      for (const optional of item.optionals) {
        const optName = wrapText(optional.name, maxLength - 10)
        lines.push(`  + ${optName[0]}  R$ ${optional.price}`)
        for (let i = 1; i < optName.length; i++) {
          lines.push(`    ${optName[i]}`)
        }
      }
    }
  }

  lines.push(" ".repeat(maxLength))
  let valorTotal = 0
  for (const item of order.items) {
    if (item.optionals && item.optionals.length > 0) {
      for (const optional of item.optionals) {
        const PRICE_PRODUCT = String(item.price).replace(/\.|,/g, "")
        const PRICE_COMPLEMENT = String(optional.price).replace(/\.|,/g, "")
        valorTotal += (Number(PRICE_PRODUCT) + Number(PRICE_COMPLEMENT))
      }
    }
  }
  lines.push(`Total: ${formatedPrice(valorTotal)}`)
  lines.push(" ".repeat(maxLength))

  lines.push("-".repeat(maxLength))

  if (order.observation) {
    const obsLines = wrapText(order.observation, maxLength)
    lines.push("Observações:")
    lines.push(...obsLines)
  }

  lines.push("-".repeat(maxLength))
  lines.push(" ")

  return lines
}