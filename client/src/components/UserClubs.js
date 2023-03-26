import React, { useEffect, useState } from 'react'
import Club from './Club'

function UserClubs({setCurrentUser, currentUser}) {
  const [clubs, setClubs ] = useState([])

  useEffect(() => {
    fetch(`/memberships`)
      .then(resp => resp.json())
      .then(data => setClubs(data))
}, [])

    // useEffect(() => {
    //     setUserMemberships(currentUser.my_memberships)
    //   }, [currentUser])
    //   console.log(currentUser.my_memberships)

    // const userMembershipCards = userMemberships.map(club =>
    //     <Club key={club.name} club={club} currentUser={currentUser}/>
    // )
    // console.log(userMemberships)

    return (
      <div className="dashboard-wrapper h-100vh">
        <div className="dashboard-grid">
          {clubs.map(obj => <Club key={obj.id} club={obj.club} join={false}/>)}
        </div>
      </div>
    )
  }

export default UserClubs