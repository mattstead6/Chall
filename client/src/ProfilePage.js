import React, { useContext } from "react";
import { UserContext } from "./context/user"
import { Avatar } from '@mui/material';
import './ProfilePage.css'
import './Home.css'




function ProfilePage({ video, caption, category, user }) {


    // const [user] = useContext(UserContext)
    return (


        <>
            <div className="post">


                <div className="post-header">
                    <Avatar
                        className="post-avatar"
                        alt={user.username}
                        src={user.profile_pic} />
                </div>



                <div className="challenge-and-description">
                    <h3>
                        {challengenamehere}
                    </h3>
                    <h2 className='chall-description'>
                        {challengedescriptionhere}
                    </h2>
                </div>
                <video className="video-class" src={video} controls></video>

            </div>

            FIX THE BELOW

            {/* <div className='likes'>
          <strong >{likes?.length}</strong> likes /////fix this!!!!
        </div>
        <div className="post-caption">

          <strong>{user.username}</strong> {caption}

        </div>

        <div className="post-comments">
          {comments?.map((comment) => (
            <p>
              <strong>{comment.user.username}</strong> {comment.actual_comment}
            </p>
          ))}
        </div> */}


            {/* <form className="commentbox">
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
      </div> */}



        </>
    )
}

export default ProfilePage;