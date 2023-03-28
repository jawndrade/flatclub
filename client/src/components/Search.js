import React, { useState } from 'react'
import Club from './Club'
import { Container, InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

function Search({ clubs }) {
  const [clubsDisplayed, setClubsDisplayed] = useState([])

  function searchClub(e) {
    setClubsDisplayed(clubs.filter(club =>
      club.name && club.name.toLowerCase().includes(e.target.value) ||
      club.description && club.description.toLowerCase().includes(e.target.value) ||
      club.topic && club.topic.toLowerCase().includes(e.target.value)
    ))
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <TextField
        variant="filled"
        type="search"
        label='Search clubs by keyword'
        onChange={searchClub}
        sx={{ width: 858, background: "white", borderRadius: "8px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}/>
      <div className="dashboard-grid">
        {clubsDisplayed.map(club => 
          <div key={club.name} className="dashboard-grid-item">
            <Club club={club} />
          </div>
        )}
      </div>
    </Container>
  )
}

export default Search