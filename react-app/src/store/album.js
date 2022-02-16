const LOAD = "albums/LOAD";
const ADD_ALBUM = "albums/ADD"


const load = list => ({
    type: LOAD,
    list
})

const addAlbum = (album) => ({
    type: ADD_ALBUM,
    album
});


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


const initialState = {
    entries: []
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD: {
            return {
                ...state,
                entries: [...action.list.albums]
            }
        }

        case ADD_ALBUM: {
            return {
                ...state,
                entries: [...state.entries, action.album, action.images]
            }
        }

        default: return state;
    }
}

export default albumReducer;
