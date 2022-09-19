
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user"
import ProfilePage from "./ProfilePage";
// import './ProfilePageContainer.css'
import './HomeContainer.css'
import { Avatar } from '@mui/material';


function ProfilePageContainer() {
    const { id } = useParams();
    const [user, setUser] = useState(); // starts undefined
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const [newUsername, setNewUsername] = useState('')
    const [newBio, setNewBio] = useState('')



    // console.log('persons profile im on user-ID:', user.id);
    // console.log(`logged in persons id:`, loggedInUser.id)

    useEffect(() => {
        fetch(`/show2/${id}`)
            .then(resp => resp.json())
            .then(respJSON => setUser(respJSON))
    }, [])

    const handleFollowClick = () => {
        fetch(`/follows`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                follower_id: loggedInUser.id,
                followed_user_id: id
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error.message));
    }


if (!user) { 
    return <h1>loading...</h1>
}

const handleSubmit = () => {
console.log(newBio)
console.log(newUsername)
}



    return (
        <>




            <div className="profile-container" >
                <div className='left-side'>
                    {/* <div className='left-profile-pic-and-name'> */}

                    <Avatar
                        alt='profile-pic'
                        src={user.profile_pic}
                        className='profile-pic-on-profile-page' />
                    {!editing && <h1 style={{ textAlign: 'center' }}> {user.username} </h1>}
                    {editing && (<input onChange={(e) => {
                        setNewUsername(e.target.value)
                    }} value={newUsername}></input>)}
                    {/* </div> */}
                </div>
                <div className='right-side'>
                    <div className='follow-container'>

                        {loggedInUser?.id === user.id ? <h4 style={{ color: "white" }}>{loggedInUser?.posts.length} Posts</h4> :
                            <>
                                <button className='follow-bttn' onClick={handleFollowClick}>Follow</button>
                                {/* <h4>Posts</h4> */}
                            </>
                        }
                        <h4 className="follow-stuff">{user.followers_count} followers</h4>
                        <h4 className="follow-stuff">{user.following_count} following</h4>
                        <button className="edit-profile-bttn" onClick={()=> {
                            setEditing(true)
                            setNewBio(user.bio)
                            setNewUsername(user.username)
                        }}
                            >Edit Profile</button>
                    </div>
                    <div className='bio-profile-page'>
                        <h4>Bio</h4>
                        {!editing && <p>{user.bio}</p>}
                        {editing && (<textarea onChange={(e) => {
                            setNewBio(e.target.value)
                        }}value={newBio}></textarea>)}
                   
                    </div>
                    {editing && <button onClick={() => {
                        setEditing(false)
                        handleSubmit()
                    }}>Save</button>}

                </div>
            </div>





            {console.log('user is:', user)}

            <div className="persons-posts-on-profile">
                {user?.posts.map(post =>
                    <ProfilePage
                        key={post.challenge_id}
                        caption={post.caption}
                        category={post.category}
                        video={post.video}
                        user={user}
                        challengeName={post.challenge.challenge_name}
                        challengeDescription={post.challenge.challenge_description}
                        postID={post.id}
                    />
                )}
            </div>
        </>
    )
}

export default ProfilePageContainer;

