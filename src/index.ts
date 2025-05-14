import app from "./app"
import printer from "./Infra/Pluguins/Printer.pluguin"

app
  .onBeforeHandle(({ request, set }) => {
    const TOKEN = request.headers.get("x-api-key")

    if (String(TOKEN) !== String(process.env.APPLICATION_API_KEY)) {
      console.error("Usuário não autorizado")

      set.status = 401
      return {
        codigo: "unauthorized",
        mensagem: "Usuário não autorizado"
      }
    }
  })
  .get("/", async () => {
    try {
      const printerConnected  = await printer.isPrinterConnected()
      if (!printerConnected) throw new Error("Impressora desconectada")

      printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_LINE_SIZE)))
      printer.println(`Printer test`)
      printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_LINE_SIZE)))

      return "Impressora conectada com sucesso!"
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      return {
        codigo: "impressora-nao-conectada",
        messagem: "Verifique se a impressora está connectada."
      }
    }
  })
  .listen({
    hostname: "0.0.0.0",
    port: process.env.APPLICATION_PORT as string
  })

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)
