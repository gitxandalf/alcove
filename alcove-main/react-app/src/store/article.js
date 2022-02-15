const LOAD = "articles/LOAD";
const ADD_ARTICLE = "articles/ADD_ARTICLE"
const EDIT_ARTICLE = "articles/EDIT_ARTICLE"
const DELETE_ARTICLE = "articles/DELETE_ARTICLE"


const load = list => ({
    type: LOAD,
    list
})

const addArticle = article => ({
    type: ADD_ARTICLE,
    article,
});

const editArticle = article => ({
    type: EDIT_ARTICLE,
    article,
})

export const getArticles = () => async dispatch => {
    const response = await fetch(`/api/articles/`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const getArticle = (payload) => async dispatch => {
    const response = await fetch(`/api/articles/${payload}`);

    if (response.ok) {
        const article = await response.json();

        dispatch(getArticles())
        dispatch(addArticle(article))
    }
}

export const postArticle = (payload) => async dispatch => {
    const { userId, imageUrl, title, articleContent } = payload
    const response = await fetch(`/api/articles/add-article`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "image_url": imageUrl,
            "title": title,
            "article_content": articleContent,
        }),
    })

    if (response.ok) {
        const submission = await response.json()
        dispatch(addArticle(submission))
        return submission;
    }
}

export const updateArticle = (payload) => async dispatch => {
    const { userId, imageUrl, title, articleContent } = payload
    const response = await fetch(`/api/articles/${payload.id}/edit-article`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "image_url": imageUrl,
            "title": title,
            "article_content": articleContent,
        })
    })
    if (response.ok) {
        const edit = await response.json()
        dispatch(editArticle(edit))
        dispatch(getArticle(id))
        return edit
    }
}

export const removeArticle = (id) => async dispatch => {
    const response = await fetch(`/api/articles/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        dispatch(getArticles())
    }
}

const initialState = {
    entries: []
};

const articleReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {

        case LOAD: {

            const usersEntries = [...action.list.users].reduce((a, b) => {
                return { ...a, [b.id]: { id: b.id, username: b.username, image_url: b.image_url } }
            }, {})
            return {
                ...state,
                entries: [...action.list.articles],
                usersEntries: usersEntries
            }
        }

        case ADD_ARTICLE: {
            return {
                ...state,
                entries: [...state.entries, action.article]
            }
        }

        case EDIT_ARTICLE: {
            return {
                ...state,
                [action.payload]: action.id
            }
        }

        case DELETE_ARTICLE: {
            newState = { ...state };
            delete newState[action.article]
            return newState;
        }

        default: return state;
    }
}

export default articleReducer;
