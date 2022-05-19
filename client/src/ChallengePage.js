import Axios from "axios";
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from "./context/user";


function ChallengePage () {

    const [user] = useContext(UserContext)
    const [videoURL, setVideoURL] = useState("")
    const [formData, setFormData] = useState({
      video: '',
      challenge_description:''
  })

    
    function showWidget(){

        let widget = window.cloudinary.createUploadWidget({ 
           multiple: false,
           cloudName: `dgx9mftel`,
           uploadPreset: `p1rynzxt`}, 
           
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log(result)
              if(result.info.resource_type === "video"){
                console.log(result)
                setVideoURL(result.info.secure_url)
              } 
              else {
                return alert('Please select a video')
              }
        }});
        widget.open()
      }

      function handleDescriptionChange(e) {
        setFormData({video: videoURL, challenge_description: e.target.value})
        }
        console.log(formData)

      function handleSubmit(e){
        console.log(formData)
          e.preventDefault()
          fetch(`/challenges`, {
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
                      // setUser(newUser)
                      // setErrors(null)
                      // navigate('/home')
          
                  })
              } else {
                  res.json().then(response => {
                      //  setErrors(response.errors)
                       console.log(response.errors)
                      
                  })
              }
          }
          )
          .catch( error => console.log(error.message));
      
      }



      // useEffect( () => {
      // Axios.get('url', { 
        
      //   params: {
      //   limit: 20, offset: 0
      // }})
      // },[])

        return (
          <>
          <div>
               <button onClick={showWidget}>Upload Video</button>
          </div>
               { videoURL && <video src={videoURL} controls></video>}
               <textarea onChange={handleDescriptionChange} placeholder="Description of Challenge"></textarea>
               <button onClick={handleSubmit}>Submit</button>
          </>
        );
    
    }
    export default ChallengePage;
