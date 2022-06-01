
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/user"
import ProfilePage from "./ProfilePage";


function ProfilePageContainer() {
    const { id } = useParams();
    const [user, setUser] = useState(); // starts undefined
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(user);
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



            <h1>{user?.name}</h1>
            <h2>Followers: {user?.followers_count}</h2>
            <h2>Following: {user?.followers_count}</h2>
            <Button onClick={handleFollowClick}>Follow</Button>
            {user?.posts.map(post =>
                <ProfilePage
                    key={post.id}
                    caption={post.caption}
                    category={post.category}
                    video={post.video}
                    user={user} />
            )}
        </>
    )
}

export default ProfilePageContainer;

