import { useState } from 'react'
import { sendContactMessage } from '../lib/zenithdesk'
import { services } from '../data/content'
import useAudience from '../hooks/useAudience'

const initialState = { name: '', email: '', message: '', website: '', service: '', timeline: '' }

const TIMELINES = ['As soon as possible', 'Within 1 month', '1-3 months', 'Flexible']

// The enquiry API takes name, email, and message, so project details (when picked) lead the message.
function composeMessage({ message, service, timeline }) {
  const meta = [service, timeline && `Timeline: ${timeline}`].filter(Boolean)
  return meta.length ? `[${meta.join(' · ')}]

${message}` : message
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  // Project fields only show in the hero's "Have a project" view
  const forClient = useAudience() === 'client'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const { name, email, website } = form
      const details = forClient ? form : { message: form.message }
      await sendContactMessage({ name, email, website, message: composeMessage(details) })
      setStatus('success')
      setForm(initialState)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  const inputClass =
    'w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 text-[0.9375rem] text-fg placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <label htmlFor="name" className="mb-1.5 block text-sm text-fg">
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
        <label htmlFor="email" className="mb-1.5 block text-sm text-fg">
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
      {forClient && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className="mb-1.5 block text-sm text-fg">
              What do you need?
            </label>
            <select id="service" name="service" value={form.service} onChange={handleChange} className={inputClass}>
              <option value="">Not sure yet</option>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className="mb-1.5 block text-sm text-fg">
              Timeline <span className="text-subtle">(optional)</span>
            </label>
            <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange} className={inputClass}>
              <option value="">Not decided</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-fg">
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
        className="btn btn-primary disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : forClient ? 'Send project details' : 'Send message'}
      </button>
      {status === 'success' && (
        <p role="status" className="text-sm text-ok">Thanks, your message has been sent. I&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && <p role="alert" className="text-sm text-accent">{errorMsg}</p>}
    </form>
  )
}
