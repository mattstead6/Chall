import React, {useEffect, useState, useContext} from "react";
import Axios from "axios";
import {UserContext} from "./context/user"
import { useNavigate } from "react-router-dom";

function Home() {

    let navigate = useNavigate()
    const [user] = useContext(UserContext)



    // useEffect( () => {

    // }, [])

console.log(user)
    return (
<>
<h1>What up</h1>
<button onClick={()=>navigate('/challenge')}>Submit a Challenge</button>
</>
    )
}

export default Home; 