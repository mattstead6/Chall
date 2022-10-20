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
import { style } from "@mui/system";




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
  const [isSelected, setIsSelected] = useState(false)


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

  function handleNominateUser(friend) {
    setSelectedNoms(friend.username)
    setIsSelected(true)
  }

  const mappedFollowings = thoseFollowings.map((friend) => {
    return (

      <div className="user-to-chall-container">
        <div>
          <Avatar src={friend.profile_pic} alt='profile-picture' />
        </div>
        <p className="friend-nom">
          {friend.username}
        </p>
        <div>
          <button className="nominate" onClick={() => handleNominateUser(friend)}>Nominate</button>
        </div>
      </div>)

  })

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a friend to challenge</Modal.Title>
        </Modal.Header>

        <Modal.Body>{mappedFollowings}</Modal.Body>
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

        {challengeName && <p className="p3element" style={{ marginTop: "10px", color: "white", textAlign: "center" }}>{challengeName} Chall</p>}

        <div className="challenge-content">
          <div className="label-form">
            <button className="nominate" style={{ margin: 'auto' }} onClick={showWidget}>Upload Video</button>
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
        <button style={{marginLeft: "28px"}} className='nominate' onClick={handleFindFriends} color="secondary">Nominate Friend</button>
        <div className='nominated-user'>
          {selectedNoms !== '' ? <p className="p3element">You Selected {selectedNoms}</p> : null}
        </div>
        <div className="label-form">
          <textarea name="caption" onChange={handleChange} placeholder="Post to your friends.."></textarea>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 39px"}}>
          <button style={{width: "30%"}} className="nominate" onClick={() => setModal(true)}>Preview</button>
          {modal && <MyModal caption={newPost.caption} profilePic={user?.profile_pic} challengeName={newPost.challenge_name} challengeDescription={newPost.challenge_description} video={newPost.video} onClose={() => setModal(false)} />}
          <button style={{width: "30%"}} className="nominate" onClick={(e) => {
            e.preventDefault()
            let errorString = ''
            let nameFilledOut = newPost.challenge_name !== ''
            let descriptionFilledOut = newPost.challenge_description !== ''
            if (!nameFilledOut) {
              errorString += 'Fill out Challenge Name'
            }
            if (!descriptionFilledOut) {
              errorString += '\nFill out Description of Chall'
            }
            if (errorString === '') {
              handlePost()
            } else {
              alert(errorString)
            }
          }}>Post</button>
        </div>
      </div>
    </>
  )
}
export default ChallengePage;
