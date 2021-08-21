import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/welcome.css";
import { Card } from "react-bootstrap";

class Welcome extends Component {
  componentDidMount() {
    document.getElementById("login").style.display = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("login").innerHTML = "Login";
    this.props.onLogout();
  }
  render() {
    return (
      <div className="container-styles">
        <Card className="card">
          <Card.Header className="cardHead">Welcome</Card.Header>
          <Card.Body>
            <span className="img-responsive center-block logo-styles">
              <span className="glyphicon glyphicon-shopping-cart"> </span>
            </span>
            <div id="div1" className="title-styles">
              mCart
            </div>
            <div className="row">
              <div className="text-styles">
                An online app to purchase mobile gadgets
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default Welcome;
