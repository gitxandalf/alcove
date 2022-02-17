import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import "./Form.css"
import { postAlbum } from '../../store/album'

const AddAlbumForm = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('');

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);

    const user = useSelector(state => state.session.user);
    const albums = useSelector(state => state?.album?.entries);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (user && errors.length === 0) {
            album = await dispatch(postAlbum({ userId: user.id, name, description }));
        } else {
            setDisplayErrors(true);
        }
        if (album) {
            history.push(`/albums/${album.id}/images`);
        }
    };

    useEffect(() => {
        const errors = [];
        if (name?.length > 50 || name?.length <= 0) errors.push("Name must be less 50 characters")
        if (description === " " || description === "  ") errors.push("Please provide a description")
        if (errors) setErrors(errors)

    }, [name, description, albums])

    let album;

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };


    return (
        <div id="outer-form-div">
            <form className="form-div" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2"> Add an album </h2>

                <div className='input-div'>
                    <label
                        className='input-label'
                    >Name</label>
                    <input
                        className='name-input'
                        placeholder='Your album name'
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
                        onChange={updateDescription}
                        value={description}
                    ></textarea>
                </div>

                <div className='submit-btn-div'>
                    <button className="submit-btn" type='submit'>Add This Album!</button>
                </div>
            </form>
        </div>
    );
};

export default AddAlbumForm;
