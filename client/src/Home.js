import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/user"
import { useNavigate } from "react-router-dom";
import './Home.css'
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function Home({caption, category, video, challengeID, userID, setSelectedChallenge}) {

//    console.log()

    let navigate = useNavigate()
    const [user] = useContext(UserContext)
    const [postedUser, setPostedUser] = useState({
        profile_pic: '',
        username:''
    })

    // console.log(challengeData)
    console.log(postedUser)

    useEffect( () => {
        fetch(`/users/${userID}`)
        .then( res => res.json())
        .then( data => setPostedUser({...postedUser, profile_pic: data.profile_pic, username: data.username}));
    },[])

    const handleChallenge =() =>{
        setSelectedChallenge(challengeID)
        navigate(`/challenges/${challengeID}/contribute-post`)
    }

    return (
        <>
        <Row>
    <Col></Col>
    <Col xs={6}>
    <Card border="primary" style={{marginBottom: "30px"}}>
  <Card.Header >
      <div className="profile-pic">
  <img src={postedUser.profile_pic} alt=''></img>
  </div>
  {postedUser.username}</Card.Header>

  <Card.Body>
  <video className="video-class" src={video} controls></video>
    <Card.Title>{category}</Card.Title>
    <Card.Text>
      {caption}
    </Card.Text>
    <Card.Link href="#">
    <Button variant="primary">Leave a Comment</Button>
    </Card.Link>
    <Card.Link >
    <Button onClick={handleChallenge} variant="primary" style={{marginLeft: "5px"}}>Perform this challenge</Button>
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
        {/* <div className="profile-pic">
       <img src={postedUser.profile_pic} alt=''></img>
       <p>{postedUser.username} says: </p>
       </div> */}
         
           {/* <div >
           <video className="video-class" src={video} controls></video>
           </div> */}
        </>
    )
}

export default Home; 