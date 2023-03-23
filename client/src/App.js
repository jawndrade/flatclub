import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import Signup from "./components/Signup"
import UserProfile from "./components/UserProfile"
import Dashboard from "./components/Dashboard"
import ClubView from "./components/ClubView"
import UserClubs from "./components/UserClubs"
import NewPostForm from "./components/NewPostForm";

function App() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [clubs, setClubs] = useState([])
  const [comments, setComments] = useState([])
  const [posts, setPosts] = useState([]);

  const newUser = (newUser) => {
    setUsers([...users, newUser])
  }
  const updateUser = (user) => setCurrentUser(user)
  
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

  useEffect(() => {
    fetch("/clubs")
    .then(resp => resp.json())
    .then(data => setClubs(data))
  }, [])

  // useEffect(() => {
  //   fetch("/posts")
  //   .then((resp) => resp.json())
  //   .then((data) => setPosts(data))
  // }, [])

  const onDeletePost = (currentUserId) => {
    const updatedPost = posts.filter((post) => post.id !== currentUserId)
    setPosts(updatedPost)
  }

  // useEffect(() => {
  //   fetch('/comments')
  //     .then(resp => resp.json())
  //     .then(data => setComments(data))
  // }, [])

  function addToMyClubs(club){
    fetch('/memberships')
    .then(resp => resp.json())
    .then(data => {
      const existingMembership = data.find(membership => membership.user_id === currentUser.id && membership.club_id === club.id)
      if (existingMembership) {
        alert("You're already a member of this club, you silly goose!")
      } else {
        fetch('/memberships', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            club_id: club.id,
            user_id: currentUser.id
          })
        })
        .then(resp => {
          if (resp.ok) {
            alert('Successfully joined this club!')
          } else {
            throw new Error('Failed to join, please try again later')
          }
        })
        .catch(err => {
          console.error(err)
          alert("You're already a member of this club, you silly goose!")
        })
      }
    })
  }

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

        <Route path="/dashboard">
            <Dashboard clubs={clubs} addToMyClubs={addToMyClubs}/>
        </Route>

        <Route path="/clubs/:id">
          <ClubView onDeletePost={onDeletePost}/>
          <NewPostForm
            currentUser={currentUser}
            setPosts={setPosts}/>
        </Route>

        <Route path="/memberships">
          <UserClubs currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>

      </Switch>
      </Router>
    </div>
  )
}

export default App