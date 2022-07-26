import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import { useParams } from "react-router-dom"
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


function PostPopularChallenge({ handlePost, challengeData, selectedChallenge, newChall, newPost, setNewChall, setNewPost }) {


  const [originalChallenge, setOriginalChallenge] = useState([]);
  const { id } = useParams();
  const [videoURL, setVideoURL] = useState('')
  const [displayClickedChallenge, setDisplayClickedChallenge] = useState([])

  // console.log('Selected challenge', selectedChallenge)
  // console.log('Challenge I clicked perform challenge on', originalChallenge)


  useEffect(() => {
    // console.log(`/challenges/${selectedChallenge}`)
    fetch(`/challenges/${selectedChallenge}`)
      .then(res => res.json())
      .then(data => setOriginalChallenge(data))
      .catch(error => console.log(error.message));
  }, [])

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then(res => res.json())
      .then(data => setDisplayClickedChallenge(data))
      // .then(console.log(displayClickedChallenge))
      .catch(error => console.log(error.message));
  }, [])


  function handleChange(e) {
    setNewChall({ ...newChall, [e.target.name]: e.target.value })
    setNewPost({ ...newPost, [e.target.name]: e.target.value })

  }

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




  return (
    <>


      <div className="profile-pic">
        <h1>Origin of Challenge</h1>
        <img src={originalChallenge.user.profile_pic} alt=''></img>
      </div>
      <p>This Challenge was created by: {originalChallenge.user.username}</p>

      <video className="video-class" src={originalChallenge.video} controls></video>
      {originalChallenge.category}

      {originalChallenge.caption}

      Leave a Comment

      <div className="profile-pic">
        <h1>Selected Challenge</h1>
        {/* <img src={originalChallenge.user.profile_pic} alt=''></img> */}
      </div>
      <p>This Challenge was created by: {originalChallenge.user.username}</p>

      <video className="video-class" src={displayClickedChallenge.video} controls></video>
      {displayClickedChallenge.category}

      {displayClickedChallenge.caption}
      Leave a Comment

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
      {/* `
      <form  >
        <textarea name="challenge_description" placeholder="Post to your friends.."></textarea>
        <button>POST</button>
      </form> */}

    </>
  )
}

export default PostPopularChallenge;