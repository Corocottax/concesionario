const INITIAL_STATE = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING_LOGIN":
      return { ...state, loading: true };
    case "LOGIN":
      return {
        ...state,
        loading: false,
        user: action.contenido.user,
        token: action.contenido.token,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        error: action.contenido,
      };
    case "LOGOUT": 
      return {...state, user: null, token: null}
    default:
      return state;
  }
};
