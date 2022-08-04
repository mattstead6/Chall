
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





    return (
        <>




            <div className="profile-container" >

                <h1>
                    <Avatar
                        alt='profile-pic'
                        src={user?.profile_pic}
                        className='profile-pic-on-profile-page' />
                    {user?.name}</h1>
            </div>

            <div className='follow-container'>
                <h4 className="follow-stuff">followers: {user?.followers_count}</h4>
                <div className='bio-profile-page'>
                    <h4>Bio</h4>
                    <p>Hey my name is asdfjashdfjoasd fashdfasdf asdf asdf</p>
                </div>
                <h4 className="follow-stuff">following: {user?.following_count}</h4>
                {/* <div className='bio-profile-page'>
                        <h4>Bio</h4>
                    </div> */}


            </div>



            <div>
                {loggedInUser?.id === user?.id ? <h4 style={{ color: "white" }}>Your Posts</h4> :
                    <>
                        <button className='follow-bttn' onClick={handleFollowClick}>Follow</button>
                        <h4>Posts</h4>
                    </>
                }
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

