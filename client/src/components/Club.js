import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import "../css/club.css"

function Club({club}) {
    const {topic, description, name} = club

    function handleClick() {
        window.location.href = `/clubs/${club.id}`
      }

    return (
        <div>
            <div className="club-card">
                {/* <h2>Club {name}</h2> */}
                <h2 className="card-h2">Club {topic}</h2>
                <p>{description}</p>
                <br/>
                <NavLink to={`/clubs/${club.id}`}>
                    <button onClick={handleClick}>View posts</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Club