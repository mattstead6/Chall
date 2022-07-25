import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/user"
import { useNavigate } from "react-router-dom";
import './Home.css'
import { Avatar } from '@mui/material';

function Home({ challengeDescription, challengeName, postID, caption, category, video, challengeID, userID, setSelectedChallenge }) {



  let navigate = useNavigate()
  const [user] = useContext(UserContext)
  const [postedUser, setPostedUser] = useState({
    profile_pic: '',
    username: ''
  })
  const [newComment, setNewComment] = useState([])
  const [comments, setComments] = useState();
  const [likes, setLikes] = useState();



  const fetchComments = () => {
    fetch(`/comments/by-post-id/${postID}`)
      .then(res => res.json())
      .then(data => setComments(data))
    //.then(console.log(comments));
  }

  const fetchLikes = () => {
    fetch(`/likes/by-post-id/${postID}`)
      .then(res => res.json())
      .then(data => setLikes(data))
    //.then(console.log(likes));
  }

  /**
   * Fetch comments for this post
   */
  useEffect(() => {
    fetchComments();
  }, []);



  /**
   * Fetch likes for this post
   */
  useEffect(() => {
    fetchLikes();
  }, []);


  useEffect(() => {
    fetch(`/show2/${userID}`)
      .then(res => res.json())
      .then(data => setPostedUser({ ...postedUser, profile_pic: data.profile_pic, username: data.username }));
  }, []);

  const handleChallenge = () => {
    setSelectedChallenge(challengeID)
    navigate(`/challenges/${challengeID}/contribute-post/${postID}`)
  }

  function handleGoToProfile() {
    navigate(`/users/${userID}`);
  }

  function handleComment(e) {
    e.preventDefault()
    fetch(`comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        actual_comment: newComment,
        user_id: user.id,
        post_id: postID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        fetchComments();
      })
      .catch(error => console.log(error.message));
  }

  function handleLike(e) {
    e.preventDefault()
    fetch(`/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        post_id: postID
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        fetchLikes(); // re-fetch likes
      })
      .catch(error => console.log(error.message));
  }



  return (
    <>
      <div className="post">

        <div className="post-header">
          <Avatar
            className="post-avatar"
            alt={postedUser.username}
            src={postedUser.profile_pic} />
          <div className='the-user-name'>{postedUser.username}</div>
        </div>
        <div className="challenge-and-description">
          <h3>
            {challengeName}
          </h3>
          <h5 className='chal-descrip'>Challenge Description</h5>
          <h2 className='chall-description'>
            {challengeDescription}
          </h2>
        </div>
        <div className="see-profile">
          <div className="width-btn">
            <button className="btn btn-white" onClick={handleGoToProfile}>See User Profile</button>
          </div>
          <div className="width-btn">
            <button className="btn btn-white" onClick={handleChallenge} >Perform this challenge</button>
          </div>
        </div>
        <div>
          <video className="post-vid" src={video} controls></video>
        </div>
        <div className='likes'>
          <strong >{likes?.length}</strong> likes
        </div>
        <div className="post-caption">

          <strong>{postedUser.username}</strong> {caption}

        </div>
        <div className="post-comments">
          {comments?.map((comment) => (
            <p>
              <strong>{comment.user.username}</strong> {comment.actual_comment}
            </p>
          ))}
        </div>

        <form className="commentbox">
          <input
            className="add-a-comment"
            type='text'
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} />
          <button onClick={handleLike}>Like

          </button>
          <button
            className="comment-button"
            type="submit"
            onClick={handleComment}
          >Comment
          </button>
        </form>
      </div>




      {/* <FontAwesomeIcon icon={['fa', 'heart']} /> */}



      {/* <ListGroup className="list-group-flush">
              {comments?.map(comment => {
                return (
                  <ListGroupItem>{comment.actual_comment}</ListGroupItem>
                )
              })}
            </ListGroup>
          </Card >

        </Col>
        <Col></Col> */}

      {/* </Row> */}

    </>
  )
}

export default Home; 