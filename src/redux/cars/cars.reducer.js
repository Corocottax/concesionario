const INITIAL_STATE = {
  cars: [],
  carsApproved: [],
  carsNotApproved: [],
  marcas: [],
  loading: false,
  error: null,
};

export const carsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "GET_CARS":
      return {
        ...state,
        loading: false,
        cars: [...action.contenido.cars],
        carsApproved: [...action.contenido.carsApproved],
        carsNotApproved: [...action.contenido.carsNotApproved],
        marcas: [...action.contenido.marcas]
      };
    case "CAR_POSTED":
      return {
        ...state,
        loading: false,
        carsNotApproved: [...state.carsNotApproved, action.contenido],
      };
    case "ERROR_POSTING_CAR":
      return { ...state, loading: false, error: action.contenido };
    case "UPDATED_CAR":
      return {
        ...state,
        carsNotApproved: [...action.contenido.notApproved],
        carsApproved: [...action.contenido.approved],
      };
    case "DELETE_CAR":
      return {
        ...state,
        carsNotApproved: [...action.contenido.notApproved],
        carsApproved: [...action.contenido.approved],
      };
    default:
      return state;
  }
};