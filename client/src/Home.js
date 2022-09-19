import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/user"
import { useNavigate } from "react-router-dom";
import './Home.css'
import { Avatar } from '@mui/material';
import ChallengeBrief from './ChallengeBrief';
import MyModal from './MyModal'
import sendpng from '../src/assets/images/send.png'


function Home({ challengeDescription, challengeName, postID, caption, category, video, challengeID, userID, setSelectedChallenge }) {



  let navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  const [postedUser, setPostedUser] = useState({
    profile_pic: '',
    username: ''
  })
  const [newComment, setNewComment] = useState([])
  const [comments, setComments] = useState();
  const [likes, setLikes] = useState();
  const [liked, setLiked] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const liked = user.likes.find(eachLike => eachLike.post_id === postID)
    if (liked) {
      setLiked(true)
    }
  }, [user.id])

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
    setLiked(!liked)
    console.log(user.likes)
    if (!liked) {
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
        .then(newLike => {
          setUser({ ...user, likes: [...user.likes, newLike] })
          // console.log(data);
          fetchLikes(); // re-fetch likes
        })
        .catch(error => console.log(error.message))
    }
    else {

      const userLikeForThisPost = user.likes.find(eachLike => eachLike.post_id === postID)
      if (userLikeForThisPost) {
        fetch(`/likes/${userLikeForThisPost.id}`, {
          method: "DELETE"
        })
          .then(() => {
            const filteredLikes = user.likes.filter(eachLike => eachLike.id !== userLikeForThisPost.id)
            setUser({ ...user, likes: filteredLikes })
            fetchLikes();
          })
          .catch(error => console.log(error.message));
      }
    }
  }

  function handleViewComments() {
    setModal(true)
  }



  return (
    <>
      <div className="post">

        <div className="post-header">
          <Avatar
            onClick={handleGoToProfile}
            className="post-avatar"
            alt={postedUser.username}
            src={postedUser.profile_pic} />
          <div onClick={handleGoToProfile} className='the-user-name'>{postedUser.username}</div>
        </div>
        <ChallengeBrief video={video} challengeName={challengeName} challengeDescription={challengeDescription} >
          {/* this is syntax for creating children  */}
          <div className="see-profile">
            <div className="width-btn">
              <button className="btn btn-white" onClick={handleGoToProfile}>See User Profile</button>
            </div>
            <div className="width-btn">
              <button className="btn btn-white" onClick={handleChallenge} >Perform this challenge</button>
            </div>
          </div>
        </ChallengeBrief >









        <div className="heart-and-likes">
          <strong className='likes' >{likes?.length} likes</strong>
          <button className={`like-bttn ${liked ? `is-liked` : ``}`} onClick={handleLike}>♥</button>
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
        <i className='view-comments-btn' onClick={handleViewComments}>View {comments?.length} Comments</i>
        <div className='comment-and-foto'>
          <input
            className="add-a-comment"
            type='text'
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} />
          <img onClick={handleComment} className='send-img' src={sendpng} alt='send-im' width={40} height={40} />
        </div>


        {/* <button
            className="comment-button"
            type="submit"
            onClick={handleComment}
          >Comment
          </button> */}

      </div>
      <div>
        {modal && <MyModal caption={caption} profilePic={postedUser.profile_pic} comments={comments} challengeName={challengeName} challengeDescription={challengeDescription} video={video} onClose={() => setModal(false)} />}
      </div>





      {/* {modal ?
        <div onClose={() => {
          setModal(false)
        }} className="modal-container">
          <ChallengeBrief challengeName={challengeName} challengeDescription={challengeDescription} video={video}
          />
          <Modal />
        </div>
        :
        null} */}


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