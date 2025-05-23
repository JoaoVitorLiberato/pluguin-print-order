import { readFile } from "fs/promises"
import { join } from "path"

export async function printerIP () {
  const FILE = await readFile(join(import.meta.dir, "ip.txt"), "utf-8")
  const IP_PRINTER = FILE.trim()

  return IP_PRINTER
}