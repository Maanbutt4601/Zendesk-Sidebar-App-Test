import React, { useState, useEffect } from 'react'
import { generateReplyTemplate } from '../utils/templates'

const ReplyDraft = ({ ticket, customer, posts }) => {
  const [replyDraft, setReplyDraft] = useState('')
  const [tone, setTone] = useState('friendly')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [confidence, setConfidence] = useState(85)

  useEffect(() => {
    generateNewReply()
  }, [ticket, customer, posts, tone])

  const generateNewReply = async () => {
    if (ticket && customer) {
      setIsGenerating(true)
      
      // Simulate AI thinking time for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const draft = generateReplyTemplate(ticket, customer, posts, tone)
      setReplyDraft(draft)
      
      // Calculate confidence based on available data
      let newConfidence = 60
      if (customer.company?.name) newConfidence += 10
      if (customer.address?.city) newConfidence += 10
      if (posts && posts.length > 0) newConfidence += 15
      if (ticket.description && ticket.description.length > 50) newConfidence += 10
      
      setConfidence(Math.min(newConfidence, 95))
      setIsGenerating(false)
    }
  }

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
    generateNewReply()
  }

  return (
    <section className="section-card fade-in">
      <div className="section-header">
        <div className="section-icon">✍️</div>
        <h2 className="section-title">AI Reply Assistant</h2>
      </div>
      
      <div className="confidence-indicator">
        <span>Confidence Score:</span>
        <div className="confidence-bar">
          <div 
            className="confidence-fill" 
            style={{ width: `${confidence}%` }}
          />
        </div>
        <span>{confidence}%</span>
      </div>
      
      <div className="reply-header">
        <div className="tone-controls">
          <label htmlFor="tone" className="tone-label">Tone</label>
          <select 
            id="tone" 
            value={tone} 
            onChange={(e) => setTone(e.target.value)}
            className="tone-select"
          >
            <option value="friendly">😊 Friendly</option>
            <option value="concise">⚡ Concise</option>
            <option value="formal">🤝 Formal</option>
            <option value="empathetic">💝 Empathetic</option>
          </select>
        </div>
      </div>
      
      <textarea 
        value={isGenerating ? 'Generating personalized reply...' : replyDraft}
        onChange={(e) => setReplyDraft(e.target.value)}
        className="reply-textarea"
        rows={8}
        placeholder="AI-generated reply will appear here..."
        disabled={isGenerating}
      />
      
      <div className="reply-actions">
        <button 
          onClick={handleRegenerate} 
          className="regenerate-button"
          disabled={isGenerating}
        >
          {isGenerating ? '🔄 Generating...' : '🔄 Regenerate'}
        </button>
        <button 
          onClick={handleCopy} 
          className={`copy-button ${copied ? 'copied' : ''}`}
          disabled={isGenerating}
        >
          {copied ? '✅ Copied!' : '📋 Copy to Clipboard'}
        </button>
      </div>
    </section>
  )
}

export default ReplyDraft