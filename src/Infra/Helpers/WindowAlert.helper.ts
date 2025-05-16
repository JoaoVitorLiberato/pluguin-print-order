import { exec } from "child_process"

export function showWindowsAlert(title: string, message: string) {
  const command = `powershell -Command "& {Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('${message}', '${title}')}"`
  exec(command)
}
