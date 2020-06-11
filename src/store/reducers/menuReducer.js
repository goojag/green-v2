import { SET_MENU_DATA } from 'src/constants/reducers';

const initialState = {
  menuNavs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_DATA: {
      return {
        ...state,
        menuNavs: action.payload
      };
    }
    default:
      return state;
  }
};
