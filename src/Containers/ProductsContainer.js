import ProductsList from "../Components/ProductLists";
import { connect } from "react-redux";
import {
  getAllProducts,
  addItemsToCart,
  checkOutEmptyCart,
  sortItemsOnSelect,
  updateSerchedProducts
} from "../Action/actions";

var mapStateToProps = state => {
  
  return {
    allProducts: state.shownProducts,
    itemsCount: state.cartItems,
    itemsArray: state.cartItemsArray,
    totalAmount: state.totalAmount,
    cameBackFrom: state.cameBackFrom,
    currentUser: state.currentUser
  };
};

var mapDispatchToProps = dispatch => {
  return {
    getAllProducts: data => {
      dispatch(getAllProducts(data));
    },
    addToCart: (itemsCount, itemArray, totalAmount) => {
      dispatch(addItemsToCart(itemsCount, itemArray, totalAmount));
    },
    updateCart: () => {
      dispatch(checkOutEmptyCart());
    },
    sortItems: sortoption => {

      dispatch(sortItemsOnSelect(sortoption));
    },
    updateView: products => {
      dispatch(updateSerchedProducts(products));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
