import express from 'express'
import cors from 'cors'
import {fileURLToPath} from 'url'
import {dirname} from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PUERTO = 6243
const app = express()

app.use(cors())
app.use(express.json())

// Serve images from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(PUERTO, () => console.log(`Server running on port ${PUERTO}`))
