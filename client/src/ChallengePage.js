import Axios from "axios";
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import PostPage from "./PostPage";


function ChallengePage({newChallenge, newPost,setNewPost, handlePost, setNewChall, newChall}) {

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
            setNewChall({...newChall, video: result.info.secure_url})
            setNewPost({...newPost, video: result.info.secure_url})
          }
          else {
            return alert('Please select a video')
          }
        }
      });
    widget.open()
  }

  function handleChange(e) {
    setNewChall({...newChall, [e.target.name]: e.target.value})
    setNewPost({...newPost, [e.target.name]: e.target.value})

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
        <div>
        <p3>Be the first person to begin a challenge trend! Upload a video, select a category and press Go To Post</p3>
        </div>
        <div>
        <button onClick={showWidget}>Upload Video</button>
      </div>
      {videoURL && <video src={videoURL} controls></video>}
      <textarea name="challenge_description" onChange={handleChange} placeholder="Description of Challenge"></textarea>
      <div>
      <label> Challenge Name:  
    <input name="challenge_name" onChange={handleChange} placeholder=""></input>
      </label>
      </div>
      <select name="category" onChange={handleChange}>
        <option>Select Category</option>
        <option>Entertainment</option>
        <option>Sports</option>
        <option >Music</option>
        <option >Charity</option>
      </select>
      <div>
      <textarea name="caption" onChange={handleChange} placeholder="Post to your friends.."></textarea>
      <button onClick={handlePost}>Post</button>
      </div>    
      </>
  )
}
export default ChallengePage;
