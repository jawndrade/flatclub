import React, {useEffect, useState} from 'react'
import Club from './Club'

function Dashboard({clubs, addToMyClubs}) {
    const [clubsDisplayed, setClubsDisplayed] = useState(clubs)
    const [sortOrder, setSortOrder] = useState('')

    useEffect(() => {
        setClubsDisplayed(clubs)
    }, [clubs])

    const sortClubs = (order) => {
        let sortedClubs = []
        if (order === "asc") {
          sortedClubs = [...clubsDisplayed].sort((a, b) => a.name.localeCompare(b.name))
        } else {
          sortedClubs = [...clubsDisplayed].sort((a, b) => b.name.localeCompare(a.name))
        }
        setClubsDisplayed(sortedClubs)
    }

    const handleSortSelectChange = (e) => {
        setSortOrder(e.target.value)
        sortClubs(e.target.value)
    }
    
    return (
        <div className="dashboard-wrapper">
            <h3>All Clubs</h3>
            <div>
                <select onChange={handleSortSelectChange}>
                    <option value="">Sort by</option>
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
            </div>
            <div className="dashboard-grid">
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