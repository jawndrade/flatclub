import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewPostForm from './NewPostForm'
import ClubDescription from './ClubDescription'
import NewCommentForm from './NewCommentForm'
import Typography from '@mui/material/Typography'
import { HiReply } from 'react-icons/hi'
import { HiTrash } from 'react-icons/hi'
import '../css/clubview.css'

function ClubView({ currentUser, setPosts }) {
  const { id } = useParams()
  const [club, setClub] = useState({posts: []}, {comments: []})
  const [displayCommentForm, setDisplayCommentForm] = useState({})

  useEffect(() => {
    fetch(`/clubs/${id}`)
      .then(resp => resp.json())
      .then(data => {
        setClub(data)
      })
  }, [])

  const toggleCommentForm = postId => {
    setDisplayCommentForm(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const renderPosts = club.posts.map(post => {
    const isDisplayCommentForm = displayCommentForm[post.id]
    const postUser = club.users.find(user => user.id === post.user_id)
    const postUsername = postUser ? postUser.username : 'Anonymous'
    return (
      <>
        <div className='post'>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="subtitle2">Posted by {postUsername} on {new Date (post.created_at).toDateString()}</Typography>
          <br/>
          <Typography variant="body1">{post.body}</Typography>
          <div className="reply-container">
            {!isDisplayCommentForm && (
              <HiReply onClick={() => toggleCommentForm(post.id)}/>
            )}
            {isDisplayCommentForm && (
              <NewCommentForm currentUser={currentUser} postId={post.id} displayForm={true}/>
            )}
          </div>
          {post.comments.map(comment => (
            <div className="comment" key={comment.id}>
              <Typography variant="subtitle2">{comment.username} commented:</Typography>
              <br/>
              <Typography variant="body1">{comment.content}</Typography>
            </div>
          ))}
        </div>
      </>
    )
  })

  return (
    <div className='club-view'>
      <ClubDescription club={club}/>
        <div className='club-posts'>
          <NewPostForm currentUser={currentUser} setPosts={setPosts} clubId={id} />
          <br/>
          {renderPosts}
        </div>
    </div>
  )
}

export default ClubView