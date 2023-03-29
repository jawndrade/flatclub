import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewPostForm from './NewPostForm'
import ClubDescription from './ClubDescription'
import NewCommentForm from './NewCommentForm'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
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

  const deletePost = (postId) => {
    fetch(`/posts/${postId}`, {
      method: "DELETE"
    })
    .then(resp => {
      if(resp.ok) {
        alert('Post successfully deleted!')
        window.location.reload()
      } else {
        throw new Error('Network response was not ok.')
      }
    })
    .catch(error => console.log('Error:', error))
  }

  const deleteComment = (commentId) => {
    fetch(`/comments/${commentId}`, {
      method: "DELETE"
    })
    .then(resp => {
      if(resp.ok) {
        alert('Comment successfully deleted!')
        window.location.reload()
      } else {
        throw new Error('Network response was not ok.')
      }
    })
    .catch(error => console.log('Error:', error))
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
          <IconButton aria-label="delete" onClick={() => deletePost(post.id)}>
            <DeleteIcon />
          </IconButton>
          <br/>
          <Typography variant="body1">{post.body}</Typography>
          <div className="reply-container">
              <span className="comment-text" onClick={() => toggleCommentForm(post.id)}>Leave a Comment</span>
            {isDisplayCommentForm && (
              <NewCommentForm currentUser={currentUser} postId={post.id} displayForm={true}/>
            )}
          </div>
          <hr/>
          {post.comments.map(comment => (
            <div className="comment" key={comment.id}>
              <Typography variant="subtitle2">{comment.username} commented:</Typography>
              <br/>
              <Typography variant="body1">{comment.content}</Typography>
              <IconButton aria-label="delete" onClick={() => deleteComment(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </>
    )
  })

  return (
    <Container sx={{marginTop: "40px", paddingTop: "60px", minWidth: "100%", background: "#133056"}}>
      <div className='club-view'>
        <ClubDescription club={club}/>
          <div className='club-posts'>
            <NewPostForm currentUser={currentUser} setPosts={setPosts} clubId={id} />
            <br/>
            {renderPosts}
          </div>
      </div>
    </Container>
  )
}

export default ClubView