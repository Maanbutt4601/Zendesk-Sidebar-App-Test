import React, { useState, useEffect } from 'react'
import TicketInfo from './components/TicketInfo'
import CustomerInfo from './components/CustomerInfo'
import RecentPosts from './components/RecentPosts'
import ReplyDraft from './components/ReplyDraft'
import LoadingSpinner from './components/LoadingSpinner'
import TestEmailSelector from './components/TestEmailSelector'
import { useZendeskClient } from './hooks/useZendeskClient'
import { useJsonPlaceholder } from './hooks/useJsonPlaceholder'

function App() {
  const [ticketData, setTicketData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentTestEmail, setCurrentTestEmail] = useState('Sincere@april.biz')
  const [isDemoMode, setIsDemoMode] = useState(false)
  
  const zafClient = useZendeskClient()
  const { fetchUser, fetchPosts, user, posts, apiLoading, apiError } = useJsonPlaceholder()

  // Detect if we're in demo mode
  useEffect(() => {
    setIsDemoMode(!!window.ZAFClient && !!window.testScenarios)
  }, [])

  // Initialize ZAF client and load initial data
  useEffect(() => {
    if (zafClient) {
      loadTicketData()
    }
  }, [zafClient])

  // Fetch user data when ticket data changes
  useEffect(() => {
    if (ticketData?.requesterEmail) {
      fetchUser(ticketData.requesterEmail)
    }
  }, [ticketData, fetchUser])

  // Fetch posts when user data is available
  useEffect(() => {
    if (user?.id) {
      fetchPosts(user.id)
    }
  }, [user, fetchPosts])

  // Listen for test email changes in demo mode
  useEffect(() => {
    const handleTestEmailChange = () => {
      loadTicketData()
    }
    
    if (isDemoMode) {
      window.addEventListener('testEmailChanged', handleTestEmailChange)
      return () => window.removeEventListener('testEmailChanged', handleTestEmailChange)
    }
  }, [isDemoMode])

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

  const handleTestEmailChange = (email, name, scenario) => {
    setCurrentTestEmail(email)
    if (window.changeTestEmail) {
      window.changeTestEmail(email)
    }
  }

  const handleRefresh = () => {
    if (zafClient) {
      loadTicketData()
    }
    if (ticketData?.requesterEmail) {
      fetchUser(ticketData.requesterEmail)
    }
  }

  // Loading state
  if (loading && !ticketData) {
    return <LoadingSpinner message="Loading ticket data..." />
  }

  // Error state
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
        <div className="header-actions">
          {isDemoMode && (
            <TestEmailSelector 
              onEmailChange={handleTestEmailChange}
              currentEmail={currentTestEmail}
            />
          )}
          <button onClick={handleRefresh} className="refresh-button">
            🔄 Refresh
          </button>
        </div>
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