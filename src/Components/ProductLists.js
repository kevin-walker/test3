import React, { Component } from "react";

import { Navbar, Nav, Button, Card, Col, CardGroup ,Carousel } from "react-bootstrap";
import Rating from "./Rating";

import "../assets/css/layout.css";
import "./../assets/css/bootstrap.css";

let baseUrl = window.location.pathname.substr(
  0,
  window.location.pathname.lastIndexOf("/")
);

class ProductLists extends Component {
  constructor(props) {
    super(props);

    if (this.props.cameBackFrom === "CheckedOut") {
      this.props.updateCart();
    }
    this.itemsConut = Number(localStorage.getItem("itemsCount"));
    this.selecteditemsArray = JSON.parse(localStorage.getItem("addedProducts"));
    this.totalAmount = Number(localStorage.getItem("totalAmount"));
    this.classTab1 = "tabpos tabposSelected";
    this.classTab2 = "tabpos";
    this.state = {
      manufacturers: [
        { id: "Samsung", checked: false },
        { id: "Microsoft", checked: false },
        { id: "Apple", checked: false },
        { id: "Micromax", checked: false }
      ],
      os: [
        { id: "Android", checked: false },
        { id: "Windows", checked: false },

        { id: "iOS", checked: false }
      ],
      price_range: [
        { id: "3000-5000", checked: false },
        { id: "13000-15000", checked: false },
        { id: "19000-35000", checked: false },
        { id: "40000-70000", checked: false }
      ],
      searchtext: ''
    };
  }

  componentDidMount() {
    this.props.getAllProducts("Tablets");
    document.getElementById("login").style.display = "";
    document.getElementById("login").innerHTML = "Logout";
    sessionStorage.setItem("loginTitle", "Logout");
    document.getElementById("welcome").style.display = "";
    document.getElementById("welcome").style.color = "#ff0080";

    document.getElementById("welcome").innerHTML =
      "Welcome " +
      localStorage
        .getItem("currentUser")
        .substr(0, 1)
        .toUpperCase() +
      localStorage.getItem("currentUser").substr(1);
  }

  tabSelect = selected => {
    if (selected === "Tablets") {
      this.classTab1 = "tabpos tabposSelected";
      this.classTab2 = "tabpos";
    } else {
      this.classTab1 = "tabpos";
      this.classTab2 = "tabpos tabposSelected";
    }
    this.props.getAllProducts(selected);
  };

  showProductDetail = id => {
    this.props.history.push(baseUrl + "/productsDetail/" + id);
  };


  addToCart = itemId => {
    this.selecteditemsArray = this.props.itemsArray;
    this.props.allProducts.forEach(element => {
      if (element.productId === parseInt(itemId)) {
        this.product = element;
      }
    });
    this.itemsConut += 1;

    // checking whether already existing
    let Pexistance = this.props.itemsArray.filter(items => {
      return items.productId === itemId;
    })[0];

    // if already existing find index
    if (Pexistance !== undefined) {
      let index = this.props.itemsArray.findIndex(currProduct => {
        return currProduct.productId === itemId;
      });
      this.selecteditemsArray[index].quantity += 1;
      this.selecteditemsArray[index].priceOnQuantity =
        this.selecteditemsArray[index].price *
        this.selecteditemsArray[index].quantity;
      this.totalAmount += this.selecteditemsArray[index].price;
    } else {
      this.product.quantity = 1;
      this.product.priceOnQuantity = this.product.quantity * this.product.price;
      this.totalAmount += this.product.price;
      this.selecteditemsArray.push(this.product);
    }

    this.props.addToCart(
      this.itemsConut,
      this.selecteditemsArray,
      this.totalAmount
    );
  };
  showCart = () => {
    this.props.history.push(baseUrl + "/cartItems");
  };
  searchtextSave = (e) => {
    this.setState({ searchtext: e.target.value })
  }

  searchtext = () => {

    let products = JSON.parse(localStorage.getItem("shownProducts"));

    if (products.length > 0) {
      let serchedProducts = products.filter((product) =>
        product.manufacturer.toLowerCase().indexOf(this.state.searchtext) !== -1);

      this.props.updateView(serchedProducts);
    }




  }
  sortOption = e => {
    let sortoption = e.target.value;
    this.props.sortItems(sortoption);

  };
  render() {
    const imageclass = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "70px",

      height: "110px"
    };

