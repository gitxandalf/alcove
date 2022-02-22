import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import "./ImageDetail.css"
import AddCommentForm from '../Forms/AddCommentForm';
import { getComments, removeComment } from '../../store/comment';
import { getAlbums, } from '../../store/album'
import { getImages, getImage, removeImage } from '../../store/image';


function ImageDetail() {

    const history = useHistory()
    const dispatch = useDispatch()

    const { imageId } = useParams();

    const images = useSelector(state => state?.image?.entries)
    const image = images?.find(image => image?.id === +imageId)
    const albums = useSelector(state => state?.album?.entries)
    const comments = useSelector(state => state?.comment?.entries)
    const users = useSelector(state => state?.image?.usersEntries)
    const user = useSelector(state => state?.session?.user);


    useEffect(() => {
        dispatch(getImages())
        dispatch(getImage(imageId))
        dispatch(getComments())
        dispatch(getAlbums())
    }, [dispatch, imageId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.value
        dispatch(removeImage(id))
        history.push(`/albums/${image?.album_id}/images`)
    }

    const handleCommentDelete = async (e) => {
        e.preventDefault();
        const id = parseInt(e.target.value)
        await dispatch(removeComment(id));
        dispatch(getComments())
        history.push(`/images/${imageId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            history.push('/login')
            return;
        };
    }

    if (!image) return null;

    const filteredComments = comments.filter(comment => comment?.image_id === parseInt(imageId))

    return (
        <div className='image-detail'>
            <div className='image-detail-header'>
                <div id="image-name-div">
                    <p id="image-header"> "{images?.find(curImg => curImg?.id === parseInt(imageId))?.name}" by <a href={`/users/${image?.user_id}`}>{users[image?.user_id].username}</a> in <a href={`/albums/${image?.album_id}/images`}>{albums?.find(album => image?.album_id === album.id)?.name}</a></p>
                    <p>{images?.find(curImg => curImg?.id === parseInt(imageId))?.description}</p>
                </div>

                <div className='edit-delete'>
                    <NavLink className="edit-button" hidden={user?.id === image?.user_id ? false : true} to={`/images/${image?.id}/edit-image`} value={image?.id} >Edit Image Details</NavLink>
                    <button className="delete-button" hidden={user?.id === image?.user_id ? false : true} value={image?.id} onClick={handleDelete} type="submit">Delete Image</button>
                </div>
            </div>

            <div className='image-detail-left'>

                <img id="image" src={`${image?.image_url}`} alt='Image-Details' />
                <>{filteredComments.length > 1 ? < h2 className='comment-label'>{filteredComments.length} comments</h2> : ''}</>
                <>{filteredComments.length === 1 ? <h2 className='comment-label'>{filteredComments.length} comment</h2> : ''}</>
                <>{filteredComments.length === 0 ? < h2 className='comment-label'>Be the first to Comment!</h2> : ''}</>

                <div id="image-comment-header">
                    <h4 id="image-comment-h4">Tell the poster what you think!</h4>
                </div>

                <h5 id="image-comment-h5">Comments for this photo</h5>
                <div id="line-div-gray"></div>

                {comments && comments?.filter(comment => comment?.image_id === parseInt(imageId)).map(comment => (
                    <div id="comment-content-div">
                        <div id='user-info-comment'>
                            <p id="username-p-line"><a href={`/users/${comment.user_id}`}>{users[comment.user_id].username}</a> wrote:</p>
                        </div>

                        <p className="content-p">{comment?.comment_content}</p>
                        {user &&
                            <div id="edit-delete-div">
                                <NavLink hidden={comment?.user_id !== user.id} to={`/comments/${comment?.id}/edit-comment`} value={comment?.id} className="edit-btn">Edit</NavLink>
                                <button hidden={comment?.user_id !== user.id} className="delete-btn" value={comment?.id} onClick={handleCommentDelete} type="submit">Delete</button>
                            </div>
                        }
                    </div>
                ))}

                {/* {user && !(image?.user_id === user?.id) &&
                    <AddCommentForm iamgeId={imageId} />} */}
            </div>

            <div className='image-detail-right'>

            </div>

        </div>
    );

}
export default ImageDetail;
