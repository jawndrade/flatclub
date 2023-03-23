import React, {useState} from 'react'
import Club from './Club'

function Dashboard({clubs, addToMyClubs}) {
    
    return (
        <div className="dashboard-wrapper">
            {/* <h2>All clubs</h2> */}
            <div className="dashboard-grid">
                {clubs.map(club => <Club key={club.name} club={club} addToMyClubs={addToMyClubs}/>)}
            </div>
        </div>
    )
}

export default Dashboard