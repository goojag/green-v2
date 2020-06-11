import { SET_MENU_DATA } from 'src/constants/reducers';

export const setMenuData = (payload) => dispatch => {
  dispatch({
    type: SET_MENU_DATA,
    payload
  });
};

