export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
