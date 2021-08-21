import React, { Component } from "react";
import { Button,  Row, Table } from 'react-bootstrap'
let baseUrl = window.location.pathname.substr(
  0,
  window.location.pathname.lastIndexOf("/")
);

class CartItmes extends Component {
  constructor(props) {
    super(props);
    this.state = { submit: false };
  }
  goToProducts = () => {
    this.props.history.push(baseUrl + "/products");
  };
  goToProductsWithEmptyCart = () => {
    this.props.checkOut();
    this.props.history.push(baseUrl + "/products");
  };
  checkout = () => {
    this.props.updateCart("CheckedOut");
    this.setState({ submit: true });
  };
  updateDeletedItems = itemId => {
    let productToDelete = this.props.itemsArray.filter(
      item => item.productId === itemId
    )[0];
    let index = this.props.itemsArray.findIndex(currProduct => {
      return currProduct.productId === productToDelete.productId;
    });
    let temp = this.props.itemsArray;
    temp.splice(index, 1);
    let remainingProducts = temp;
    let remainingTotalAmount =
      this.props.totalAmount - productToDelete.priceOnQuantity;
    let remainingItemsConut = this.props.itemsCount - productToDelete.quantity;
    this.props.addToCart(
      remainingItemsConut,
      remainingProducts,
      remainingTotalAmount
    );
  };
  render() {
    let theadstyle = { textAlign: 'center', width: "20%" }
    return (
      <React.Fragment>
        {!this.state.submit ? (
          <div className="container panelpos">
            <div className="row">
              <div className="col-xs-7 col-xs-offset-3">
                <div className="panel panel-primary">
                  <div className="panel-heading">My Cart</div>
                  <div className="panel-body ">
                    {this.props.itemsArray.length !== 0 ? (

                      <Table responsive style={{ textAlign: 'center' }}>
                        <thead>
                          <tr className="tableheadercolor" >
                            <th style={theadstyle} >Product</th>
                            <th style={theadstyle} >Quantity</th>
                            <th style={theadstyle} >Price</th>
                            <th style={theadstyle}> Total Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.itemsArray.map(element => (
                            <tr key={Math.random()}>
                              <td>{element.productName}</td>
                              <td >
                                <input
                                  style={{ width: "30%" }}
                                  type="number"
                                  value={element.quantity}
                                  readOnly
                                />
                              </td>
                              <td>&#8377;{element.price}.00</td>
                              <td>&#8377;{element.priceOnQuantity}.00</td>
                              <td>
                                <Button variant="link" >
                                  <span
                                    title="Delete"
                                    className="glyphicon glyphicon-trash"
                                    onClick={() =>
                                      this.updateDeletedItems(element.productId)
                                    }
                                  ></span>
                                </Button>
                              </td>

                            </tr>
                          ))}
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <b>Total</b>
                            </td>
                            <td> <b>&#8377;{this.props.totalAmount}.00</b></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td></td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.goToProducts}
                              >
                                <span className="glyphicon glyphicon-shopping-cart"></span>{" "}
                                Continue Shopping
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.checkout}
                              >
                                Checkout
                                <span className="glyphicon glyphicon-play"></span>
                              </button>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className="container panelpos">
              <div className="row">
                <div className="col-xs-7 col-xs-offset-3">
                  <div className="panel panel-primary">
                    <div className="panel-heading"> Payment</div>

                    <div className="panel-body">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You
                      have purchased following items.Thank you for making the
                      payment.
                    <br />
                      Your order will be shipped soon...
                    <br />
                      <br />
                      {this.props.itemsArray !== 0 ? (
                        <table
                          className="table"
                          style={{ marginBottom: "0px", marginRight: "0px" }}
                        >
                          <thead>
                            <tr className="tableheadercolor">
                              <th className="center">Product</th>
                              <th className="center">Quantity</th>
                              <th className="center">Price</th>
                              <th className="center">Total Price</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.itemsArray.map(element => (
                              <tr key={Math.random()}>
                                <td>{element.productName}</td>
                                <td>{element.quantity}</td>
                                <td>&#8377;{element.price}.00</td>
                                <td>&#8377;{element.priceOnQuantity}.00</td>
                              </tr>
                            ))}
                            <tr>
                              <td></td>
                              <td></td>
                              <td>
                                Total
                              </td>
                              <td><b>&#8377;{this.props.totalAmount}.00</b></td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null}
                    </div>

                    <div
                      className="panel-footer"

                    >

                      <Row className="justify-content-md-center">
                        <Button variant="primary"

                          onClick={this.goToProductsWithEmptyCart}
                          style={{ color: "white" }}
                        >
                          <i className="glyphicon glyphicon-chevron-left"></i> Go to
                          Products Page
</Button>
                      </Row>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default CartItmes;