    return (
      <React.Fragment>
        <div style={{ padding: "0px 30px 0px 0px" }}>
          <Navbar fixed="top" style={{ marginBottom: 0 }}>
            <Nav className="mr-auto">
              <Nav style={{ fontSize: "0.5cm", color: "grey" }}>
                mCart&nbsp;
              </Nav>

              <Nav style={{ color: "#ff0080" }}>
                <span
                  className="glyphicon glyphicon-shopping-cart"
                  style={{ fontSize: "24px" }}
                ></span>
              </Nav>
            </Nav>
            <Nav>
              <Nav
                style={{ color: "#ff0080", width: "100%" }}
              >

                <button type="link"
                  className="btn btn-link"
                  style={{ color: "#ff0080" }}
                  id="cartItemsCount"
                  onClick={this.showCart}
                >
                  <span className="glyphicon glyphicon-shopping-cart"></span>
                  &nbsp;{this.itemsConut} items</button>

                <span id="totalAmount" style={{ padding: "8px 0px 0px 0px" }}>, &#8377;{this.totalAmount}.00 </span>
              </Nav>

              <input
                type="text"
                className="form-control"
                placeholder="Search"
                name="q"
                onChange={this.searchtextSave}
              />
              <div className="input-group-btn">
                <button className="btn btn-default" onClick={this.searchtext}>
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </Nav>
          </Navbar>
        </div>
        <hr style={{ marginTop: "0", marginBottom: "6px" }} />

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="db/imgs/carousel_smart_phone.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="db/imgs/carousel1.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="db/imgs/tablet_blue_stylus.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <div className="panel with-nav-tabs noborder">
          <div className="panel-heading noborder bgcolor-tab">
            <ul className="nav nav-tabs noborder">
              <li className={this.classTab1}>
                <div

                  data-toggle="tab"
                  onClick={() => this.tabSelect("Tablets")}
                >
                  <i className="fa fa-tablet  fa-3x" aria-hidden="true"></i>
                  <p>Tablets</p>
                </div >
              </li>
              <li className={this.classTab2}>
                <div

                  data-toggle="tab"
                  onClick={() => this.tabSelect("Mobiles")}
                >
                  <i className="fa fa-mobile  fa-3x" aria-hidden="true"></i>
                  <p>Mobiles</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="panel-body">
            <div style={{ padding: "0 0 100px 0" }}>
              {/* 
                            <Dropdown as={ButtonGroup}>
                                <Button variant="default">Filter</Button>

                                <Dropdown.Toggle split variant="default" id="dropdown-split-basic" style={{ 'color': '#ff0080' }} />

                                <Dropdown.Menu id='dropdown-multiple'>

                                    <div className="row vertical-divider" style={{ "marginTop": "30px" }}>
                                        <div className="col-xs-4"><Col ><h4>Manufacturer</h4>
                                            {this.state.manufacturers.map((element) => <Dropdown.Item key={Math.random()}><input type="checkbox" value={element.id} onChange={() => this.handleChangeChk("manufacturers", element)} />{element.id} </Dropdown.Item>)}
                                        </Col></div>
                                        <div className="col-xs-4"><Col ><h4>OS</h4>
                                            {this.state.os.map((element) => <Dropdown.Item key={Math.random()}><input type="checkbox" value={element} onChange={() => this.handleChangeChk("os", element.id)} />{element.id}</Dropdown.Item>)}
                                        </Col></div>
                                        <div className="col-xs-4">
                                            <Col><h4>Price</h4>
                                                {this.state.price_range.map((element) => <Dropdown.Item key={Math.random()}><input type="checkbox" value={element.id} onChange={() => this.handleChangeChk("price_range", element)} />{element.id}</Dropdown.Item>)}
                                            </Col></div>
                                    </div>
                                </Dropdown.Menu>


                            </Dropdown> */}

              <div className="pull-right">
                <span>Sort By </span>
                <select defaultValue="" onChange={this.sortOption}>
                  <option value="" disabled></option>
                  <option value="popularity">Popularity</option>
                  <option value="pricelh">Price - Low to High</option>
                  <option value="pricehl">Price - High to Low</option>
                </select>
              </div>
            </div>

            <div className="tab-content">
              <div className="tab-pane fade in active" id="tabprimary">
                {this.props.allProducts.length > 0 ? (
                  <React.Fragment>
                    <CardGroup>
                      {this.props.allProducts.map(product => (
                        <Col xs={3} key={product.productId}>
                          <Card
                            className="text-center"
                            style={{ borderColor: "#ededed" }}
                          >
                            <Card.Img
                              variant="top"
                              src={product.imageUrl}
                              style={imageclass}
                            />
                            <Card.Body>
                              <Card.Title>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    this.showProductDetail(product.productId)
                                  }
                                >
                                  {product.productName}
                                </Button>
                              </Card.Title>
                              <Card.Text>&#8377;{product.price}.00</Card.Text>

                              <Rating rate={product.rating} />
                              <br />
                              <Button
                                variant="primary"
                                onClick={() =>
                                  this.addToCart(product.productId)
                                }
                              >
                                Add to Cart
                              </Button>
                            </Card.Body>
                          </Card>
                          <br />
                          <br />
                        </Col>
                      ))}
                    </CardGroup>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductLists;
