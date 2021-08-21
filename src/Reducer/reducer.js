export default (
  state = {
    currentUser: "",
    shownProducts: [],
    cartItems: 0,
    totalAmount: 0,
    cartItemsArray: [],
    cameBackFrom: ""
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":

      return Object.assign({}, state, { currentUser: action.data.userName });

    case "LOGOUT":

      return Object.assign({}, state, {
        currentUser: "",
        shownProducts: [],
        cartItems: 0,
        totalAmount: 0,
        cartItemsArray: [],
        cameBackFrom: ""
      });
    case "CHANGE_PRODUCTS":

      return Object.assign({}, state, { shownProducts: action.data });

    case "ADD_TOCART":


      return Object.assign({}, state, {
        cartItems: action.itemsCount,
        cartItemsArray: action.itemsArray,
        totalAmount: action.totalAmount,
        cameBackFrom: ""
      });

    case "EMPTY_CART":

      return Object.assign({}, state, {
        cartItems: 0,
        cartItemsArray: [],
        totalAmount: 0
      });

    case "UPDATE_CART":

      return Object.assign({}, state, { cameBackFrom: action.data });
    case "SHOW_SEARCH_RESULTS":
      return Object.assign({}, state, { shownProducts: action.products })
    default:
      return state;
  }
};
