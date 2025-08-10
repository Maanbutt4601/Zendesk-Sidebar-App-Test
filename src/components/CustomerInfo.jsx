import React from 'react'

const CustomerInfo = ({ customer }) => {
  return (
    <section className="customer-info">
      <h2>Customer Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <label>Name:</label>
          <span>{customer.name || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Company:</label>
          <span>{customer.company?.name || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>City:</label>
          <span>{customer.address?.city || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label>Website:</label>
          <span>
            {customer.website ? (
              <a href={`http://${customer.website}`} target="_blank" rel="noopener noreferrer">
                {customer.website}
              </a>
            ) : 'N/A'}
          </span>
        </div>
      </div>
    </section>
  )
}

export default CustomerInfo