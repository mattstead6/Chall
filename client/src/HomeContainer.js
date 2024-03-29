import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/user"
import { useNavigate } from "react-router-dom";
import Home from "./Home";
// import './HomeContainer.css'
import { Container } from "react-bootstrap";

function HomeContainer({ feed, setSelectedChallenge, setProfileFeed }) {

    const [user] = useContext(UserContext)

    return (
        <Container className="app-posts">
            {feed.map((post) => <Home challengeDescription={post.challenge.challenge_description} challengeName={post.challenge.challenge_name} comments={post.comments} postID={post.id} setProfileFeed={setProfileFeed} setSelectedChallenge={setSelectedChallenge} key={post.id} caption={post.caption} category={post.category} video={post.video} challengeID={post.challenge_id} userID={post.user_id} />)}
        </Container>
    )
}

export default HomeContainer; 