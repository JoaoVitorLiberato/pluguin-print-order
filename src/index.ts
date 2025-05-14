import app from "./app";
import printer from "./Infra/Pluguins/Printer.pluguin";

app
  .get("/", async () => {
    try {
      const printerConnected  = await printer.isPrinterConnected()
      if (!printerConnected) throw new Error("Impressora desconectada")

      printer.println("-".repeat(48))
      printer.println(`Printer test`)
      printer.println("-".repeat(48))

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

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
