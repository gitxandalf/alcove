import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import "./ProfilePage.css"


function ProfilePage() {

    const [user, setUser] = useState({});

    const { userId } = useParams();
    // const user = useSelector(state => state?.session?.user);

    const images = useSelector(state => state?.image?.entries)
    const users = useSelector(state => state?.album?.usersEntries)
    const albums = useSelector(state => state?.album?.entries)
    const articles = useSelector(state => state?.article?.entries)


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

            <div className='profile-left'>

                <div
                    id='album-select-div'
                    className='input-div'>
                    <label
                        hidden={albumOptions.length ? false : true}
                        className='input-label'
                    >{user.username}'s Albums</label>
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


            <div className='profile-right'>

                <div className='articles-header'>
                    <p>{user.username}'s Blog</p>
                    <Link id='new-article' key={user?.id} to={`/articles/add-article`}>Write an Article!</Link>
                </div>


                <div className='article-links'>{articles?.filter(article => article?.user_id === +userId).map((article) => (
                    <div id="each-article" key={article?.id}>
                        <Link id="image-link-a" key={article?.id} to={`/articles/${article?.id}`}><img key={article?.id} className='image-link' src={article?.image_url} alt='article'></img></Link>
                        <div id="album-image-info">
                            <Link id="info-link-a" key={article?.id} to={`/articles/${article?.id}`}>
                                <p className="article-info" key={article?.id}>{article?.title}</p>
                            </Link>
                        </div>
                    </div>
                ))}</div>


            </div>

        </div>
    );
}
export default ProfilePage;
