
const LOAD = "comments/LOAD"
const ADD_COMMENT = "comments/ADD_COMMENT"
const EDIT_COMMENT = "comments/EDIT_COMMENT"
const DELETE_COMMENT = "comments/DELETE_COMMENT"


const load = list => ({
    type: LOAD,
    list
})

const addComment = comment => ({
    type: ADD_COMMENT,
    comment,
})

const editComment = comment => ({
    type: EDIT_COMMENT,
    comment,
})

const deleteComment = comment => ({
    type: DELETE_COMMENT,
    comment,
})

export const getComments = () => async dispatch => {
    const response = await fetch(`/api/comments/`)

    if (response.ok) {
        const list = await response.json()
        dispatch(load(list.comments))
    }
}

export const postComment = (payload) => async dispatch => {
    const { userId, articleId, imageId, commentContent } = payload
    const response = await fetch(`/api/comments/add-comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "article_id": articleId,
            "image_id": imageId,
            "comment_content": commentContent
        }),
    })

    if (response.ok) {
        const submission = await response.json()
        dispatch(addComment(submission))
        return submission
    }
}

export const updateComment = (payload) => async dispatch => {
    const { userId, articleId, imageId, commentContent } = payload
    const response = await fetch(`/api/comments/${commentId}/edit-comment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "article_id": articleId,
            "image_id": imageId,
            "comment_content": commentContent
        })
    })
    if (response.ok) {
        const edit = await response.json()
        dispatch(editComment(edit))
        return edit
    }
}

export const removeComment = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'delete'
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(deleteComment(comment))
    }
}

const initialState = {
    entries: []
}

const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {

        case LOAD: {
            return {
                ...state,
                entries: [...action.list]
            }
        }

        case ADD_COMMENT: {
            return {
                ...state,
                entries: [...state.entries, action.comment]
            }
        }

        case EDIT_COMMENT: {
            return {
                ...state,
                [action.payload]: action.id
            }
        }

        case DELETE_COMMENT: {
            newState = { ...state }
            delete newState[action.comment]
            return newState
        }

        default: return state
    }
}

export default commentReducer