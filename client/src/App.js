import './App.css';
import Signup from './Signup';
import ChallengePage from './ChallengePage';
import Home from './Home'
import Login from './Login';
import PostPopularChallenge from './PostPopularChallenge';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/user';
import PostPage from './PostPage';
import HomeContainer from './HomeContainer';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function App() {

  const navigateTo = useNavigate();

  const [user, setUser] = useContext(UserContext)
  const [feed, setFeed] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState(0)
  console.log(selectedChallenge)
  const [challengeData, setChallengeData] = useState({
    video: '',
    challenge_description: '',
    category: '',
    challenge_name: ''
  })

  // STATE FOR STARTING A NEW CHALLENGE TREND ON THE CHALLENGEPAGE
  const [newChallenge, setNewChallenge] = useState({
    id: 0,
    user_id: 0,
    video: '',
    challenge_description: '',
    category: '',
    challenge_name: ''
  })

    // STATE FOR A POST 
    const [newPost, setNewPost] = useState({
      id: 0,
      user_id: 0,
      video: '',
      challenge_description: '',
      category: '',
      challenge_name: ''
    })

  function handlePostSubmit(e){
   fetch(`/posts`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify({
           newPost
       })
   })
   .then( res => res.json())
   .then( data => console.log(data))
   .catch( error => console.log(error.message));
  }

  function handleSubmit(e) {
    console.log(challengeData)
    e.preventDefault()
    fetch(`/challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        challengeData)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(newChallenge => {
            console.log(newChallenge)
            // setUser(newUser)
            setNewChallenge(newChallenge)
            navigateTo(`/challenges/${newChallenge.id}/post/${challengeData.challenge_name.split(' ').join('')}`)

          })
        } else {
          res.json().then(response => {
            //  setErrors(response.errors)
            console.log(response.error)

          })
        }
      }
      )
      .catch(error => console.log(error.message));

  }
  // const [user, setUser] = useState({});

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
  

  useEffect( () => {
    fetch(`/posts`)
    .then( res => res.json())
    .then( data => setFeed(data))

  },[])


  return (
    <div className="App">
<Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Chall</Navbar.Brand>
    <Nav>
    <Nav.Link href="/challenge">Submit a Challenge</Nav.Link>
    <Nav.Link href="/home">Feed</Nav.Link>
    </Nav>
  </Container>
</Navbar>



        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<HomeContainer setSelectedChallenge={setSelectedChallenge} setFeed={setFeed} feed={feed}/>}/>
          <Route path="/challenge" element={<ChallengePage handleSubmit={handleSubmit} challengeData={challengeData} setChallengeData={setChallengeData}/>}/>
          <Route path="/challenges/:id/post/:name" element={<PostPage newChallenge={newChallenge}/>}/>
          <Route path="/challenges/:id/contribute-post" element={<PostPopularChallenge selectedChallenge={selectedChallenge} feed={feed}/>}/>
        </Routes>
    </div>
  );
}

export default App;
