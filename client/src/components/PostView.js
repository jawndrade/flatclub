import React,{ useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ClubDescription from "./ClubDescription"
import "../css/postview.css"

function PostView(){
    const [post, setPost] = useState({})
    const [club, setClub] = useState([])
    const {id, post_id} = useParams()
    // console.log(post_id)

    useEffect(()=>{
        fetch(`/posts/${post_id}`)
        .then(resp=>resp.json())
        .then(data=>setPost(data))
    },[])

    useEffect(()=>{
        fetch(`/clubs/${id}`)
        .then(resp=>resp.json())
        .then(data=>setClub(data))
    },[])
    console.log(post.comments)

    return(
        <div className="post-main">
            <ClubDescription club={{...club, ...post.club}}/>
            <div className="post-details">
                <h1>{(post.title || "").toUpperCase()}</h1>
                <div>
                    {post.body}
                </div>
            </div>
        </div>    
    )
}

export default PostView