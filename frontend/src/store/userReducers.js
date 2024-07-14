const defaultState = {
  id: null,
  email: null,
  name: null,
  isAuth: false,
  profile: {
    coins: 0,
    words: 0,
  },
};

const SET_AUTH = "SET_AUTH";
const SET_NOTAUTH = "SET_NOTAUTH";
const CHANGE_COINS = "CHANGE_COINS";
const CHANGE_WORDS = "CHANGE_WORDS";

export const userReducer = (state = defaultState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: true,
        id: payload.id,
        email: payload.email,
        name: payload.name,
      };
    case SET_NOTAUTH:
      return { ...defaultState };
    case CHANGE_COINS:
      return {
        ...state,
        profile: {
          ...state.profile,
          coins: Math.max(state.profile.coins + payload.coins, 0),
        },
      };
    case CHANGE_WORDS:
      return {
        ...state,
        profile: {
          ...state.profile,
          words: state.profile.words + payload.words,
        },
      };
    default:
      return state;
  }
};

export const setAuthAction = (payload) => ({ type: SET_AUTH, payload });
export const setNotAuthAction = (payload) => ({ type: SET_NOTAUTH, payload });
export const changeCoinsAction = (payload) => ({ type: CHANGE_COINS, payload });
export const changeWordsAction = (payload) => ({ type: CHANGE_WORDS, payload });
