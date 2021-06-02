const initialState = { favoritesFilm: []};

function toggleFavorite(state = initialState, action){
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const isFavorite = state.favoritesFilm.findIndex(item => item.id === action.value.id);
            if(isFavorite !== -1){
                //film déja dans les favoris
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((index) => index !== isFavorite)
                }
            }
            else {
                // film pas encore dans les favoris
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state;
        default:
            return state;

    }
}

export default toggleFavorite();
