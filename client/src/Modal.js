import React from "react";
import './Home.css';
import ChallengeBrief from "./ChallengeBrief";


function Modal({ onClose, challengeName, challengeDescription, video, comments }) {
    return (
        <div className="modal-container" onClick={onClose}>
            {/* <button onClick={onClose}>X</button> */}
            <div className='the-modal-content' onClick={(e) => {
                e.stopPropagation();
            }}>
                <ChallengeBrief challengeDescription={challengeDescription} challengeName={challengeName} video={video} />
                <div className="modal-comments">
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