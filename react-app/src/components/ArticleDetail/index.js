import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import "./ArticleDetail.css"
import AddCommentForm from '../Forms/AddCommentForm';
import { getComments, removeComment } from '../../store/comment';
import { getArticles, getArticle, removeArticle } from '../../store/article';


function ArticleDetail() {

    const history = useHistory()
    const dispatch = useDispatch()

    const { articleId } = useParams();

    const articles = useSelector(state => state?.article?.entries)
    const article = articles?.find(article => article?.id === +articleId)
    const albums = useSelector(state => state?.album?.entries)
    const comments = useSelector(state => state?.comment?.entries)
    const users = useSelector(state => state?.image?.usersEntries)
    const user = useSelector(state => state?.session?.user);


    useEffect(() => {
        dispatch(getArticles())
        dispatch(getArticle(articleId))
        dispatch(getComments())
    }, [dispatch, articleId])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.value
        dispatch(removeArticle(id))
        history.push(`/users/${user?.id}`)
    }

    const handleCommentDelete = async (e) => {
        e.preventDefault();
        const id = parseInt(e.target.value)
        await dispatch(removeComment(id));
        dispatch(getComments())
        history.push(`/articles/${articleId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            history.push('/login')
            return;
        };
    }

    if (!article) return null;

    const filteredComments = comments.filter(comment => comment?.article_id === parseInt(articleId))

    return (
        <div className='article'>
            <div className='article-detail'>
                <div id="article-name-div">
                    <p id="article-header"> "{articles?.find(curArt => curArt?.id === parseInt(articleId))?.title}" by <a href={`/users/${article?.user_id}`}>{users[article?.user_id].username}</a></p>
                    <div className='edit-delete'>
                        <NavLink className="edit-button" hidden={user?.id === article?.user_id ? false : true} to={`/articles/${article?.id}/edit-article`} value={article?.id} >Edit Article</NavLink>
                        <button className="delete-button" hidden={user?.id === article?.user_id ? false : true} value={article?.id} onClick={handleDelete} type="submit">Delete Article</button>
                    </div>
                    <img id="article" src={`${article?.image_url}`} alt='article-detail'></img>
                    <p id="article-content"> {articles?.find(curArt => curArt?.id === parseInt(articleId))?.article_content}</p>
                </div>
            </div>

            <div className='article-comments'>
                <>{filteredComments.length > 1 ? < h2 className='comment-label'>{filteredComments.length} comments</h2> : ''}</>
                <>{filteredComments.length === 1 ? <h2 className='comment-label'>{filteredComments.length} comment</h2> : ''}</>
                <>{filteredComments.length === 0 ? < h2 className='comment-label'>Be the first to Comment!</h2> : ''}</>

                <div id="image-comment-header">
                    <h4 id="image-comment-h4">Tell the poster what you think!</h4>
                </div>

                <h5 id="image-comment-h5">Comments for this photo</h5>

                {comments && comments?.filter(comment => comment?.article_id === parseInt(articleId)).map(comment => (
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
        </div>
    );

}
export default ArticleDetail;
