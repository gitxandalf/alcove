import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom';
import "./Form.css"
import { updateArticle } from '../../store/article';


const EditArticleForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { articleId } = useParams();

    let updatedArticle;

    const articles = useSelector(state => state?.article?.entries)
    const article = articles.find(article => article.id === +articleId)

    const user = useSelector(state => state.session.user);

    const [imageUrl, setImageUrl] = useState(article?.image_url)
    const [title, setTitle] = useState(article?.title)
    const [articleContent, setArticleContent] = useState(article?.article_content);

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);


    useEffect(() => {
        const errors = [];

        if (imageUrl?.length > 255 || imageUrl?.length <= 0) errors.push("Image Url must be less than 255 characters")
        if (!imageUrl?.includes("http" || "https")) errors.push("Please provide a valid image URL")
        if (title?.length > 50 || title?.length <= 0) errors.push("Title must be less 50 characters")
        if (articleContent === " " || articleContent === "  ") errors.push("Please provide some content for your article")
        if (errors) setErrors(errors)

    }, [imageUrl, title, articleContent, articles, articleId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const onSubmit = async (e) => {

        e.preventDefault();

        if (errors.length === 0) {
            updatedArticle = await dispatch(updateArticle({ id: parseInt(articleId), userId: user.id, imageUrl, title, articleContent }));
        } else {
            setDisplayErrors(true);
        }

        if (updatedArticle) {
            history.push(`/users/${user.id}`)
        }
    };

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
                <h2 id="form-h2"> Update your article </h2>

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
                    <button className="submit-btn" type='submit'>Update this article!</button>
                </div>

                <div className='submit-btn-div'>
                    <Link className="submit-btn" to={`/articles/${articleId}`}>Cancel</Link>
                </div>

            </form>
        </div>
    );
};

export default EditArticleForm;
