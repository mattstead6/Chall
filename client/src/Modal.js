import React from "react";
import './Home.css';
import ChallengeBrief from "./ChallengeBrief";
import { Avatar } from "@mui/material";


function Modal({ onClose, challengeName, challengeDescription, video, comments, profilePic, caption }) {
    return (
        <div className="modal-container" onClick={onClose}>
            {/* <button onClick={onClose}>X</button> */}
            <div className='the-modal-content' onClick={(e) => {
                e.stopPropagation();
            }}>
                <ChallengeBrief challengeDescription={challengeDescription} challengeName={challengeName} video={video} />
                <div className="modal-comments">
                    <Avatar
                        className="post-avatar"
                        alt='profile-pic'
                        src={profilePic} />
                    <p>{caption}</p>
                    {comments?.map((comment) => (
                        <p>
                            <strong>{comment.user.username}</strong> {comment.actual_comment}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal;