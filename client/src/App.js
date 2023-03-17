import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Signup from "./components/Signup"
import UserProfile from "./components/UserProfile"
import Club from "./components/Club"
import Dashboard from "./components/Dashboard";

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [clubs, setClubs] = useState([])
  const [comments, setComments] = useState([])

  const updateUser = (user) => setCurrentUser(user)
  const newUser = (newUser) => {
      setUsers([...users, newUser])
  }

  useEffect(() => {
    fetch("/authorized_user")
      .then(resp => {
        if(resp.ok){
          resp.json().then(user => {
            updateUser(user)
          })
        }
      })
  }, [])

  useEffect(() => {
      fetch('/users')
        .then(resp => resp.json())
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

  useEffect(() => {
    fetch("/clubs")
    .then((resp) => resp.json())
    .then((data) => setClubs(data))
    // .then(console.log('fetched!'))
  }, [])

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

        <Route path="/dashboard">
            <Dashboard clubs={clubs}
            />
        </Route>

      </Switch>
      </Router>
    </div>
  )
}

export default App