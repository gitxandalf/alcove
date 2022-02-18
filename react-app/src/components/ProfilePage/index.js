import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ProfilePage.css"

function ProfilePage() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    const users = useSelector(state => state?.album?.usersEntries)


    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div className='profile-page'>

            <div className='user-data'>

                <div className='profile-page-image'>
                    <img id="profile-page-image" className='profile-page-image-icon' alt="profile-page-image" src={user.profile_image_url}></img>
                </div>

                <p className='username'>
                    {user.username}
                </p>



            </div>

            <p className='albums-div'>Albums</p>
            {/* <select
                className='select-input'
                type='dropdown'
                name='album'
                required
                onChange={updateAlbum}
                value={albumId}>
                {albumOptions.map((album, idx) => (<option key={idx} value={album?.id}>{album.name}</option>))}
            </select> */}
        </div>
    );
}
export default ProfilePage;
