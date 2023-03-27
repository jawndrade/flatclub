import React, { useState } from 'react'
import Club from './Club'

function Search({ clubs }) {
  const [clubsDisplayed, setClubsDisplayed] = useState([])

  function searchClub(e) {
    setClubsDisplayed(clubs.filter(club =>
      club.name.toLowerCase().includes(e.target.value) ||
      club.description.toLowerCase().includes(e.target.value) ||
      club.topic.toLowerCase().includes(e.target.value)
    ))
  }

  return (
    <div className="dashboard-wrapper">
      <input placeholder='Search clubs by keyword' onChange={searchClub} />
      <div className="dashboard-grid">
        {clubsDisplayed.map(club => <Club key={club.name} club={club} />)}
      </div>
    </div>
  )
}

export default Search