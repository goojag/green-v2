import { SET_SOCIAL_DATA } from 'src/constants/reducers';

const initialState = {
  socialData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCIAL_DATA: {
      return {
        ...state,
        socialData: action.payload
      };
    }
    default:
      return state;
  }
};
