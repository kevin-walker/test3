import Cart from "../Components/Cart";
import { connect } from "react-redux";
import {
  addItemsToCart,
  checkOutEmptyCart,
  updateCart
} from "../Action/actions";

var mapStateToProps = state => {

  return {
    allProducts: state.shownProducts,
    itemsCount: state.cartItems,
    itemsArray: JSON.parse(localStorage.getItem("addedProducts")),
    totalAmount: state.totalAmount
  };
};

var mapDispatchToProps = dispatch => {
  return {
    addToCart: (itemsCount, itemArray, totalAmount) => {
      dispatch(addItemsToCart(itemsCount, itemArray, totalAmount));
    },
    checkOut: () => {
      dispatch(checkOutEmptyCart());
    },
    updateCart: data => {
      dispatch(updateCart(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
