import React, { useState, useEffect } from 'react'
import TicketInfo from './components/TicketInfo'
import CustomerInfo from './components/CustomerInfo'
import RecentPosts from './components/RecentPosts'
import ReplyDraft from './components/ReplyDraft'
import LoadingSpinner from './components/LoadingSpinner'
import { useZendeskClient } from './hooks/useZendeskClient'
import { useJsonPlaceholder } from './hooks/useJsonPlaceholder'

function App() {
  const [ticketData, setTicketData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const zafClient = useZendeskClient()
  const { fetchUser, fetchPosts, user, posts, apiLoading, apiError } = useJsonPlaceholder()

  useEffect(() => {
    if (zafClient) {
      loadTicketData()
    }
  }, [zafClient])

  useEffect(() => {
    if (ticketData?.requesterEmail) {
      fetchUser(ticketData.requesterEmail)
    }
  }, [ticketData, fetchUser])

  useEffect(() => {
    if (user?.id) {
      fetchPosts(user.id)
    }
  }, [user, fetchPosts])

  const loadTicketData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await zafClient.get([
        'ticket.requester.email',
        'ticket.subject', 
        'ticket.description'
      ])
      
      setTicketData({
        requesterEmail: data['ticket.requester.email'],
        subject: data['ticket.subject'],
        description: data['ticket.description']
      })
    } catch (err) {
      setError('Failed to load ticket data')
      console.error('Error loading ticket data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    loadTicketData()
    if (ticketData?.requesterEmail) {
      fetchUser(ticketData.requesterEmail)
    }
  }

  if (loading && !ticketData) {
    return <LoadingSpinner message="Loading ticket data..." />
  }

  if (error && !ticketData) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={loadTicketData} className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>ZenYC Assistant</h1>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh Data
        </button>
      </header>
      
      <main className="app-content">
        {ticketData && <TicketInfo ticket={ticketData} />}
        
        {apiLoading && <LoadingSpinner message="Loading customer data..." />}
        
        {apiError && (
          <div className="error-container">
            <p className="error-message">{apiError}</p>
            <button onClick={() => fetchUser(ticketData?.requesterEmail)} className="retry-button">
              Retry
            </button>
          </div>
        )}
        
        {user ? (
          <>
            <CustomerInfo customer={user} />
            <RecentPosts posts={posts} loading={apiLoading} />
            <ReplyDraft ticket={ticketData} customer={user} posts={posts} />
          </>
        ) : !apiLoading && !apiError && ticketData?.requesterEmail && (
          <div className="no-customer">
            <p>Customer not found</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App