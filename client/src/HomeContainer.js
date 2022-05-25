import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/user"
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import './HomeContainer.css'
import { Container } from "react-bootstrap";

function HomeContainer({feed, setFeed, setSelectedChallenge}) {

    let navigate = useNavigate()
    const [user] = useContext(UserContext)

    console.log(user)

    console.log(feed)
    return (
        <>
   
            <Container>
            {feed.map((post) => <Home setSelectedChallenge={setSelectedChallenge} key={post.id} caption={post.caption} category={post.category} video={post.video} challengeID={post.challenge_id} userID={post.user_id}/>)}
            </Container>
         
        </>
    )
}

export default HomeContainer; 