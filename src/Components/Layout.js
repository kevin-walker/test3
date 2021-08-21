import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";

import "./../assets/css/bootstrap.css";
import "./../assets/css/layout.css";

const Layout = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={props => {
          return (
            <React.Fragment>
              <Header {...props} />
              <Component {...props} />
            </React.Fragment>
          );
        }}
      />
    </div>
  );
};

export default Layout;
