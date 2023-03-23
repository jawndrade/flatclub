import React, { useEffect, useState } from 'react'
import Club from './Club'

function UserClubs({setCurrentUser, currentUser}) {
    const [userMemberships, setUserMemberships] = useState([])

    useEffect(() => {
        fetch(`/users/${currentUser.id}`)
          .then(resp => resp.json())
          .then(data => setCurrentUser(data))
    }, [])

    useEffect(() => {
        setUserMemberships(currentUser.my_memberships)
      }, [currentUser])
    //   console.log(currentUser.my_memberships)

    const userMembershipCards = userMemberships.map(club =>
        <Club key={club.name} club={club} currentUser={currentUser}/>
    )
    // console.log(userMemberships)


    return (
    <div>
        {userMembershipCards}
    </div>
    )
  }

export default UserClubs