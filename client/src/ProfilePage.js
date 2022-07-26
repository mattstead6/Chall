import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/user"
import './ProfilePage.css'
// import './Home.css'




function ProfilePage({ video, caption, category, user, challengeName, challengeDescription, postID }) {


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

  // console.log(comments.length)


  return (


    <>
      <div className="post">
        <div className='post-header'>
          <div className="challenge-and-description">
            <h3>
              {challengeName}
            </h3>
            <h2 className='chall-description'>
              {challengeDescription}
            </h2>
            <h4>
              {category}
            </h4>
          </div>
        </div>
        <video className="post-vid" src={video} controls></video>
        <h3>
          {caption}
        </h3>

      </div>

      <div className='likes'>
        <strong >{likes?.length}</strong> likes
      </div>
      <div className="post-caption">
        <strong>{user.username}</strong> {caption}
      </div>
      <div>

      </div>
      <div className="post-comments">
        {/* <p>View all {comments.length}</p> */}
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
    </>
  )
}

export default ProfilePage;