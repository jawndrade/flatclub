import React, { useState } from 'react'

function NewCommentForm ({currentUser, setComments, postId, commentId}) {
    const [content, setContent] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const newComment = {
            content: content,
            user_id: currentUser.id,
            post_id: postId,
            id: commentId
        }
        
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
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