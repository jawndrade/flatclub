import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewPostForm from './NewPostForm'

function ClubView({setPosts, currentUser}) {
  const { id } = useParams()
  const [clubData, setClubData] = useState(null)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetch(`/clubs/${id}`)
      .then(res => res.json())
      .then(data => setClubData(data))
  }, [id])
  // console.log(id)

  useEffect(() => {
    if (clubData && clubData.posts){
      const userIds = clubData.posts.map(post => post.user_id)
      const commentUserIds = clubData.posts.flatMap(post => post.comments).map(comment => comment.user_id)
      const allUserIds = [...new Set([...userIds, ...commentUserIds])]
      fetch(`/users?ids=${allUserIds.join(',')}`)
        .then(resp => resp.json())
        .then(data => {
          const users = {}
          data.forEach(user => {
            users[user.id] = user.username
          })
          setUserData(users)
        })
    }
  }, [clubData])

  if (!clubData) return <div>Patience, young padawan...</div>

  const { topic, description, posts, comments } = clubData

  return(
    <div>
      <br/> <br/> <br/>
      <h2>{topic} Club</h2>
      <p>{description}</p>

      {/* Render club's posts */}
      <div>
  {/* <h2>Posts:</h2> */}
  {posts && posts.length > 0 ? (
    posts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>Posted by {userData[post.user_id]} on {new Date(post.created_at).toDateString()}</p>
        <p>{post.body}</p>
        <div>
          {/* <h4>Comments:</h4> */}
          {post.comments && post.comments.length > 0 ? (
            <ul>
              {post.comments.map(comment => (
                <li key={comment.id}>{comment.content} Posted by {userData[comment.user_id]} on {new Date(comment.created_at).toDateString()}</li>
              ))}
            </ul>
          ) : (
            <h3>No comments yet.</h3>
          )}
        </div>
        <hr/>
      </div>
    ))
  ) : (
    <h3>No posts yet!</h3>
  )}
</div>

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
      <NewPostForm
        currentUser={currentUser}
        setPosts={setPosts}
        clubId={id}
      />
    </div>
  )

}

export default ClubView