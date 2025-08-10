import { useState, useEffect } from 'react'

export const useZendeskClient = () => {
  const [client, setClient] = useState(null)

  useEffect(() => {
    if (window.ZAFClient) {
      const zafClient = window.ZAFClient.init()
      setClient(zafClient)
    }
  }, [])

  return client
}