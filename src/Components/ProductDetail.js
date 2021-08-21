import React, { Component } from "react";
import "../assets/css/layout.css";
import Rating from "./Rating";

let baseUrl = window.location.pathname.substr(
  0,
  window.location.pathname.lastIndexOf("/")
);

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.product = {};
    let selectedId = this.props.match.params.id;
    this.props.allProducts.forEach(element => {
      if (element.productId === parseInt(selectedId)) {
        this.product = element;
      }
    });
  }
  goBack = () => {
    this.props.history.push(baseUrl + "/products");
  };

  render() {
    const imageclass = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100px",
      height: "150px"
    };

    return (
      <div className="container panelpos">
        <div className="row">
          <div className="col-xs-7 col-xs-offset-3">
            <div className="panel panel-primary">
              <div className="panel-heading">Product Detail</div>

              {this.product ? (
                <div className="panel-body ">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td align="center">
                          <img
                            src={this.product.imageUrl}
                            style={imageclass}
                            className="img-thumbnail"
                            alt={this.product.productName}
                          />
                        </td>

                        <td>
                          <div className="txtsize txtcolor">
                            {this.product.productName}
                          </div>
                          <div>by {this.product.manufacturer}</div>
                          <div>
                            <Rating rate={this.product.rating} />
                            <br />
                          </div>
                          <hr className="hrcolor" />
                          <div>Price: {this.product.price}</div>

                          <div>Description: {this.product.description}</div>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null}
              <div className="panel-footer">
                <button
                  className="btn btn-primary backbtnpos"
                  style={{ color: "white" }}
                  onClick={this.goBack}

                >
                  <i className="glyphicon glyphicon-chevron-left"></i>
                  Back
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
