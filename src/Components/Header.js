import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import "../assets/css/layout.css";

let baseUrl = window.location.pathname.substr(
  0,
  window.location.pathname.lastIndexOf("/")
);

class Header extends Component {
  constructor(props) {
    super(props);

    sessionStorage.clear();
  }

  setRedirect = () => {
    const value = document.getElementById("login").innerHTML;
    if (value === "Login") {
      this.props.history.push(baseUrl + "/login");
    } else if (value === "Logout") {
      sessionStorage.clear();
      document.getElementById("login").innerHTML = "Login";
      document.getElementById("welcome").style.display = "none";

      this.props.history.push(baseUrl + "/");
    }
  };

  render() {


    return (
      <Navbar bg="light" variant="light" style={{ marginBottom: 0 }}>
        <Nav className="mr-auto">
          <Nav.Link href="#home">

            <i
              style={{ fontSize: "20px", marginLeft: "1em", color: "#ff0080" }}
              title="facebook"
              className="fa fa-facebook"
            ></i>
          </Nav.Link>
          <Nav.Link href="#home">

            <i
              style={{ fontSize: "20px", marginLeft: "1em", color: "#ff0080" }}
              title="twitter"
              className="fa fa-twitter"
            ></i>
          </Nav.Link>
        </Nav>
        <Nav>
          <div className="panel-heading text-right" id="welcome">
            Welcome
          </div>
          <Button variant="primary" id="login" onClick={this.setRedirect}>
            Login
          </Button>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
