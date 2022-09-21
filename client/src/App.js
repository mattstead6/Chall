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

  

  // function handlePostSubmit(e){
  //  fetch(`/posts`, {
  //      method: "POST",
  //      headers: {
  //          "Content-Type": "application/json",
  //          Accept: "application/json"
  //      },
  //      body: JSON.stringify({
  //          newPost
  //      })
  //  })
  //  .then( res => res.json())
  //  .then( data => console.log(data))
  //  .catch( error => console.log(error.message));
  // }

  // function handleSubmit(e){
  //   e.preventDefault()
  //   setNewChallenge(challengeData)
  //   navigateTo(`/challenges/${challengeData.id}/post/${challengeData.challenge_name.split(' ').join('')}`)

  // }


  function handlePost(e) {
    e.preventDefault()
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
            //(chall)
            const updatedPost = { ...newPost, challenge_id: chall.id }
            setNewPost(updatedPost)
            return updatedPost
            // setNewPost({ ...newPost, challenge: chall })
            //console.log(newPost)
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

  //console.log("the feed is here:", feed)
  //console.log("the new post is here", newPost)

  useEffect(() => {
    fetch(`/posts`)
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        setProfileFeed(data)
        setFeed(data)
      })

  }, [])

function handleSearchChange(e) {
  setSearch(e.target.value)
}

const searchedPosts = feed.filter((post) => {
return post.challenge.challenge_description.toLowerCase().includes(search.toLowerCase())
})

function handleSearch() {
  setFeed(searchedPosts)
}

console.log('search state is here:',search)
console.log('searched posts are here:',searchedPosts)

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <div className="app-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Chall</Navbar.Brand>
              <Navbar.Brand >{user.username}</Navbar.Brand>
              <div className="search-bar">
            <input className="inputBox" type="text" placeholder="Search" onChange={handleSearchChange}></input>
            <button onClick={handleSearch}>
              Search
            </button>
              </div>    
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
          <Route path="/home" element={<HomeContainer setProfileFeed={setProfileFeed} setSelectedChallenge={setSelectedChallenge} setFeed={setFeed} feed={feed} />} />
          <Route path="/challenge" element={<ChallengePage handlePost={handlePost} newPost={newPost} setNewPost={setNewPost} newChall={newChall} setNewChall={setNewChall} />} />
          <Route path="/challenges/:id/post/:name" element={<PostPage newPost={newPost} />} />
          <Route path="/challenges/:id/contribute-post/:id" element={<PostPopularChallenge handlePost={handlePost} selectedChallenge={selectedChallenge} feed={feed} setNewChall={setNewChall} newChall={newChall} newPost={newPost} setNewPost={setNewPost} />} />
          <Route path="/users/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
