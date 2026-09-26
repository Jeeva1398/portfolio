import { useState } from 'react'
import { sendContactMessage } from '../lib/zenithdesk'

const initialState = { name: '', email: '', message: '', website: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm(initialState)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  const inputClass =
    'w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-app/50 focus:outline-none focus:ring-2 focus:ring-app/30'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Anti-spam: hidden from people, filled in by bots, and ignored when set. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-app to-data px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'success' && (
        <p role="status" className="text-sm text-emerald-400">Thanks — your message has been sent. I&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && <p role="alert" className="text-sm text-red-400">{errorMsg}</p>}
    </form>
  )
}
