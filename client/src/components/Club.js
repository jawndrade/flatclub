import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import "../css/club.css"
import Button from '@mui/material/Button'

function Club({club, addToMyClubs, join = true}) {
    const {topic, description, name} = club
    // console.log(club)

    function handleClick() {
        window.location.href = `/clubs/${club.id}`  
    }

    return (
        <div>
            <div className="club-card">
                {/* <h2>Club {name}</h2> */}
                <h2 className="card-h2">Club {topic}</h2>
                <p>{description}</p>
                <NavLink to={`/clubs/${club.id}`}>
                    <Button onClick={handleClick} sx={{ color: '0c1f38' }}>View posts</Button>
                </NavLink>
                <br/>
                {join && <Button onClick={() => addToMyClubs(club)}>Join Club</Button>}
            </div>
        </div>
    )
}

export default Club