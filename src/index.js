import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "./Store/store";
import Layout from "./Components/Layout";

import LoginContainer from "./Containers/LoginContainer";
import WelcomeContainer from "./Containers/WelcomeConatainer";
import ProductsContainer from "./Containers/ProductsContainer";
import DetailContainer from "./Containers/DetailContainer";
import CartContainer from "./Containers/Cartcontainer";

let baseUrl = window.location.pathname.substr(
  0,
  window.location.pathname.lastIndexOf("/")
);

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Layout component={WelcomeContainer} path={baseUrl + "/"} exact />
          <Layout component={LoginContainer} path={baseUrl + "/login"} />
          <Layout component={ProductsContainer} path={baseUrl + "/products"} />
          <Layout
            component={DetailContainer}
            path={baseUrl + "/productsDetail/:id"}
            exact
          />
          <Layout
            component={CartContainer}
            path={baseUrl + "/cartItems"}
            exact
          />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
