import React from 'react'
import LoadingSkeleton from './LoadingSpinner'

const RecentPosts = ({ posts, loading }) => {
  if (loading) {
    return (
      <section className="section-card">
        <div className="section-header">
          <div className="section-icon">📊</div>
          <h2 className="section-title">Recent Activity</h2>
        </div>
        <LoadingSkeleton lines={3} />
      </section>
    )
  }

  const lastThreePosts = posts?.slice(-3) || []
  const totalPosts = posts?.length || 0

  return (
    <section className="section-card slide-in">
      <div className="section-header">
        <div className="section-icon">📊</div>
        <h2 className="section-title">Recent Activity</h2>
        <div className="status-indicator success">
          {totalPosts} total posts
        </div>
      </div>
      {lastThreePosts.length > 0 ? (
        <ul className="posts-list">
          {lastThreePosts.map((post, index) => (
            <li key={post.id} className="post-item fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <strong>Post #{post.id}:</strong> {post.title}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-customer">
          No recent activity found
        </div>
      )}
    </section>
  )
}

export default RecentPosts