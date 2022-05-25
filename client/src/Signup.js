import React, {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import './Signup.css'
import {Form, Row, InputGroup, Button, Col} from 'react-bootstrap'
import { Formik } from 'formik';



function Signup(){

    let navigateTo = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: '',
        bio: '',
        profile_pic:'',
        name: ''
    })

    const [user, setUser] = useContext(UserContext)
    const [errors, setErrors] = useState([])
    console.log(formData)
    
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
                setFormData({...formData, profile_pic: result.info.secure_url})
              }
              else {
                return alert('Please select a photo')
              }
            }
          });
        widget.open()
      }

    return(

<>
<Formik>       
     <Form onSubmit={handleSignUpSubmit} >
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Name*</Form.Label>
              <Form.Control
              type="text" value={formData.name} name="name" onChange={handleFormChange}
              placeholder="Name"
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="2"
              controlId="validationFormik102"
              className="position-relative"
            >
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  type="text" 
                  value={formData.username} 
                  name="username" 
                  onChange={handleFormChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="6"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="text" 
                value={formData.password} 
                name="password" 
                onChange={handleFormChange}
              />

              
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik104"
              className="position-relative"
            >
                
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Confirm Password"
                value={formData.confirm_password} 
                name="confirm_password" 
                onChange={handleFormChange}
              />
            
            </Form.Group>
            </Row>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationFormik105"
              className="position-relative"
            >
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              value={formData.profile_pic} 
              name="profile_pic" 
              onChange={handleFormChange}

            />
            
          
          </Form.Group>
          <Button className="label-form" onClick={() => navigateTo('/login')}>Already have an account</Button>
          <Button  type="submit">Submit</Button>
        </Form>
    </Formik>
{/* <div className="whole-form">
<form onSubmit={handleSignUpSubmit}>
    <div className="label-form">
        <h3>Sign Up</h3>
    </div>  
    <div className="label-form">   
        <label>Name*</label>
        <input type="text" value={formData.name} name="name" onChange={handleFormChange}></input>
        </div>    
    <div className="label-form">
        <label>Username*</label>
        <input type="text" value={formData.username} name="username" onChange={handleFormChange}></input>
     </div>   
    <div className="label-form">    
        <label>Password*</label>
        <input type="text" value={formData.password} name="password" onChange={handleFormChange}></input>
    </div>   
    <div className="label-form">
        <label>Confirm Password*</label>
        <input type="text" value={formData.confirm_password} name="confirm_password" onChange={handleFormChange}></input>
    </div>    
        <div className="label-form">   
        <textarea value={formData.bio} name="bio" onChange={handleFormChange} placeholder="Bio"></textarea>
        </div>  
        <div className="label-form">   
        <button type="button" value={formData.profile_pic} name="profile_pic" onChange={handleFormChange} onClick={showWidget}>Upload Profile Picture</button>
        </div>  
        <button className="label-form" onClick={() => navigateTo('/login')}>Already have an account</button>
        <button className="label-form" >Submit</button> 
    </form>
    </div> */}

</>
    )
}

export default Signup;