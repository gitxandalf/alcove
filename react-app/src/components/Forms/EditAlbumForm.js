import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom';
import "./Form.css"
import { updateAlbum } from '../../store/album';


const EditAlbumForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { albumId } = useParams();

    let updatedAlbum;

    const albums = useSelector(state => state?.album?.entries)
    const album = albums.find(album => album.id === +albumId)

    const users = useSelector(state => state?.album?.usersEntries)
    const user = useSelector(state => state.session.user);

    const [name, setName] = useState(album?.name)
    const [description, setDescription] = useState(album?.description);

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);



    useEffect(() => {
        const errors = [];

        if (name?.length > 50 || name?.length <= 0) errors.push("Name must be less 50 characters")
        if (description === " " || description === "  ") errors.push("Please provide a description")
        if (errors) setErrors(errors)

    }, [name, description, albums, albumId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const onSubmit = async (e) => {

        e.preventDefault();

        if (errors.length === 0) {
            updatedAlbum = await dispatch(updateAlbum({ userId: user.id, id: parseInt(albumId), name, description }));
        } else {
            setDisplayErrors(true);
        }

        if (updatedAlbum) {
            history.push(`/albums/${album?.id}/images`)
        }
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };


    return (
        <div id="edit-album-div">
            <form className="style-form-edit" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2"> Edit Album </h2>

                <div className='input-div'>
                    <label className='input-label'>Name</label>
                    <input
                        className='title-input'
                        type='text'
                        name='name'
                        required
                        onChange={updateName}
                        value={name}
                    ></input>
                </div>

                <div className='input-div'>
                    <label className='input-label'>Description</label>
                    <textarea
                        className='text-area'
                        type='text'
                        name='description'
                        required
                        onChange={updateDescription}
                        value={description}
                    ></textarea>
                </div>

                <div className='submit-btn-div'>
                    <button
                        className="submit-btn"
                        // disabled={errors.length > 0}
                        type='submit'>Update This Album!</button>
                </div>

                <div className='submit-btn-div'>
                    <Link className="submit-btn" to={`/albums/${albumId}/images`}>Cancel</Link>
                </div>

            </form>
        </div>
    );
};

export default EditAlbumForm;
