import React from "react"

function ClubDescription({club}){
    return(
        <div className="club-desc">
            <h2>{club.topic}</h2>
            <p>{club.description}</p>
        <hr/>
        <div className="members-main">
            <div>
                <b>Members</b>
            </div>
            {(club.users || []).map(user=>
            <div className="member-card">
                <img src={user.image}/><span>{user.username}</span>
            </div>
            )}
        </div>
    </div>
    )
}

export default ClubDescription