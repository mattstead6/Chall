import React from "react";
import './Home.css';
import ChallengeBrief from "./ChallengeBrief";
import { Avatar } from "@mui/material";


function MyModal({ onClose, challengeName, challengeDescription, video, comments, profilePic, caption }) {
    return (
        <div className="modal-container" onClick={onClose}>
            {/* <button onClick={onClose}>X</button> */}
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
                   
                </div>
            </div>
        </div>
    )
}

export default MyModal;