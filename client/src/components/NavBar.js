import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import "../css/navbar.css"

function NavBar({currentUser, handleLogout}) {

    // set state for toggling navbar menu 
    const [showMenu, setShowMenu] = useState(false)

    function toggleMenu(){
        setShowMenu(!showMenu)
    }

    function closeMenu(){
        setShowMenu(false)
    }

    return (
        <nav className="navbar-container">
            <div className="logo-container">
                <h2 className="logo-text">//ClubFlatiron</h2>
            </div>
                <ul className='nav-links grow'>
                    {currentUser && Object.keys(currentUser).length !== 0 ? (
                        <>
                            <img width="25px" className="userImage" src={currentUser.image} alt="user"/>
                            <li><NavLink to='/dashboard' onClick={closeMenu}>Home</NavLink></li>
                            <li><NavLink to='/memberships' onClick={closeMenu}>My Clubs</NavLink></li>
                            <li><NavLink to='/profile' onClick={closeMenu}>Profile</NavLink></li>
                            <li><NavLink to='/' onClick={() => { closeMenu(); handleLogout(); }}>Logout</NavLink></li>
                        </>
                        ) : (
                        <>
                            <li><NavLink to='/login' onClick={closeMenu}>Log In</NavLink></li>
                            <li><NavLink to='/signup' onClick={closeMenu}>Sign Up</NavLink></li>
                        </>
                    )}
                </ul>
        </nav>
    )
}

export default NavBar