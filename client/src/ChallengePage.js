import Axios from "axios";
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import PostPage from "./PostPage";
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from "react-bootstrap/esm/Modal";
import MyModal from './MyModal'
import Alert from '@mui/material/Alert';
import './ChallengePage.css'




function ChallengePage({ newPost, setNewPost, handlePost, setNewChall, newChall, mode }) {

  let navigate = useNavigate()

  const [user] = useContext(UserContext)
  const [thoseFollowings, setThoseFollowings] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedNoms, setSelectedNoms] = useState('');
  const [videoURL, setVideoURL] = useState("")
  const [counter, setCounter] = useState(100)
  const [challengeName, setChallengeName] = useState('')
  const [modal, setModal] = useState(false)


  function showWidget() {

    let widget = window.cloudinary.createUploadWidget({
      multiple: false,
      cloudName: `dgx9mftel`,
      uploadPreset: `p1rynzxt`
    },

      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result)
          if (result.info.resource_type === "video") {
            console.log(result)
            setVideoURL(result.info.secure_url)
            if (mode !== 'contribute') {
              setNewChall({ ...newChall, video: result.info.secure_url })
            }
            setNewPost({ ...newPost, video: result.info.secure_url })
          }
          else {
            return alert('Please select a video')
          }
        }
      });
    widget.open()
  }

  function handleTextChange(e) {

    setCounter(100 - e.target.value.length)
    setNewChall({ ...newChall, [e.target.name]: e.target.value })
    setNewPost({ ...newPost, [e.target.name]: e.target.value })

  }

  function handleChange(e) {

    if (mode !== 'contribute') {
      setNewChall({ ...newChall, [e.target.name]: e.target.value })
    }
    setNewPost({ ...newPost, [e.target.name]: e.target.value })

  }

  function handleChallengeNameChange(e) {
    setChallengeName(e.target.value)
    setNewChall({ ...newChall, [e.target.name]: e.target.value })
    setNewPost({ ...newPost, [e.target.name]: e.target.value })

  }


  function handleFindFriends() {
    fetch(`/users/${user.id}`)
      .then(res => res.json())
      .then(data => setThoseFollowings(data.followings))
      .then(() => handleShow())
    // .catch(error => console.log(error.message));
  }



  // console.log(newChall)





  // function handleSubmit(e) {
  //   console.log(newChallenge)
  //   e.preventDefault()
  //   fetch(`/challenges`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(
  //       newChallenge)
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         res.json().then(newChallenge => {
  //           console.log(newChallenge)
  //           // setUser(newUser)
  //           // setErrors(null)
  //           navigate(`/challenges/${newChallenge.id}/post`)

  //         })
  //       } else {
  //         res.json().then(response => {
  //           //  setErrors(response.errors)
  //           console.log(response.error)

  //         })
  //       }
  //     }
  //     )
  //     .catch(error => console.log(error.message));

  // }



  // useEffect( () => {
  // Axios.get('url', {    

  //   params: {
  //   limit: 20, offset: 0
  // }})
  // },[])

  function handleNominateUser(friend) {
    setSelectedNoms(friend.username)
    // alert('nice work dude')
    // < Alert severity = "success" > This is a success alert — check it out!</Alert >
  }

  const mappedFollowings = thoseFollowings.map((friend) => {
    return (
      <p id={friend.id}>
        <Avatar src={friend.profile_pic} alt='profile-picture' />

        {friend.username}
        <button onClick={() => handleNominateUser(friend)}>Nominate</button>

      </p>)


  })
  console.log("post", newPost)

  // function openPreview() {

  //   <MyModal caption={newPost.caption} profilePic={user?.profile_pic} challengeName={newPost.challenge_name} challengeDescription={newPost.challenge_description} video={newPost.video} onClose={() => setModal(false)} />

  // }


  //   const maxLength = 100;




  // $('textarea').keyup(function() {
  //   var length = $(this).val().length;
  //   var length = maxLength-length;
  //   $('#chars').text(length);
  // });


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a friend to challenge</Modal.Title>
        </Modal.Header>

        <Modal.Body><p>{mappedFollowings}</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='challenge-container'>
        {mode !== 'contribute' && <div className="label-form">
          <p3 className='p3element' style={{ color: "white", fontSize: "16px" }}>Start A Challenge Trend</p3>
        </div>}

        {mode !== 'contribute' && <input className='chall-name-area' type='text' placeholder='Challenge Name' name="challenge_name" onChange={handleChallengeNameChange}></input>}

        {challengeName && <p style={{ color: "white", textAlign: "center" }}>{challengeName} Chall</p>}

        <div className="challenge-content">
          <div className="label-form">
            <button style={{ margin: 'auto' }} onClick={showWidget}>Upload Video</button>
          </div>
        </div>

        <div >
          {videoURL && <video className='about-to-post-video' src={videoURL} controls></video>}
        </div>

        {mode !== 'contribute' && <div className="label-form">
          <textarea maxLength={100} className='descrip-of-chall' name="challenge_description" onChange={handleTextChange} placeholder="Description of Challenge"></textarea>
          <p style={{ color: 'white' }}>{counter} characters remaining</p>
        </div>}

        {mode !== 'contribute' && <div className="label-form">
          <select name="category" onChange={handleChange}>
            <option>Select Category</option>
            <option>Entertainment</option>
            <option>Sports</option>
            <option >Music</option>
            <option >Charity</option>
          </select>
        </div>}
        <div className="labelss">
          <button className='nom-friend' onClick={handleFindFriends} color="secondary">Nominate Friends</button>
        </div>
        <div className='nominated-user'>
          {selectedNoms !== '' ? <p>You Selected {selectedNoms}</p> : null}
          {/* {selectedNoms.map((friend) => {
            <p>You selected {friend}</p>
          })} */}

        </div>
        <div className="label-form">
          <textarea name="caption" onChange={handleChange} placeholder="Post to your friends.."></textarea>
        </div>
        <div style={{ display: "flex" }}>
          <button className="bttn" onClick={() => setModal(true)}>Preview</button>
          {modal && <MyModal caption={newPost.caption} profilePic={user?.profile_pic} challengeName={newPost.challenge_name} challengeDescription={newPost.challenge_description} video={newPost.video} onClose={() => setModal(false)} />}
          <button className="bttn" onClick={handlePost}>Post</button>
        </div>
      </div>
    </>
  )
}
export default ChallengePage;
