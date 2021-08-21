import React, { Component } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import '../assets/css/layout.css'

let baseUrl = window.location.pathname.substr(
  0,
  window.location.pathname.lastIndexOf("/")
);

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
      usernameInvalid: false,
      pswInvalid: false
    };
  }

  componentDidMount() {
    document.getElementById("login").style.display = "none";
    document.getElementById("submit").style.disabled = "disabled";
  }

  setDetails = e => {
    let field = e.target.name;
    this.setState({
      [field]: e.target.value
    });
    if (field === "username") {
      if (this.state.usernameInvalid) {
        this.setState({
          usernameInvalid: false
        });
      } else {
        return null;
      }
    } else if (field === "password") {
      if (this.state.pswInvalid) {
        this.setState({
          pswInvalid: false
        });
      } else {
        return null;
      }
    }
  };

  setValidity = e => {
    let field = e.target.name;
    if (field === "username") {
      if (this.state.username === "") {
        this.setState({
          usernameInvalid: !this.state.usernameInvalid
        });
      } else {
        return null;
      }
    } else if (field === "password") {
      if (this.state.password === "") {
        this.setState({
          pswInvalid: !this.state.pswInvalid
        });
      } else {
        return null;
      }
    }
  };

  submitLogin = e => {
    e.preventDefault();
    if (!this.state.usernameInvalid && !this.state.pswInvalid) {
      this.props.onLogin({
        userName: this.state.username,
        password: this.state.password
      });
    }
  };

  render() {
    return (
      <div>
        <Col sm="4"></Col>
        <Col sm="4" style={{ top: "150px" }}>
          <Card className="card">
            <Card.Header className="cardHead">Login</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="3">
                    UserName
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="username"
                      onChange={this.setDetails}
                      onBlur={this.setValidity}
                      className="valid-border"
                    />
                    {this.state.usernameInvalid ? (
                      <div style={{ color: "red" }}>User Name is required</div>
                    ) : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="3">
                    Password
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={this.setDetails}
                      onBlur={this.setValidity}
                    />
                    {this.state.pswInvalid ? (
                      <div style={{ color: "red" }}>Password is required</div>
                    ) : null}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextSubmit">
                  <Col sm="3"></Col>
                  <Col sm="3">
                    <Button
                      variant="primary"
                      id="submit"
                      type="submit"
                      onClick={this.submitLogin}
                      disabled={!this.state.username || !this.state.password}
                    >
                      Login
                    </Button>
                  </Col>
                  &nbsp; &nbsp; &nbsp;
                  <span style={{ top: "10px" }}>
                    <Button variant="link" onClick={() => {
                      this.props.history.push(baseUrl + "/");
                    }} style={{ textDecoration: "underline" }}>
                      Cancel
                    </Button>
                  </span>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm="4"></Col>

        {this.props.currentUser !== "" ? <Redirect to="/products" /> : null}
      </div>
    );
  }
}

export default Login;
