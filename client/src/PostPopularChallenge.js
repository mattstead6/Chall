import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


function PostPopularChallenge({challengeData, selectedChallenge}) {

    const [originalChallenge, setOriginalChallenge] = useState([]);

    console.log('Selected challenge', selectedChallenge)
    console.log('Challenge I clicked perform challenge on', originalChallenge)


    useEffect( () => {
        console.log(`/challenges/${selectedChallenge}`)
        fetch(`/challenges/${selectedChallenge}`)
        .then( res => res.json())
        .then( data => setOriginalChallenge(data))
        .catch( error => console.log(error.message));
    },[])
    

    // function showWidget() {

    //     let widget = window.cloudinary.createUploadWidget({
    //       multiple: false,
    //       cloudName: `dgx9mftel`,
    //       uploadPreset: `p1rynzxt`
    //     },
    
    //       (error, result) => {
    //         if (!error && result && result.event === "success") {
    //           console.log(result)
    //           if (result.info.resource_type === "video") {
    //             console.log(result)
    //             setVideoURL(result.info.secure_url)
    //             setChallengeData({...challengeData, video: result.info.secure_url})
    //           }
    //           else {
    //             return alert('Please select a video')
    //           }
    //         }
    //       });
    //     widget.open()
    //   }

    return (
<>

<Row>
    <Col></Col>
    <Col xs={6}>
    <Card border="primary" style={{marginBottom: "30px"}}>
  <Card.Header >
      <div className="profile-pic">
      <h1>Origin of Challenge</h1>
  {/* <img src={originalChallenge.user.profile_pic} alt=''></img> */}
  </div>
  <p>This Challenge was created by: {originalChallenge.user.username}</p>
  </Card.Header>

  <Card.Body>
  <video className="video-class" src={originalChallenge.video} controls></video>
    <Card.Title>{originalChallenge.category}</Card.Title>
    <Card.Text>
      {originalChallenge.caption}
    </Card.Text>
    <Card.Link href="#">
    <Button variant="primary">Leave a Comment</Button>
    </Card.Link>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
</Card >

    </Col>
    <Col></Col>
       
 </Row>
        
  


     
        <form  >
            <textarea name="challenge_description" placeholder="Post to your friends.."></textarea>
            <button>POST</button>
        </form>

    </>
    )
}

export default PostPopularChallenge;