const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "USER_UPDATE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case "USER_UPDATE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: false,
      };


    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
      default:
        return {...state};
  }
};


export default AuthReducer