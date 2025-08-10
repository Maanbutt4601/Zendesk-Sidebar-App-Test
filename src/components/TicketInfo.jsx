import React from 'react'

const TicketInfo = ({ ticket }) => {
  const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const getPriorityFromSubject = (subject) => {
    if (!subject) return 'normal'
    const urgent = /urgent|emergency|critical|asap|immediate/i
    const high = /high|important|priority/i
    
    if (urgent.test(subject)) return 'urgent'
    if (high.test(subject)) return 'high'
    return 'normal'
  }

  const priority = getPriorityFromSubject(ticket.subject)
  const priorityColors = {
    urgent: 'error',
    high: 'warning', 
    normal: 'success'
  }

  return (
    <section className="section-card fade-in">
      <div className="section-header">
        <div className="section-icon">🎫</div>
        <h2 className="section-title">Ticket Information</h2>
        <div className={`status-indicator ${priorityColors[priority]}`}>
          {priority} priority
        </div>
      </div>
      <div className="info-grid">
        <div className="info-item">
          <label className="info-label">Requester Email</label>
          <span className="info-value">{ticket.requesterEmail || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label className="info-label">Subject</label>
          <span className="info-value">{truncateText(ticket.subject, 120) || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label className="info-label">Description</label>
          <span className="info-value truncated">{ticket.description || 'N/A'}</span>
        </div>
      </div>
    </section>
  )
}

export default TicketInfo