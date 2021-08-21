import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./../Reducer/reducer";

var store = applyMiddleware(thunk)(createStore)(reducer);

export default store;
