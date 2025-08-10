import React from 'react'

const TicketInfo = ({ ticket }) => {
  const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <section className="ticket-info">
      <h2>Ticket Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <label>Email:</label>
          <span>{ticket.requesterEmail || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Subject:</label>
          <span>{truncateText(ticket.subject) || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Description:</label>
          <span>{truncateText(ticket.description, 150) || 'N/A'}</span>
        </div>
      </div>
    </section>
  )
}

export default TicketInfo