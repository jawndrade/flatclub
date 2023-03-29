import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import "../css/navbar.css"

function NavBar({currentUser, handleLogout}) {

    return (
        <nav className="navbar-container">
            <div className="logo-container">
                <h2 className="logo-text">Club Flatiron</h2>
            </div>
                <ul className='nav-links grow'>
                    {currentUser && Object.keys(currentUser).length !== 0 ? (
                        <>
                            <img width="25px" className="userImage" src={currentUser.image} alt="user"/>
                            <li><NavLink to='/dashboard'>Home</NavLink></li>
                            <li><NavLink to='/memberships'>My Clubs</NavLink></li>
                            <li><NavLink to='/search'>Search</NavLink></li>
                            <li><NavLink to='/whiteboard'>Whiteboard</NavLink></li>
                            <li><NavLink to='/profile'>Profile</NavLink></li>
                            <li><NavLink to='/' onClick={() => {handleLogout()}}>Logout</NavLink></li>
                        </>
                        ) : (
                            <>
                            <li><NavLink to='/login' >Log In</NavLink></li>
                            <li><NavLink to='/signup' >Sign Up</NavLink></li>
                        </>
                    )}
                </ul>
        </nav>
    )
}

export default NavBar