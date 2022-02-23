import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { postComment } from '../../store/comment';
import "./Form.css"



const AddCommentForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { imageId } = useParams();

    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false);

    const [commentContent, setCommentContent] = useState('')
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const errors = []
        if (commentContent === " " || commentContent === "  ") errors.push("Please provide content for your comment")
        setErrors(errors)
    }, [commentContent])

    let comment;

    const onSubmit = async (e) => {
        e.preventDefault()
        if (user && errors.length === 0) {
            comment = await dispatch(postComment({ userId: user.id, imageId, commentContent }))
        } else {
            setDisplayErrors(true);
        }

        if (comment) {
            history.push(`/images/${imageId}`)
            setCommentContent("")
        }
    }

    const updateCommentContent = (e) => {
        setCommentContent(e.target.value)
    }

    return (
        <div id="comment-image-div">
            <form className="style-form" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <h2 id="form-h2">Write a comment</h2>

                <div className='input-div'>
                    <textarea
                        className='text-area'
                        type='text'
                        name='content'
                        required
                        onChange={updateCommentContent}
                        value={commentContent}
                    ></textarea>
                </div>
                <div id="">

                </div>
                <div className='submit-btn-div'>
                    <button
                        className="submit-btn"
                        // disabled={errors.length > 0}
                        type='submit'> Submit </button>
                </div>
            </form>
        </div>
    )
}

export default AddCommentForm;
