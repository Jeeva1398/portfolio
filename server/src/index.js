import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRouter from './routes/contact.js'
import projectsRouter from './routes/projects.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/contact', contactRouter)
app.use('/api/projects', projectsRouter)

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
