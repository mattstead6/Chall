import React from "react";
import './Home.css';
import ChallengeBrief from "./ChallengeBrief";
import { Avatar } from "@mui/material";
import sendpng from '../src/assets/images/send.png'


function MyModal({ onClose, challengeName, challengeDescription, video, comments, profilePic, caption, setNewComment, handleComment, newComment }) {
    return (
        <div className="modal-container" onClick={onClose}>
            <button onClick={onClose}>X</button>
            <div className='the-modal-content' onClick={(e) => {
                e.stopPropagation();
            }}>
                <ChallengeBrief challengeDescription={challengeDescription} challengeName={challengeName} video={video} />
                <div className="modal-comments">
                    <div className="modal-comments-content">
                    <Avatar
                        className="post-avatar"
                        alt='profile-pic'
                        src={profilePic} />
                    <p>{caption}</p>
                    </div>
                    {comments?.map((comment) => (
                        <div className="comments-container-for-each-comment-after-clicking-view-more-comments">
                        <Avatar
                        className="post-avatar"
                        id='more-avatar'
                        alt='profile-pic'
                        src={comment.user.profile_pic} />
                        <p className="actual-comment-content-area-after-pressing-view-comments">
                            <strong>{comment.user.username}</strong> {comment.actual_comment}
                        </p>
                        </div>
                    ))}
                   <div className='comment-and-foto'>
          <input
            className="add-a-comment"
            type='text'
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
             />
          <img onClick={handleComment} className='send-img' src={sendpng} alt='send-im' width={40} height={40} />
        </div>
                </div>
            </div>
        </div>
    )
}

export default MyModal;