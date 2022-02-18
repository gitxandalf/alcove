import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import "./AlbumDetail.css"
// import AddCommentForm from '../Forms/AddCommentForm';
// import { getComments, removeComment } from '../../store/comment';
import { getAlbums, getAlbum, removeAlbum } from '../../store/album'
import { getImages } from '../../store/image';
import "../AlbumDetail/AlbumDetail.css"

function AlbumDetail() {

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.value
        dispatch(removeAlbum(id))
        history.push(`/users/${user?.id}`)
    }

    // const handleCommentDelete = async (e) => {
    //     e.preventDefault();
    //     const id = parseInt(e.target.value)
    //     await dispatch(removComment(id));
    //     dispatch(getComments())
    //     history.push(`/albums/${albumId}/images`)
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     if (!user) {
    //         history.push('/login')
    //         return;
    //     };
    // }

    return (
        <div>
            <div className='album-detail'>
                <div id="album-name-div">
                    <p id="album-header"> "{albums?.find(curAlb => curAlb?.id === parseInt(albumId))?.name}" by <a href={`/users/${album.user_id}`}>{users[album.user_id].username}</a> </p>
                    <p>{albums?.find(curAlb => curAlb?.id === parseInt(albumId))?.description}</p>
                </div>

                <div className='edit-delete'>
                    <NavLink className="edit-button" hidden={user?.id === album?.user_id ? false : true} to={`/albums/${album?.id}/edit-album`} value={album?.id} >Edit Album</NavLink>
                    <button className="delete-button" hidden={user?.id === album?.user_id ? false : true} value={album?.id} onClick={handleDelete} type="submit">Delete Album</button>
                </div>
                <div className='image-links'>{images?.filter(image => image?.album_id === parseInt(albumId)).map((image) => (
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
        </div>
    );

}
export default AlbumDetail;
