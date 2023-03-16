import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [allClubs, setAllClubs] = useState([])

  const updateUser = (user) => setCurrentUser(user)
  const newUser = (newUser) => {
      setUsers([...users, newUser])
  }

  useEffect(() => {
    fetch("/authorized_user")
      .then(res => {
        if(res.ok){
          res.json().then(user => {
            updateUser(user)
          })
        }
      })
  }, [])

  useEffect(() => {
      fetch('/users')
        .then(r => r.json())
        .then(data => setUsers(data))
  }, [])

  function handleLogout(){
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(setCurrentUser(false))
    .then(window.location.href = '/login')
  }

  const onDeleteUser = (id) => {
    const updatedUser = users.filter((currentUser) => currentUser.id !== id)
    setCurrentUser(updatedUser)
  }

  const onEditUserProfile = (modifiedUser) => {
    const updateUser = users.map(user => currentUser.id === user.id ? modifiedUser : user)
    setCurrentUser(updateUser)
  }

  return (
  
    <div>
      <Router>
      <NavBar currentUser={currentUser} handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/">
          {/* <Login updateUser={updateUser}/> */}
        </Route>

        <Route exact path="/login">
          <Login updateUser={updateUser}/>
        </Route>

        <Route exact path="/signup">
          <Signup setCurrentUser={setCurrentUser} newUser={newUser}/>
        </Route>

        <Route path="/profile">
            <UserProfile
            currentUser={currentUser}
            onDeleteUser={onDeleteUser}
            onEditUserProfile={onEditUserProfile}/>
        </Route>

      </Switch>
      </Router>
    </div>
  )
}

export default App