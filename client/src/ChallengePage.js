import Axios from "axios";
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import PostPage from "./PostPage";
import './ChallengePage.css'


function ChallengePage({ newChallenge, newPost, setNewPost, handlePost, setNewChall, newChall }) {

  let navigate = useNavigate()

  const [user] = useContext(UserContext)

  const [videoURL, setVideoURL] = useState("")
  // const [newChallenge, setnewChallenge] = useState({
  //   video: '',
  //   challenge_description: '',
  //   category: '',
  //   challenge_name: ''
  // })

  // console.log(newChallenge)
  // console.log(user)

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
            setNewChall({ ...newChall, video: result.info.secure_url })
            setNewPost({ ...newPost, video: result.info.secure_url })
          }
          else {
            return alert('Please select a video')
          }
        }
      });
    widget.open()
  }

  function handleChange(e) {
    setNewChall({ ...newChall, [e.target.name]: e.target.value })
    setNewPost({ ...newPost, [e.target.name]: e.target.value })

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

  return (
    <>
      <div className='challenge-container'>
        <div className="label-form">
          <p3 className='p3element' style={{ color: "white", fontSize: "16px" }}>Start A Challenge Trend</p3>
        </div>
        <div>
          <input type='text' placeholder='Challenge Name' name="challenge_name" onChange={handleChange}></input>
        </div>
        <div className="label-form">
          <button onClick={showWidget}>Upload Video</button>
        </div>
        <div >
          {videoURL && <video className='about-to-post-video' src={videoURL} controls></video>}
        </div>

        <div className="label-form">
          <textarea name="challenge_description" onChange={handleChange} placeholder="Description of Challenge"></textarea>
        </div>

        <div className="label-form">
          <select name="category" onChange={handleChange}>
            <option>Select Category</option>
            <option>Entertainment</option>
            <option>Sports</option>
            <option >Music</option>
            <option >Charity</option>
          </select>
        </div>
        <div className="label-form">
          <textarea name="caption" onChange={handleChange} placeholder="Post to your friends.."></textarea>
        </div>
        <div >
          <button className="bttn" onClick={handlePost}>Post</button>
        </div>
      </div>
    </>
  )
}
export default ChallengePage;
