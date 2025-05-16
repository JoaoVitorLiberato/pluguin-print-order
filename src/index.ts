import { t } from "elysia"
import app from "./app"
import printer from "./Infra/Pluguins/Printer.pluguin"
import { showWindowsAlert } from "./Infra/Helpers/WindowAlert.helper"

app
  .get("/",
    async ({ set }) => {
      try {
        const printerConnected  = await printer.isPrinterConnected()
        if (!printerConnected) throw new Error("Impressora desconectada")

        // teste impressão
        printer.setTextNormal()
        printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_LINE_SIZE)))
        printer.println("")
        printer.println("Print Teste")
        printer.println("")
        printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_LINE_SIZE)))
        printer.execute()
        // teste impressão

        return {
          codigo: "impressoraconectada",
          messagem: "Impressora conectada com sucesso!"
        }
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        set.status = 400

        showWindowsAlert("Erro na impressora", "Verifique se a impressora está connectada a rede corretamente")
        return {
          codigo: "impressoranaoconectada",
          messagem: "Verifique se a impressora está connectada a rede corretamente."
        }
      }
    },
    {
      response: {
        200: t.Object({
          codigo: t.String({ description: "impressoraconectada" }),
          messagem: t.String()
        }),
        400: t.Object({
          codigo: t.String({ description: "impressoranaoconectada" }),
          messagem: t.String()
        }),
      },
      headers: t.Object({
        "x-api-key": t.String({ description: "Adicionar a chave key" })
      })
    }
  )
  .listen({
    hostname: "0.0.0.0",
    port: process.env.APPLICATION_PORT as string
  })

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)
