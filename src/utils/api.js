const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUserByEmail = async (email) => {
  const response = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const fetchPostsByUserId = async (userId) => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}