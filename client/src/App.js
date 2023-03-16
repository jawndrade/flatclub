import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Signup from "./components/Signup";

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})

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

  return (
  
    <div>
      <Router>
      <NavBar currentUser={currentUser} handleLogout={handleLogout}/>
      <Switch>
        <Route exact path="/">
          <Login updateUser={updateUser}/>
        </Route>
        <Route exact path="/login">
          <Login updateUser={updateUser}/>
        </Route>
        <Route exact path="/signup">
            <Signup setCurrentUser={setCurrentUser} newUser={newUser}/>
        </Route>
      </Switch>
      </Router>
    </div>

  )
}

export default App