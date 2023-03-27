import React, { useEffect, useState } from 'react'
import Club from './Club'

function UserClubs({setCurrentUser, currentUser}) {
  const [clubs, setClubs ] = useState([])

  useEffect(() => {
    fetch(`/memberships`)
      .then(resp => resp.json())
      .then(data => setClubs(data))
}, [])

    return (
      <div className="dashboard-wrapper h-100vh">
        <div className="dashboard-grid">
          {clubs.map(obj => <Club key={obj.id} club={obj.club} join={false}/>)}
        </div>
      </div>
    )
  }

export default UserClubs