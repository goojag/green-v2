import { combineReducers } from 'redux';
import langReducer from 'src/store/reducers/langReducer';
import menuReducer from 'src/store/reducers/menuReducer';
import socialReducer from 'src/store/reducers/socialReducer';

export default combineReducers({
    langReducer,
    menuReducer,
    socialReducer
});
