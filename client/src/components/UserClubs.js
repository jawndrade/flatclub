import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Club from './Club'

function UserClubs({setCurrentUser, currentUser}) {
  const [clubs, setClubs ] = useState([])

  useEffect(() => {
    fetch(`/memberships`)
      .then(resp => resp.json())
      .then(data => setClubs(data))
}, [])

    return (
      <Container sx={{marginTop: "50px", paddingTop: "60px", background: "inherit"}}>
        <Typography variant='h4' color="white" fontWeight={300}>My Clubs</Typography>
        <div className="dashboard-grid">
          <hr />
          <br />
          {clubs.map(obj => (
            <div key={obj.name} className="dashboard-grid-item">
              <Club key={obj.id} club={obj.club} join={false}/>
            </div>
          ))}
        </div>
      </Container>
    )
  }

export default UserClubs