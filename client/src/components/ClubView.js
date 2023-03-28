import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewPostForm from './NewPostForm'
import ClubDescription from './ClubDescription'
import NewCommentForm from './NewCommentForm'
import '../css/clubview.css'

function ClubView({ currentUser, setPosts }) {
  const { id } = useParams()
  const [club, setClub] = useState({posts: []}, {comments: []})
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/clubs/${id}`)
      .then(resp => resp.json())
      .then(data => {
        setClub(data)
      })
  }, [])
  
  const renderPosts = club.posts.map(post => {
    return (
      <>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <h4>Comments:</h4>
      <div>
            {post.comments.map(comment => (
              <div key={comment.id}>
                <h5>{comment.username}</h5>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
        <NewCommentForm currentUser={currentUser} postId={post.id}/>
      </>
      )
    })


  return (
    <div className='club-view'>
      <ClubDescription club={club}/>
      <NewPostForm currentUser={currentUser} setPosts={setPosts} clubId={id} />
      <div className='club-posts'>
        {renderPosts}
        </div>
    </div>
  )
}

export default ClubView