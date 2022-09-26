function ChallengeBrief({ challengeName, challengeDescription, video, children, noTopSection }) {

    let topSection = (<div>
        <h3>
            {challengeName}
        </h3>
        <h5 className='chal-descrip'>Challenge Description</h5>
        <h2 className='chall-description'>
            {challengeDescription}
        </h2>
    </div>)
    if(noTopSection) {
        topSection = null
    }
    return (


        <div className="challenge-and-description">
            {topSection}
            {children || null}
            <video className="post-vid" src={video} controls></video>
        </div>

    )
}

export default ChallengeBrief;