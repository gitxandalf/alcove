const LOAD = "albums/LOAD";
const ADD_ALBUM = "albums/ADD"
const EDIT_ALBUM = "albums/EDIT_ALBUM"
const DELETE_ALBUM = "albums/DELETE_ALBUM"

const load = list => ({
    type: LOAD,
    list
})

const addAlbum = (album) => ({
    type: ADD_ALBUM,
    album
});

const editAlbum = album => ({
    type: EDIT_ALBUM,
    album,
})

export const getAlbums = () => async dispatch => {
    const response = await fetch(`/api/albums/`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const getAlbum = (payload) => async dispatch => {
    const response = await fetch(`/api/albums/${payload}/images`);

    if (response.ok) {
        const album = await response.json();
        dispatch(addAlbum(album))
    }
}

export const postAlbum = (payload) => async dispatch => {
    const { id, userId, name, description } = payload
    const response = await fetch(`/api/albums/add-album`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "user_id": userId,
            "name": name,
            "description": description,
        }),
    })

    if (response.ok) {
        const submission = await response.json()
        dispatch(addAlbum(submission))
        return submission;
    }
}

export const updateAlbum = (payload) => async dispatch => {

    const { id, userId, name, description } = payload
    const response = await fetch(`/api/albums/${payload.id}/edit-album`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "user_id": userId,
            "name": name,
            "description": description,
        })
    })
    if (response.ok) {
        const edit = await response.json()
        dispatch(editAlbum(edit))
        dispatch(getAlbum(id))
        return edit
    }
}

export const removeAlbum = (id) => async dispatch => {
    const response = await fetch(`/api/albums/${id}`, {
        method: 'delete'
    });

    if (response.ok) {
        dispatch(getAlbums())
    }
}

const initialState = {
    entries: []
};

const albumReducer = (state = initialState, action) => {

    let newState;

    switch (action.type) {

        case LOAD: {

            const usersEntries = [...action.list.users].reduce((a, b) => {
                return { ...a, [b.id]: { id: b.id, username: b.username, image_url: b.image_url } }
            }, {})

            return {
                ...state,
                entries: [...action.list.albums],
                usersEntries: usersEntries
            }
        }

        case ADD_ALBUM: {
            return {
                ...state,
                entries: [...state.entries, action.album, action.images]
            }
        }

        case EDIT_ALBUM: {
            return {
                ...state,
                [action.payload]: action.id
            }
        }

        case DELETE_ALBUM: {
            newState = { ...state };
            delete newState[action.album]
            return newState;
        }

        default: return state;
    }
}

export default albumReducer;
