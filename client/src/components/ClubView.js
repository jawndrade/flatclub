import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ClubView() {
  const { id } = useParams()
  const [clubData, setClubData] = useState(null)

  useEffect(() => {
    fetch(`/clubs/${id}`)
      .then(res => res.json())
      .then(data => setClubData(data))
  }, [id])

  if (!clubData) return <div>Patience, young padawan...</div>

  const { topic, description, posts, comments } = clubData

  return(
    <div>
      <br/> <br/> <br/>
      <h2>{topic} Club</h2>
      <p>{description}</p>

      {/* Render club's posts */}
      {posts && posts.length > 0 && (
        <div>
          <h2>Posts:</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              {/* <p>Posted by {post.user.username} on {new Date(post.created_at).toDateString()}</p> */}
         <div>
                <h4>Comments:</h4>
                {post.comments && post.comments.length > 0 ? (
                  <ul>
                    {post.comments.map(comment => (
                      <li key={comment.id}>{comment.content}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}

      {/* Render comments */}
      {comments && comments.length > 0 && (
        <div>
          <h2>Comments:</h2>
          {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default ClubView