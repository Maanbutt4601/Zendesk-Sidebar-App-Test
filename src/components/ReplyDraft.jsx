import React, { useState, useEffect } from 'react'
import { generateReplyTemplate } from '../utils/templates'

const ReplyDraft = ({ ticket, customer, posts }) => {
  const [replyDraft, setReplyDraft] = useState('')
  const [tone, setTone] = useState('friendly')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (ticket && customer) {
      const draft = generateReplyTemplate(ticket, customer, posts, tone)
      setReplyDraft(draft)
    }
  }, [ticket, customer, posts, tone])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(replyDraft)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleRegenerate = () => {
    if (ticket && customer) {
      const draft = generateReplyTemplate(ticket, customer, posts, tone)
      setReplyDraft(draft)
    }
  }

  return (
    <section className="reply-draft">
      <div className="reply-header">
        <h2>Reply Draft</h2>
        <div className="tone-selector">
          <label htmlFor="tone">Tone:</label>
          <select 
            id="tone" 
            value={tone} 
            onChange={(e) => setTone(e.target.value)}
            className="tone-select"
          >
            <option value="friendly">Friendly</option>
            <option value="concise">Concise</option>
          </select>
        </div>
      </div>
      
      <textarea 
        value={replyDraft}
        onChange={(e) => setReplyDraft(e.target.value)}
        className="reply-textarea"
        rows={8}
        placeholder="Reply draft will appear here..."
      />
      
      <div className="reply-actions">
        <button onClick={handleRegenerate} className="regenerate-button">
          Regenerate
        </button>
        <button onClick={handleCopy} className="copy-button">
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
    </section>
  )
}

export default ReplyDraft