import { useState, useCallback } from 'react'
import { fetchUserByEmail, fetchPostsByUserId } from '../utils/api'

export const useJsonPlaceholder = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUser = useCallback(async (email) => {
    try {
      setLoading(true)
      setError(null)
      setUser(null)
      setPosts([])
      
      const userData = await fetchUserByEmail(email)
      if (userData.length > 0) {
        setUser(userData[0])
      } else {
        setError('Customer not found')
      }
    } catch (err) {
      setError('Failed to fetch customer data')
      console.error('Error fetching user:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPosts = useCallback(async (userId) => {
    try {
      const postsData = await fetchPostsByUserId(userId)
      setPosts(postsData)
    } catch (err) {
      console.error('Error fetching posts:', err)
    }
  }, [])

  return {
    user,
    posts,
    loading,
    error,
    fetchUser,
    fetchPosts
  }
}