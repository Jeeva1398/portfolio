// Contact messages and the chat widget both go through ZenithDesk: messages
// land on its Enquiries page (and in the enquiry alert inbox), so this site
// needs no server of its own. Both values are public by design - the widget
// key only says which ZenithDesk org, and only allowed sites may use it.
const CHATBOT_URL = (import.meta.env.VITE_CHATBOT_URL || '').replace(/\/$/, '')
const WIDGET_KEY = import.meta.env.VITE_CHAT_WIDGET_KEY || ''

export const isConfigured = Boolean(CHATBOT_URL && WIDGET_KEY)

// { name, email, message, website } -> resolves on success, throws with a
// message the form can show. `website` is the hidden anti-bot field.
export async function sendContactMessage(fields) {
  if (!isConfigured) {
    throw new Error('The contact form is not set up yet - please email me directly.')
  }

  let res
  try {
    res = await fetch(`${CHATBOT_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Widget-Key': WIDGET_KEY },
      body: JSON.stringify(fields),
    })
  } catch {
    throw new Error('Could not reach the server - please check your connection and try again.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong - please try again.')
  return data
}

// Adds the ZenithDesk chat widget to the page, once.
export function loadChatWidget() {
  if (!isConfigured || document.querySelector('script[data-zenithdesk-widget]')) return
  const script = document.createElement('script')
  script.src = `${CHATBOT_URL}/widget.js`
  script.dataset.key = WIDGET_KEY
  script.dataset.zenithdeskWidget = ''
  script.defer = true
  document.body.appendChild(script)
}
