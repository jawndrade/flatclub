import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function NewCommentForm ({currentUser, setComments, postId}) {
    const [content, setContent] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const newComment = {
            content: content,
            user_id: currentUser.id,
            post_id: postId
        }
        
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
        // console.log(newComment)
        .then(resp => {
            if(resp.status === 201) {
                fetch(`/posts/${postId}`)
                .then((resp) => resp.json())
                .then((data) => setComments(data))
                window.location.reload()
            } else {
                resp.json().then((errorData)=> alert(errorData.errors))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="comment-form-row">
                <textarea className="message-input" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button>Add Comment</button>
            </div>
        </form>
    )
}

export default NewCommentForm