import ProductDetail from "../Components/ProductDetail";
import { connect } from "react-redux";
import { getAllProducts } from "../Action/actions";

var mapStateToProps = state => {
  return {
    allProducts: state.shownProducts
  };
};

var mapDispatchToProps = dispatch => {
  return {
    getAllProducts: data => {
      dispatch(getAllProducts(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
