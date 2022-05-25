// import React, { useState, useEffect, useContext } from 'react'

// function Test() {

//     const [videoURL, setVideoURL] = useState()
//     const [photoURL, setPhotoURL] = useState()

//     function showWidget() {

//         let widget = window.cloudinary.createUploadWidget({
//           multiple: false,
//           cloudName: `dgx9mftel`,
//           uploadPreset: `p1rynzxt`
//         },
    
//           (error, result) => {
//             if (!error && result && result.event === "success") {
              
//               if (result.info.resource_type === "video") {
//                 setVideoURL(result.info.secure_url)
//               }
//               else if (result.info.resource_type === "photo"){
//                 setPhotoURL(result.info.secure_url)
//               }
              
//               else {
//                 return alert('Please select a photo or video')
//               }
//             }
//           });
//         widget.open()
//       }

//     return (
// <button onClick={showWidget}>Upload</button>
//     )
// }

// export default Test;