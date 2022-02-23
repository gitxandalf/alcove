import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link, NavLink } from 'react-router-dom';
import "./ArticleDetail.css"
import { getArticles, getArticle, removeArticle } from '../../store/article';


function ArticleDetail() {

    const history = useHistory()
    const dispatch = useDispatch()

    const { articleId } = useParams();

    const articles = useSelector(state => state?.article?.entries)
    const article = articles?.find(article => article?.id === +articleId)
    const albums = useSelector(state => state?.album?.entries)
    const users = useSelector(state => state?.image?.usersEntries)
    const user = useSelector(state => state?.session?.user);


    useEffect(() => {
        dispatch(getArticles())
        dispatch(getArticle(articleId))
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            history.push('/login')
            return;
        };
    }

    if (!article) return null;

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
        </div>
    );

}
export default ArticleDetail;
