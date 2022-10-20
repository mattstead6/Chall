// // REVISIT THIS SECTION
// // REVISIT THIS SECTION
// // REVISIT THIS SECTION
// // REVISIT THIS SECTION



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"
// import Card from "react-bootstrap/esm/Card";
// import Button from "react-bootstrap/esm/Button";
// import ListGroup from "react-bootstrap/esm/ListGroup";
// import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
// import Row from "react-bootstrap/esm/Row";
// import Col from "react-bootstrap/esm/Col";




// function PostPage({newChallenge}) {
//     const [challenge, setChallenge] = useState(); // start undefined
//     const { id } = useParams();


//     const [postData, setPostData] = useState({
//         video: newChallenge.video,
//         challenge_description: newChallenge.challenge_description,
//         category: newChallenge.category,
//         caption: '',
//         challenge_name: newChallenge.challenge_name,
//         challenge_id: newChallenge.id,
//         user_id: newChallenge.user_id
//     })


//     useEffect(() => {
//         const fetchChallenge = async () => {
//             const resp = await fetch(`/challenges/${newChallenge.id}/post`);
//             const respJSON = await resp.json();
//             setChallenge(respJSON);
//         }
//         fetchChallenge();
//     }, [])


//     function handleChangePostData(e) {
//         setPostData({
//             ...postData,
//             [e.target.name]: e.target.value
//         })

//     }

//     function handlePost() {
    
//         fetch(`/post`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json"
//             },
//             body: JSON.stringify({

//             })
//         })
//             .then(res => res.json())
//             .then(data => console.log(data))
//             .catch(error => console.log(error.message));
//     }

//     return (
// <>
//         <Row>
//         <Col></Col>
//         <Col xs={6}>
//         <Card border="primary" style={{marginBottom: "30px"}}>
//       <Card.Body>
//       <video className="video-class" src={newChallenge.video} controls></video>
//         <Card.Title>{newChallenge.category}</Card.Title>
//         <Card.Text>
//           {newChallenge.challenge_description}
//         </Card.Text>
       
//       </Card.Body>
    
//     </Card >
    
//         </Col>
//         <Col></Col>
           
//      </Row>       
//             <form onSubmit={handlePost} >
//                 <textarea name="caption" onChange={handleChangePostData} placeholder="Post to your friends.."></textarea>
//                 <button>POST</button>
//             </form>
 
//         </>
//     )
// }

// export default PostPage;