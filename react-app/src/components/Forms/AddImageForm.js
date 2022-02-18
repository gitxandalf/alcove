import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import "./Form.css"
import { postImage } from '../../store/image'

const AddImageForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const images = useSelector(state => state?.image?.entries);
    const albums = useSelector(state => state?.album?.entries);



    const [albumId, setAlbumId] = useState(albums?.find(album => album?.user_id === +user.id)?.id);


    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);



    const onSubmit = async (e) => {
        e.preventDefault();
        if (user && errors.length === 0) {
            image = await dispatch(postImage({ userId: user.id, albumId, imageUrl, name, description }));
        } else {
            setDisplayErrors(true);
        }
        if (image) {
            history.push(`/images/${image.id}`);
        }
    };


    useEffect(() => {
        const errors = [];
        if (name?.length > 50 || name?.length <= 0) errors.push("Name must be less 50 characters")
        if (imageUrl?.length > 255 || imageUrl?.length <= 0) errors.push("Image Url must be less than 255 characters")
        if (!imageUrl?.includes("http" || "https")) errors.push("Please provide a valid image URL")
        if (description === " " || description === "  ") errors.push("Please provide a description")
        if (errors) setErrors(errors)

    }, [imageUrl, name, description, images])

    let image;

    const updateAlbum = (e) => {
        setAlbumId(e.target.value);
    };

    const updateImageUrl = (e) => {
        setImageUrl(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };


    const albumOptions = albums?.filter(album => (album?.user_id === user.id))

    return (
        <div id="add-image-div">
            <form className="image-form-edit" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2"> Post a photo </h2>
                <div
                    className='input-div'>
                    <label
                        className='input-label'
                    >Album</label>
                    <select
                        className='select-input'
                        type='dropdown'
                        name='album'
                        onChange={updateAlbum}
                        value={albumId}>
                        <option hidden={albumOptions.length ? true : false}>You need an album to post to!</option>
                        {albumOptions.map((album, idx) => (<option key={idx} value={album?.id}>{album.name}</option>))}
                    </select>
                </div>
                <div className='input-div'>
                    <label
                        className='input-label'
                    >Image Url</label>
                    <input
                        className='title-input'
                        placeholder='Image Url'
                        type='text'
                        name='image_url'
                        required
                        onChange={updateImageUrl}
                        value={imageUrl}
                    ></input>
                </div>
                <div className='input-div'>
                    <label
                        className='input-label'
                    >Name</label>
                    <input
                        className='title-input'
                        placeholder='Your photo name'
                        type='text'
                        name='name'
                        required
                        onChange={updateName}
                        value={name}
                    ></input>
                </div>

                <div >
                    <label
                        className='input-label'
                    >Description</label>
                    <textarea
                        placeholder='Description'
                        className='text-area'
                        type='text'
                        name='description'
                        required
                        // disabled={errors.length > 0}
                        onChange={updateDescription}
                        value={description}
                    ></textarea>
                </div>

                <div className='submit-btn-div'>
                    <button className="submit-btn" type='submit'>Post this photo!</button>
                    <NavLink className='submit-btn' id='add-an-album' to={`/albums/add-album`}>Add an album!</NavLink>
                </div>

            </form>
        </div>
    );
};

export default AddImageForm;
