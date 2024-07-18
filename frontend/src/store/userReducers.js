const defaultState = {
  id: null,
  email: null,
  name: null,
  isAuth: false,
  profile: {
    coins: null,
    words: null,
    upgrades: [],
  },
};

const SET_AUTH = "SET_AUTH";
const SET_NOTAUTH = "SET_NOTAUTH";
const SET_PROFILE = "SET_PROFILE";

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
    case SET_PROFILE:
      return {
        ...state,
        profile: {
          words: payload.words,
          coins: payload.coins,
          upgrades:
            payload.upgrades == null
              ? state.profile.upgrades
              : payload.upgrades,
        },
      };
    default:
      return state;
  }
};

export const setAuthAction = (payload) => ({ type: SET_AUTH, payload });
export const setNotAuthAction = (payload) => ({ type: SET_NOTAUTH, payload });
export const setProfileAction = (payload) => ({ type: SET_PROFILE, payload });
