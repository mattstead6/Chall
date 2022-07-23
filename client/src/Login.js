import React, {useState, useContext} from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import './Signup.css'


function Login(){

    let navigateTo = useNavigate()

    const [formData, setFormData] = useState({username: '', password:''})
    const [user, setUser] = useContext(UserContext)
    const [errors, setErrors] = useState([])

    function handleChangeForm(e){
        setFormData({...formData,
        [e.target.name] : e.target.value})
    }

    function handleLoginSubmit(e){
        e.preventDefault()
        fetch(`/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( res => {
            if (res.ok) {
                res.json().then(newUser => {
                    setUser(newUser)
                    console.log(newUser)
                    navigateTo('/home')
                })
            }
            else {
                res.json().then(res => {
        setErrors(res.error)
        alert(errors)
                })
            }
        })
        .catch( error => console.log(error.message));
    }

    return (
<>
<form onSubmit={handleLoginSubmit}>
    {/* <label >Username</label> */}
    <input type="text" value={formData.username} onChange={handleChangeForm} name="username" placeholder='Username' ></input>
    {/* <label>Password</label> */}
    <input type="text" value={formData.password} onChange={handleChangeForm} name="password" placeholder='Password'></input>
    <button className='bttn' type='button' >Log in</button>
</form>
<button className='bttn' type='button' onClick={() => navigateTo('/')}>Back to Sign Up</button>
</>
    )
}

export default Login;