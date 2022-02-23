import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
import "./Form.css"
import { getComments, updateComment } from '../../store/comment';


const EditCommentForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { commentId } = useParams()

    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state?.comment?.entries)
    const comment = comments.find(comment => comment?.id === +commentId)
    const images = useSelector(state => state?.image?.entries)
    const image = images?.find(image => comment?.image_id === image?.id)

    const [errors, setErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(false);
    const [commentContent, setCommentContent] = useState(comment?.comment_content);

    useEffect(() => {
        dispatch(getComments())
        window.scrollTo(0, 0);
    }, [dispatch]);

    let imageId = image?.id

    useEffect(() => {
        const errors = []

        if (commentContent) {
            if (commentContent === " " || commentContent === "  ") errors.push("Please provide content for your comment")
        }
        setErrors(errors)
    }, [commentContent]);

    let editedComment;

    const onSubmit = async (e) => {
        e.preventDefault()
        if (user && errors.length === 0) {
            editedComment = await dispatch(updateComment({ id: parseInt(commentId), userId: user.id, imageId, commentContent }))
        } else {
            setDisplayErrors(true);
        }
        if (editedComment) {

            history.push(`/images/${imageId}`)
        }
    }

    const updateCommentContent = (e) => {
        setCommentContent(e.target.value)
    }

    return (
        <div id="edit-reivew-product-div">
            <form className="style-form-edit edit-review" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2"> Edit comment </h2>

                <div className='input-div'>
                    <textarea
                        type='text'
                        className='text-area'
                        name='content'
                        required
                        onChange={updateCommentContent}
                        value={commentContent}
                    ></textarea>
                </div>

                <div className='submit-btn-div'>
                    <button className="submit-btn" type='submit'> Submit </button>
                </div>

                <div className='submit-btn-div'>
                    <Link className="submit-btn" to={`/images/${imageId}`}>Cancel</Link>
                </div>

            </form>
        </div>
    )
}

export default EditCommentForm;
