import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewPostForm from './NewPostForm'
import ClubDescription from './ClubDescription'
import '../css/clubview.css'
import NewCommentForm from './NewCommentForm'

function ClubView({currentUser, setPosts}) {
  const { id } = useParams()
  const [clubData, setClubData] = useState(null)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetch(`/clubs/${id}`)
      .then(res => res.json())
      .then(data => setClubData(data))
  }, [id])
  //console.log(id)
  //console.log(clubData)

  useEffect(() => {
    if (clubData && clubData.posts){
      const userIds = clubData.posts.map(post => post.user_id)
      const commentUserIds = clubData.posts
        .flatMap((post) => post.comments)
        .map((comment) => (comment || {}).user_id)
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
    <div className='club-view'>
      <ClubDescription club={clubData}/>
      <div className='club-posts'>
        <NewPostForm currentUser={currentUser} setPosts={setPosts} clubId={id} />
        <hr/>
        {/* <h2>Posts:</h2> */}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="single-post"
              >
              <h4 className='title'
              onClick={() => {
                window.location.href = `./${id}/${post.id}`
              }}
              >{post.title}</h4>
              <p>
                Posted by <b>{post.user.username}</b> on{' '}
                <i>
                {new Date(post.created_at).toDateString()}
                </i>
              </p>
              <p>{post.body}</p>
              <NewCommentForm currentUser={currentUser} clubId={id}/>
              <div>
                {/* <h4>Comments:</h4> */}
                {post.comments && post.comments.length > 0 ? (
                  <ul>
                    {post.comments.map((comment) => (
                      <li key={comment.id}>
                        {comment.content} Posted by {userData[comment.user_id]}{' '}
                        on {new Date(comment.created_at).toDateString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h4>No comments yet.</h4>
                )}
              </div>
              <hr />
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
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClubView