import Login from "./../Components/Login";
import { connect } from "react-redux";
import { ValidateCreds } from "../Action/actions";

var mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onLogin: credentials => {
      dispatch(ValidateCreds(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
