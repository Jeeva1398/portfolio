import { Router } from 'express'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', '..', 'data')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' })
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  }

  try {
    await mkdir(DATA_DIR, { recursive: true })
    let submissions = []
    try {
      submissions = JSON.parse(await readFile(SUBMISSIONS_FILE, 'utf-8'))
    } catch {
      // file doesn't exist yet — start fresh
    }
    submissions.push(submission)
    await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))

    // TODO: wire up real email delivery (e.g. nodemailer + SMTP creds) once available.
    // For now submissions are persisted to server/data/submissions.json.

    res.status(201).json({ ok: true })
  } catch (err) {
    console.error('Failed to save contact submission:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again or email me directly.' })
  }
})

export default router
