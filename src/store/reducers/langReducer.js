import Cookies from 'js-cookie';

const initialState = {
    lang: Cookies.get('lang')
};

const langReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'en':
            return {
                ...state,
                lang: action.data
            }
        case 'cn':
            return {
                ...state,
                lang: action.data
            }
        default:
            return state;
    }
}

export default langReducer;