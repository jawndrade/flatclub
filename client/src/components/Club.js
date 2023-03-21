import React from 'react'
import "../css/club.css"

function Club({club}) {
    const {topic, description, name} = club

    return (
        <div>
            <div className="club-card">
                {/* <h2>Club {name}</h2> */}
                <h2 className="card-h2">Club {topic}</h2>
                <p>{description}</p>
                <br/>
                <button>View posts</button>
            </div>
        </div>
    )
}

export default Club