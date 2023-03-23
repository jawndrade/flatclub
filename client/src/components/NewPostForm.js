import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'

function NewPostForm ({currentUser, setPosts}) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    // const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        const newPost = {
            title: title,
            body: body,
            user_id: currentUser.id
        }
        
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
        .then(resp => {
            if(resp.status === 201) {
                fetch("/posts")
                .then((resp) => resp.json())
                .then((data) => setPosts(data))
                window.location.reload()
            } else {
                resp.json().then((errorData)=> alert(errorData.errors))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
                Body:
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Post</button>
        </form>
    )
}

export default NewPostForm