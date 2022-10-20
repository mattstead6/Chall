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
import ProfilePage from './ProfilePageContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProfilePageContainer from './ProfilePageContainer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const navigateTo = useNavigate();

  const [user, setUser] = useContext(UserContext)
  const [feed, setFeed] = useState([])
  const [profileFeed, setProfileFeed] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState(0)
  const [search, setSearch] = useState('')
  // const [startOfAChallenge, setStartOfAChallenge]

  // STATE FOR A CHALLENGE 
  const [newChall, setNewChall] = useState({
    user_id: user.id,
    video: '',
    challenge_description: '',
    category: '',
    challenge_name: ''
  })

  // STATE FOR A POST 
  const [newPost, setNewPost] = useState({
    challenge_id: 0,
    user_id: user.id,
    video: '',
    challenge_description: '',
    category: '',
    challenge_name: '',
    caption: '',
  })

  console.log('feed', newChall)

  function handleLogout() {

    fetch(`logout/`, {
      method: "DELETE"
    })
      .catch(error => console.log(error.message))
      .then(navigateTo('/'))

  }

  useEffect(() => {
    fetch(`/me`)
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            setNewChall({ ...newChall, user_id: user.id })
            setNewPost({ ...newPost, user_id: user.id })
            setUser(user)
          })
        }
        else {
          console.log("fetch failed")
        }
      })
  }, [])


  

  function handlePost() {
    fetch(`/challenges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        newChall
      )
    })
      .then(res => {
        if (res.ok) {
          return res.json().then(chall => {
            const updatedPost = { ...newPost, challenge_id: chall.id }
            console.log('updated post maybe',updatedPost)
            setNewPost(updatedPost)
            return updatedPost
          })
        } else {
          return res.json().then(response => {
            console.log(response.error)
          })
        }
      }
      )
      .then((updatedPost) => {
        return fetch(`/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(
            updatedPost
          )
        })
      })
      .then(res => res.json())
      .then(data => setFeed([...feed, data]))
      .then(() => navigateTo('/home'))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetch(`/posts`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProfileFeed(data)
        setFeed(data)
      })

  }, [])

  function handleSearchChange(e) {

    if (e.target.value === '') {
      setSearch('')
    }
  }

  let postsToShow = feed
  if (search !== '') {
    postsToShow = feed.filter((post) => {
      const isInDescription = post.challenge.challenge_description.toLowerCase().includes(search.toLowerCase())
      const isInTitle = post.challenge.challenge_name.toLowerCase().includes(search.toLowerCase())
      return (isInDescription || isInTitle)
    })
  }
  //if posts to show is 0 say "no matches"


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <div className="app-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Chall</Navbar.Brand>
              <Navbar.Brand >{user.username}</Navbar.Brand>
              <form onSubmit={(e) => {
                e.preventDefault()
                setSearch(e.target.search.value)
              }} className="search-bar">
                <input name='search' className="inputBox" type="text" placeholder="Search" onChange={handleSearchChange}></input>
              </form>
              <Nav>
                <Nav.Link href="/challenge">Submit a Challenge</Nav.Link>
                <Nav.Link href="/home">Feed</Nav.Link>
                <Nav.Link href={`/users/${user.id}`}>Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

              </Nav>
            </Container>
          </Navbar>
        </div>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomeContainer setProfileFeed={setProfileFeed} setSelectedChallenge={setSelectedChallenge} setFeed={setFeed} feed={postsToShow} />} />
          <Route path="/challenge" element={<ChallengePage handlePost={handlePost} newPost={newPost} setNewPost={setNewPost} newChall={newChall} setNewChall={setNewChall} />} />
          <Route path="/challenges/:id/post/:name" element={<PostPage newPost={newPost} />} />
          <Route path="/challenges/:id/contribute-post/:id" element={<PostPopularChallenge handlePost={handlePost} selectedChallenge={selectedChallenge} feed={postsToShow} setNewChall={setNewChall} newChall={newChall} newPost={newPost} setNewPost={setNewPost} />} />
          <Route path="/users/:id" element={user.id ? <ProfilePageContainer /> : null} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
