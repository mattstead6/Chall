import React, {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";


function Signup(){

    let navigateTo = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: ''
    })

    const [user, setUser] = useContext(UserContext)
    const [errors, setErrors] = useState([])
    // console.log(user)
    
    function handleFormChange(event){
    setFormData({
        ...formData, 
        [event.target.name] : event.target.value
    })
    }

    function handleSignUpSubmit(e){
        e.preventDefault()
        fetch(`/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(
                formData)
        })
        .then( res => 
            {
            if(res.ok) {
                res.json().then(newUser => {
                    console.log(newUser)
                    setUser(newUser)
                    setErrors(null)
                    navigateTo('/home')
        
                })
            } else {
                res.json().then(response => {
                     setErrors(response.errors)
                     alert(errors[0])
                    
                })
            }
        }
        )
        .catch( error => console.log(error.message));
    }

    return(
<>
<form onSubmit={handleSignUpSubmit}>
        <h3>Sign Up</h3>
        <label>Username</label>
        <input type="text" value={formData.username} name="username" onChange={handleFormChange}></input>
        <label>Password</label>
        <input type="text" value={formData.password} name="password" onChange={handleFormChange}></input>
        <label>Confirm Password</label>
        <input type="text" value={formData.confirm_password} name="confirm_password" onChange={handleFormChange}></input>
        <button>Submit</button>
    </form>
    <button onClick={() => navigateTo('/login')}>Already have an account</button>

</>
    )
}

export default Signup;