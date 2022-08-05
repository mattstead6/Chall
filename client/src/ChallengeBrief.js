function ChallengeBrief({ challengeName, challengeDescription, video, children }) {
    return (


        <div className="challenge-and-description">
            <h3>
                {challengeName}
            </h3>
            <h5 className='chal-descrip'>Challenge Description</h5>
            <h2 className='chall-description'>
                {challengeDescription}
            </h2>
            {children || null}
            {/* <div> */}
            <video className="post-vid" src={video} controls></video>
            {/* </div> */}
        </div>

    )
}

export default ChallengeBrief;