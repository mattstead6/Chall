import './App.css';
import Signup from './Signup';
import ChallengePage from './ChallengePage';
import Home from './Home'
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useContext, useEffect } from 'react';
import { UserContext } from './context/user';

function App() {

  const [user, setUser] = useContext(UserContext)

  useEffect( () => {
    fetch(`/me`)
    .then( res => {
      if (res.ok){
        res.json().then(user => setUser(user))
      }
      else {
        console.log("fetch failed")
    }
  })},[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/challenge" element={<ChallengePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
