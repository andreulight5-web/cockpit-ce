// Génère une carte de remerciement personnalisée à imprimer pour un client.
// Usage : node pdfs/generate-carte-merci.js "Marie" "CE-CALME-7K2P" ["message optionnel"]

import { tsImport } from 'tsx/esm/api'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const prenom  = process.argv[2]
const code    = process.argv[3] || undefined
const message = process.argv[4] || undefined

if (!prenom) {
  console.error('Usage : node pdfs/generate-carte-merci.js "Prénom" ["CODE-ACCÈS"] ["message optionnel"]')
  process.exit(1)
}

// Chemin de sortie ABSOLU calculé avant chdir
const outFile = path.resolve(__dirname, '..', 'public', 'pdfs', `carte-merci-${prenom}.pdf`)

// chdir dans pdfs/ pour que les chemins relatifs des fonts et assets du template résolvent
process.chdir(__dirname)

const { renderCarteMerciToFile } = await tsImport('./carte-merci-template.tsx', import.meta.url)

await renderCarteMerciToFile(outFile, { prenom, code, message })
console.log(outFile)
