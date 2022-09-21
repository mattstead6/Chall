import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import { useParams } from "react-router-dom"
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ChallengeBrief from './ChallengeBrief'
import ChallengePage from "./ChallengePage";


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

  console.log(displayClickedChallenge)

  const dc = displayClickedChallenge.challenge
  return (
    <>
    <div className='contribute-to-chall'>
  <h1 >Contribute to this Chall</h1>
  <h5>see below for origin of chall</h5>
  </div>
<ChallengePage mode='perform'>

{/* CAN YOU TAKE AWAY INSTEAD OF ADD THINGS TO CHILD COMPONENTS? */}

</ChallengePage>


      <div className="profile-pic">

        {/* <img src={originalChallenge.user.profile_pic} alt=''></img> */}
      </div>
      {/* <p>This Challenge was created by: {originalChallenge.user.username}</p> */}
      <div className='challenge-headers'>
        {/* <h1>Origin of Challenge</h1>
        <h1>Selected Challenge</h1> */}
      </div>
      <div className="previous-challenges">

        <ChallengeBrief video={originalChallenge.video} challengeName={originalChallenge.challenge_name} challengeDescription={originalChallenge.challenge_description}>
          <h2 style={{ color: "white" }}>Challenge Created By</h2>
        </ChallengeBrief>
        <ChallengeBrief video={displayClickedChallenge.video} challengeName={dc?.challenge_name} challengeDescription={dc?.challenge_description}>
          <h2 style={{ color: "white" }}>Challenge Selected</h2>
        </ChallengeBrief>
      </div>
  
      {/* {originalChallenge.category}

      {originalChallenge.caption}

      Leave a Comment */}

      <div className="profile-pic">

        {/* <img src={originalChallenge.user.profile_pic} alt=''></img> */}
      </div>
      {/* <p>This Challenge was created by: {originalChallenge.user.username}</p> */}

      {/* {displayClickedChallenge.category}

      {displayClickedChallenge.caption}
      Leave a Comment */}



    </>
  )
}

export default PostPopularChallenge;