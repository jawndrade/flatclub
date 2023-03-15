import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login"


function App() {
  const [users, setUsers] = useState([])

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
            fetchCoffees()
          })
        }
      })
  }, [])

  useEffect(() => {
      fetch('/users')
        .then(r => r.json())
        .then(data => setUsers(data))
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        
        <Route exact path="/">
          <Login updateUser={updateUser}/>
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  )
}

export default App;