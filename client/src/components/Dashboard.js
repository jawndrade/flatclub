import React, {useState} from 'react'
import Club from './Club'

function Dashboard({clubs}) {
    return (
        <div className='flex'>
            <div className='flex flex-wrap'>
                {clubs.map(club => <Club key={club.name} club={club} />)}
            </div>
        </div>
    )
}

export default Dashboard