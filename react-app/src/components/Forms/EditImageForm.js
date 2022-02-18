import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom';
import "./Form.css"
import { updateImage } from '../../store/image';


const EditImageForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { imageId } = useParams();

    let updatedImage;

    const images = useSelector(state => state?.image?.entries)
    const image = images.find(image => image.id === +imageId)

    const user = useSelector(state => state.session.user);

    const [name, setName] = useState(image?.name)
    const [description, setDescription] = useState(image?.description);

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);


    useEffect(() => {
        const errors = [];

        if (name?.length > 50 || name?.length <= 0) errors.push("Name must be less 50 characters")
        if (description === " " || description === "  ") errors.push("Please provide a description")
        if (errors) setErrors(errors)

    }, [name, description, images, imageId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const onSubmit = async (e) => {

        e.preventDefault();

        if (errors.length === 0) {
            updatedImage = await dispatch(updateImage({ id: parseInt(imageId), userId: user.id, albumId: image.album_id, imageUrl: image.image_url, name, description }));
        } else {
            setDisplayErrors(true);
        }

        if (updatedImage) {
            history.push(`/images/${image?.id}`)
        }
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };


    return (
        <div id="edit-image-div">
            <form className="image-form-edit" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2"> Edit Image Details </h2>

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
                        type='submit'>Update This Image!</button>
                </div>

                <div className='submit-btn-div'>
                    <Link className="submit-btn" to={`/images/${imageId}`}>Cancel</Link>
                </div>

            </form>
        </div>
    );
};

export default EditImageForm;
