import React, {useEffect, useState} from 'react'
import Club from './Club'

function Dashboard({clubs, addToMyClubs}) {
    const [clubsDisplayed, setClubsDisplayed] = useState(clubs)

    useEffect(() => {
        setClubsDisplayed(clubs)
    }, [clubs])
    
    return (
        <div className="dashboard-wrapper">
            {/* <h2>All clubs</h2> */}
            <div className="dashboard-grid">
                {clubsDisplayed.map(club => <Club key={club.name} club={club} addToMyClubs={addToMyClubs}/>)}
            </div>
        </div>
    )
}

export default Dashboard