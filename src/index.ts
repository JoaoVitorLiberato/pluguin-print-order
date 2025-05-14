import app from "./app";
import printer from "./Infra/Pluguins/Printer.pluguin";

app
  .get("/", async () => {
    try {
      const printerConnected  = await printer.isPrinterConnected()
      if (!printerConnected) throw new Error("Impressora desconectada")

      printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_MAX_LENGTH_LINE)))
      printer.println(`Printer test`)
      printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_MAX_LENGTH_LINE)))

      return "Impressora conectada com sucesso!"
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      return {
        codigo: "impressora-nao-conectada",
        messagem: "Verifique se a impressora está connectada."
      }
    }

  })
  .listen(process.env.APPLICATION_PORT as string)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)
