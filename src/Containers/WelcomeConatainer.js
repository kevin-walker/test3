import Welcome from "../Components/welcome";
import { connect } from "react-redux";
import { logOutDetails } from "../Action/actions";

var mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logOutDetails());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
