import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import "./HomePage.css"
import { getAlbums, getAlbum, removeAlbum } from '../../store/album'
import { getImages } from '../../store/image';
import armenia from '../../images/armenia-copy.jpg'

function HomePage() {

    const history = useHistory()
    const dispatch = useDispatch()

    const { albumId } = useParams();

    const images = useSelector(state => state?.image?.entries)
    const albums = useSelector(state => state?.album?.entries)
    const album = albums?.find(album => album?.id === +albumId)
    const users = useSelector(state => state?.album?.usersEntries)
    const user = useSelector(state => state?.session?.user);


    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getAlbum(albumId))
        dispatch(getImages())
        // dispatch(getComments())
    }, [dispatch, albumId])

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.value
        dispatch(removeAlbum(id))
        history.push(`/users/${user?.id}`)
    }

    return (
        <div>
            <div className='home-page'>
                <div id="home-page-header">
                    {/* <img className='header-bg' src={armenia}></img> */}
                    <p id="home-header-title"> Alcove </p>
                    <p id="home-header">The internet's source of freely-usable images.</p>
                    <p id="home-header">Powered by creators everywhere.</p>
                </div>

                <div className='home-links'>{images?.map((image) => (
                    <div id="each-image" key={image?.id}>
                        <Link id="image-link-a" key={image?.id} to={`/images/${image?.id}`}><img key={image?.id} className='home-link' src={image?.image_url} alt='image'></img></Link>
                        <div id="home-image-info">
                            <Link id="info-link-a" key={image?.id} to={`/images/${image?.id}`}>
                                <p className="image-info-alb name-alb-detail" key={image?.id}>{users[image.user_id]?.username}</p>
                            </Link>
                        </div>
                    </div>
                ))}</div>
            </div>
        </div>
    );

}
export default HomePage;
