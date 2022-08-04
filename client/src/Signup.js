import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import './Signup.css'
import { Form, Row, InputGroup, Button, Col } from 'react-bootstrap'
import { Formik } from 'formik';
import { Avatar } from '@mui/material';



function Signup() {

  let navigateTo = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    bio: '',
    profile_pic: '',
    name: ''
  })

  const [user, setUser] = useContext(UserContext)
  // const [errors, setErrors] = useState([])
  //console.log(formData)

  function handleFormChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function handleSignUpSubmit(e) {
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
      .then(res => {
        if (res.ok) {
          res.json().then(newUser => {
            //console.log(newUser)
            setUser(newUser)
            // setErrors(null)
            navigateTo('/home')

          })
        } else {
          res.json().then(response => {
            alert(response.errors[0])
            // alert(errors[0])

          })
        }
      }
      )
      .catch(error => console.log(error.message));
  }



  function showWidget() {

    let widget = window.cloudinary.createUploadWidget({
      multiple: false,
      cloudName: `dgx9mftel`,
      uploadPreset: `p1rynzxt`
    },

      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result)
          if (result.info.resource_type === "image") {
            console.log(result)
            console.log(result.info.secure_url)
            setFormData({ ...formData, profile_pic: result.info.secure_url })
          }
          else {
            return alert('Please select a photo')
          }
        }
      });
    widget.open()
  }

  //console.log(user)

  return (

    <>
      <div className='whole-form'>
        <form onSubmit={handleSignUpSubmit}>
          <div className='sign-up-container'>
            <div>
              <input className='sign-up' type='text' placeholder='Name' name='name' value={formData.name} onChange={handleFormChange} />
            </div>
            <div>
              <input className='sign-up' type='text' placeholder='User Name' name='username' value={formData.username} onChange={handleFormChange} />
            </div>
            <div>
              <input className='sign-up' type='text' placeholder='Password' name='password' value={formData.password} onChange={handleFormChange} />
            </div>
            <div>
              <input className='sign-up' type='text' placeholder='Confirm Password' name='confirm_password' value={formData.confirm_password} onChange={handleFormChange} />
            </div>
          </div>
          <div className="profile-pic-container">
            <button className="profile-pic-bttn" onClick={showWidget} onChange={handleFormChange} value={formData.profile_pic} name="profile_pic" >Profile Picture</button>

            {formData.profile_pic ? <> <Avatar
              className="post-avatar-pic"
              alt='profile_pic'
              src={formData.profile_pic} />
              <p className="post-avatar-pic">{formData.username}</p>
            </>
              : null}
          </div>
          <div>
            <button className='create-account-bttn' type='button' onClick={() => navigateTo('/login')}>Already have an account</button>
          </div>
          <div>
            <input className='create-account-bttn' type="submit" value="Submit" />
          </div>
          <div>
            <label>I have read and agree to the terms and conditions
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
          <a href='github.com/mattstead6'>Terms And Conditions</a>
        </form>
        {/* <h1>WELCOME TO CHALL - THE FUTURE OF SOCIAL MEDIA...</h1> */}
      </div>
    </>
  )
}

export default Signup;