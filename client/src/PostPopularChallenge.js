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


function PostPopularChallenge({ selectedChallenge, newPost, setNewPost }) {


  const [originalChallenge, setOriginalChallenge] = useState([]);
  const { id } = useParams();
  const [videoURL, setVideoURL] = useState('')
  const [displayClickedChallenge, setDisplayClickedChallenge] = useState([])

  // console.log('Selected challenge', selectedChallenge)
console.log('Challenge I clicked perform challenge on', originalChallenge)


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


  const dc = displayClickedChallenge.challenge
  console.log('new post is:',newPost)

  const submitContributingPost = async() => {
      const dataForServer = {
        caption: newPost.caption,
        video: newPost.video,
        user_id: newPost.user_id,
        challenge_name: originalChallenge.challenge_name,
        challenge_description: originalChallenge.challenge_description,
        challenge_id: originalChallenge.id,
        category: originalChallenge.category
      };
      const res = await fetch(`/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          dataForServer
        )
      })
      const data = await res.json()
      console.log('response from server:',data)
  }

  return (
    <>
      <div className='contribute-to-chall'>
        <h1 >Contribute to this Chall</h1>
        <h5>see below for origin of chall</h5>
      </div>
      <ChallengePage mode='contribute' newPost={newPost} setNewPost={setNewPost} handlePost={submitContributingPost}>

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

        <ChallengeBrief noTopSection={true} video={originalChallenge.video} challengeName={originalChallenge.challenge_name} challengeDescription={originalChallenge.challenge_description}>
          <h2 style={{ color: "white" }}>Challenge Created By</h2>
        </ChallengeBrief>
        <ChallengeBrief noTopSection={true} video={displayClickedChallenge.video} challengeName={dc?.challenge_name} challengeDescription={dc?.challenge_description}>
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