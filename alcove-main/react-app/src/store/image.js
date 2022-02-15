const LOAD = "images/LOAD";
const ADD_IMAGE = "images/ADD_IMAGE"
const EDIT_IMAGE = "images/EDIT_IMAGE"
const DELETE_IMAGE = "images/DELETE_IMAGE"


const load = list => ({
    type: LOAD,
    list
})

const addImage = image => ({
    type: ADD_IMAGE,
    image,
});

const editImage = image => ({
    type: EDIT_IMAGE,
    image,
})

export const getImages = () => async dispatch => {
    const response = await fetch(`/api/images/`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const getImage = (payload) => async dispatch => {
    const response = await fetch(`/api/images/${payload}`);

    if (response.ok) {
        const image = await response.json();

        dispatch(getImages())
        dispatch(addImage(image))
    }
}

export const postImage = (payload) => async dispatch => {
    const { userId, albumId, imageUrl, name, description } = payload
    const response = await fetch(`/api/images/add-image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user_id": userId,
            "album_id": albumId,
            "image_url": imageUrl,
            "name": name,
            "description": description,
        }),
    })

    if (response.ok) {
        const submission = await response.json()
        dispatch(addImage(submission))
        return submission;
    }
}

export const updateImage = (payload) => async dispatch => {
    const { id, userId, albumId, imageUrl, name, description } = payload
    const response = await fetch(`/api/images/${payload.id}/edit-image`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "user_id": userId,
            "album_id": albumId,
            "image_url": imageUrl,
            "name": name,
            "description": description,
        })
    })
    if (response.ok) {
        const edit = await response.json()
        dispatch(editImage(edit))
        dispatch(getImage(id))
        return edit
    }
}

export const removeImage = (id) => async dispatch => {
    const response = await fetch(`/api/images/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        dispatch(getImages())
    }
}

const initialState = {
    entries: []
};

const imageReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {

        case LOAD: {

            const usersEntries = [...action.list.users].reduce((a, b) => {
                return { ...a, [b.id]: { id: b.id, username: b.username, image_url: b.image_url } }
            }, {})
            return {
                ...state,
                entries: [...action.list.images],
                usersEntries: usersEntries
            }
        }

        case ADD_IMAGE: {
            return {
                ...state,
                entries: [...state.entries, action.image]
            }
        }

        case EDIT_IMAGE: {
            return {
                ...state,
                [action.payload]: action.id
            }
        }

        case DELETE_IMAGE: {
            newState = { ...state };
            delete newState[action.image]
            return newState;
        }

        default: return state;
    }
}

export default imageReducer;
