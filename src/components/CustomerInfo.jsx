import React from 'react'

const CustomerInfo = ({ customer }) => {
  const getCustomerTier = (company) => {
    // Simple logic to determine customer tier
    if (!company) return 'standard'
    const enterprise = /corp|corporation|enterprise|inc|ltd|llc/i
    return enterprise.test(company) ? 'enterprise' : 'standard'
  }

  const tier = getCustomerTier(customer.company?.name)

  return (
    <section className="section-card slide-in">
      <div className="section-header">
        <div className="section-icon">👤</div>
        <h2 className="section-title">Customer Information</h2>
        <div className={`status-indicator ${tier === 'enterprise' ? 'success' : 'warning'}`}>
          {tier} tier
        </div>
      </div>
      <div className="info-grid">
        <div className="info-item">
          <label className="info-label">Full Name</label>
          <span className="info-value">{customer.name || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label className="info-label">Company</label>
          <span className="info-value">{customer.company?.name || 'N/A'}</span>
        </div>
        <div className="info-item">
          <label className="info-label">Location</label>
          <span className="info-value">
            {customer.address?.city && customer.address?.zipcode 
              ? `${customer.address.city}, ${customer.address.zipcode}`
              : customer.address?.city || 'N/A'
            }
          </span>
        </div>
        <div className="info-item">
          <label className="info-label">Website</label>
          <span className="info-value">
            {customer.website ? (
              <a href={`https://${customer.website}`} target="_blank" rel="noopener noreferrer" className="info-link">
                {customer.website} ↗
              </a>
            ) : 'N/A'}
          </span>
        </div>
        <div className="info-item">
          <label className="info-label">Phone</label>
          <span className="info-value">{customer.phone || 'N/A'}</span>
        </div>
      </div>
    </section>
  )
}

export default CustomerInfo