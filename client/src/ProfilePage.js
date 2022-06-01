import React, { useContext } from "react";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { UserContext } from "./context/user"

function ProfilePage({ video, caption, category, user }) {


    // const [user] = useContext(UserContext)
    return (


        <>

            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Card border="primary" style={{ marginBottom: "30px" }}>
                        <Card.Header >
                            <div className="profile-pic">
                                <img src={user.profile_pic} alt=''></img>
                            </div>
                            {user.username}</Card.Header>
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
                                <Button variant="primary" style={{ marginLeft: "5px" }}>Perform this challenge</Button>
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
        </>
    )
}

export default ProfilePage;