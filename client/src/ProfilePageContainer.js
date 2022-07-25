
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user"
import ProfilePage from "./ProfilePage";
import './ProfilePageContainer.css'
import { Avatar } from '@mui/material';


function ProfilePageContainer() {
    const { id } = useParams();
    const [user, setUser] = useState(); // starts undefined
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)



    // console.log('user:', user);
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
                <Avatar
                    alt='profile-pic'
                    src={user?.profile_pic} />
                <h1 className="user-name" >{user?.name}</h1>

                <div >
                    <h4 className="follow-stuff">Followers: {user?.followers_count}</h4>
                    <h4 className="follow-stuff">Following: {user?.followers_count}</h4>
                </div>
                <button onClick={handleFollowClick}>Follow</button>
            </div>
            {console.log('user is:', user)}
            {user?.posts.map(post =>
                <ProfilePage
                    key={post.challenge_id}
                    caption={post.caption}
                    category={post.category}
                    video={post.video}
                    user={user}
                    challengeName={post.challenge.challenge_name}
                    challengeDescription={post.challenge.challenge_description}
                    postID ={post.id}
                />

            )}
        </>
    )
}

export default ProfilePageContainer;

