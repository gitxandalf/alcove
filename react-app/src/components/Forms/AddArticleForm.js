import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import "./Form.css"
import { postArticle } from '../../store/article'

const AddArticleForm = () => {

    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const articles = useSelector(state => state?.article?.entries);

    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [articleContent, setArticleContent] = useState('');

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);



    const onSubmit = async (e) => {
        e.preventDefault();
        if (user && errors.length === 0) {
            article = await dispatch(postArticle({ userId: user.id, imageUrl, title, articleContent }));
        } else {
            setDisplayErrors(true);
        }
        if (article) {
            history.push(`/users/${user.id}`);
        }
    };


    useEffect(() => {
        const errors = [];
        if (title?.length > 50 || title?.length <= 0) errors.push("Title must be less 50 characters")
        if (imageUrl?.length > 255 || imageUrl?.length <= 0) errors.push("Image Url must be less than 255 characters")
        if (!imageUrl?.includes("http" || "https")) errors.push("Please provide a valid image URL")
        if (articleContent === " " || articleContent === "  ") errors.push("Please provide some content for your article")
        if (errors) setErrors(errors)

    }, [imageUrl, title, articleContent, articles])

    let article;

    const updateImageUrl = (e) => {
        setImageUrl(e.target.value);
    };

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateArticleContent = (e) => {
        setArticleContent(e.target.value);
    };

    return (
        <div id="add-image-div">
            <form className="image-form-edit" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2"> Add an article to your blog </h2>

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
                    >Title</label>
                    <input
                        className='title-input'
                        placeholder='Title'
                        type='text'
                        name='title'
                        required
                        onChange={updateTitle}
                        value={title}
                    ></input>
                </div>

                <div >
                    <label
                        className='input-label'
                    >Content</label>
                    <textarea
                        placeholder='Content'
                        className='text-area'
                        type='text'
                        name='content'
                        required
                        // disabled={errors.length > 0}
                        onChange={updateArticleContent}
                        value={articleContent}
                    ></textarea>
                </div>

                <div className='submit-btn-div'>
                    <button className="submit-btn" type='submit'>Post this article!</button>
                </div>

            </form>
        </div>
    );
};

export default AddArticleForm;
