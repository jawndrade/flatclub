import React from 'react';
import {NavLink} from "react-router-dom";

function NavBar({currentUser, handleLogout}) {


    return (
        <div>
            <NavLink
                to='/'
                exact
            >
            </NavLink>
                <p className='font-bold'>FlatClub</p>    
            <NavLink
                to='/'
                exact
            >
                <p>Home</p>
            </NavLink>
            <NavLink
                to='/signup'
                exact
            >
                <p>Signup</p>
            </NavLink>
            {currentUser ? 
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <img width="25px" className="userImage" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="user"/>
                </>
                : 
                <NavLink
                to='/login'
                exact
                >
                    <p>Log In</p>
                </NavLink>}
        </div>
    );
}

export default NavBar;