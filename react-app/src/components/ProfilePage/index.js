import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import "./ProfilePage.css"


function ProfilePage() {

    const [user, setUser] = useState({});

    const { userId } = useParams();
    // const user = useSelector(state => state?.session?.user);

    const images = useSelector(state => state?.image?.entries)
    const users = useSelector(state => state?.album?.usersEntries)
    const albums = useSelector(state => state?.album?.entries);

    const [albumId, setAlbumId] = useState(albums?.find(album => album?.user_id === user?.id)?.id);




    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
            setAlbumId(albums?.find(album => album?.user_id === user?.id)?.id)
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    const albumOptions = albums?.filter(album => (album?.user_id === user?.id))

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

            <div
                id='album-select-div'
                className='input-div'>
                <label
                    hidden={albumOptions.length ? false : true}
                    className='input-label'
                >Display an album</label>
                <select
                    hidden={albumOptions.length ? false : true}
                    className='select-input'
                    type='dropdown'
                    name='album'
                    onChange={(e) => setAlbumId(e.target.value)}
                    value={albumId}
                >
                    {albumOptions.map((album, idx) => (<option key={idx} value={album?.id}>{album?.name}</option>))}
                </select>
                <NavLink hidden={albumOptions.length ? true : false} className='add-an-album-link' id='add-an-album' to={`/albums/add-album`}>Add an album!</NavLink>
            </div>

            <div className='image-links'>{images?.filter(image => image?.album_id === +albumId).map((image) => (
                <div id="each-image" key={image?.id}>
                    <Link id="image-link-a" key={image?.id} to={`/images/${image?.id}`}><img key={image?.id} className='image-link' src={image?.image_url} alt='image'></img></Link>
                    <div id="album-image-info">
                        <Link id="info-link-a" key={image?.id} to={`/images/${image?.id}`}>
                            <p className="image-info-alb name-alb-detail" key={image?.id}>{image?.name}</p>
                        </Link>
                    </div>
                </div>
            ))}</div>



        </div>
    );
}
export default ProfilePage;
