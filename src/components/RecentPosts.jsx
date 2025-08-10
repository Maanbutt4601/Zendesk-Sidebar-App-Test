import React from 'react'

const RecentPosts = ({ posts, loading }) => {
  if (loading) {
    return (
      <section className="recent-posts">
        <h2>Recent Posts</h2>
        <p>Loading posts...</p>
      </section>
    )
  }

  const lastThreePosts = posts?.slice(-3) || []

  return (
    <section className="recent-posts">
      <h2>Last 3 Posts</h2>
      {lastThreePosts.length > 0 ? (
        <ul className="posts-list">
          {lastThreePosts.map(post => (
            <li key={post.id} className="post-item">
              {post.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found</p>
      )}
    </section>
  )
}

export default RecentPosts