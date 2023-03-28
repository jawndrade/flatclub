import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography'
import Club from './Club'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

function Dashboard({clubs, addToMyClubs}) {
    const [clubsDisplayed, setClubsDisplayed] = useState(clubs)
    const [sortOrder, setSortOrder] = useState('')

    useEffect(() => {
        if (sortOrder === "asc") {
            setClubsDisplayed([...clubsDisplayed].sort((a, b) => a.name.localeCompare(b.name)))
        } else if (sortOrder === "desc") {
            setClubsDisplayed([...clubsDisplayed].sort((a, b) => b.name.localeCompare(a.name)))
        } else {
            setClubsDisplayed(clubs)
        }
    }, [clubs, sortOrder])
    
    const handleSortSelectChange = (e) => {
        setSortOrder(e.target.value)
    }
    
    return (
        <div className="dashboard-wrapper">
            <Typography variant='h4' color="white" fontWeight={300}>All Clubs</Typography>
            <Typography variant='subtitle1' color="white" fontWeight={300}>Peruse clubs below. View their posts at any time and if you like what you see, join them!</Typography>
            <div className="dashboard-sort-select-container">
            <FormControl>            
                <InputLabel sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-10px" }}>Sort</InputLabel>
                <Select
                    size="small"
                    onChange={handleSortSelectChange}
                    value={sortOrder}
                    sx={{ background: "white", borderRadius: "8px", width: "100px", height: "35px", display: "flex" }}
                >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="asc">A-Z</MenuItem>
                    <MenuItem value="desc">Z-A</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className="dashboard-grid">
            <hr />
            {clubsDisplayed.map(club => (
                <div key={club.name} className="dashboard-grid-item">
                    <Club club={club} addToMyClubs={addToMyClubs}/>
                </div>
            ))}
        </div>
        </div>

    )
}

export default Dashboard