import axios from "axios";

function onLogin(data) {
  return {
    type: "LOGIN",
    data
  };
}

function addToCart(itemsCount, itemsArray, totalAmount) {
  return {
    type: "ADD_TOCART",
    itemsCount,
    itemsArray,
    totalAmount
  };
}

function shownProducts(data) {
  return {
    type: "CHANGE_PRODUCTS",
    data
  };
}

function emptyCart() {
  return {
    type: "EMPTY_CART"
  };
}

function updateCheckOut(data) {
  return {
    type: "UPDATE_CART",
    data
  };
}

function updateSerchedProductsAction(products) {
 
  return {

    type: "SHOW_SEARCH_RESULTS",
    products
  };
}

function logOutClearData() {
  return {
    type: "LOGOUT"
  };
}


export function ValidateCreds(data) {
  return dispatch => {
    axios
      .get(`db/users/users.json`)
      .then(response => {
        if (
          response.data.filter(
            user =>
              user.userName === data.userName && user.password === data.password
          )[0]
        ) {
          localStorage.setItem("currentUser", data.userName);
          localStorage.setItem("itemsCount", JSON.stringify(0));
          localStorage.setItem("addedProducts", JSON.stringify([]));
          localStorage.setItem("totalAmount", JSON.stringify(0));
          dispatch(onLogin(data));
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getAllProducts(data) {
  let mobiles = [];
  let tablets = [];
  return dispatch => {
    if (data === "Tablets") {
      axios.get("db/products/tablets.json").then(response => {
        response.data.forEach(data => {
          if (data.productType === "Tablet") {
            tablets.push(data);
          }
        });
        localStorage.setItem("shownProducts", JSON.stringify(tablets));
        dispatch(shownProducts(tablets));
      });
    } else if (data === "Mobiles") {
      axios.get("db/products/tablets.json").then(response => {
        response.data.forEach(data => {
          if (data.productType === "Mobile") {
            mobiles.push(data);
          }
        });
        localStorage.setItem("shownProducts", JSON.stringify(mobiles));
        dispatch(shownProducts(mobiles));
      });
    }
  };
}

export function addItemsToCart(itemsCount, itemsArray, totalAmount) {
  return dispatch => {
    // selected items

    localStorage.setItem("addedProducts", JSON.stringify(itemsArray));
    const updatedProductsArray = JSON.parse(
      localStorage.getItem("addedProducts")
    );

    // items count

    localStorage.setItem("itemsCount", JSON.stringify(itemsCount));
    const updatedItemsCount = JSON.parse(localStorage.getItem("itemsCount"));

    // total amount

    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    const updatedTotalAmount = JSON.parse(localStorage.getItem("totalAmount"));
    dispatch(
      addToCart(updatedItemsCount, updatedProductsArray, updatedTotalAmount)
    );
  };
}

export function checkOutEmptyCart() {
  return dispatch => {
    localStorage.setItem("itemsCount", JSON.stringify(0));
    localStorage.setItem("addedProducts", JSON.stringify([]));
    localStorage.setItem("totalAmount", JSON.stringify(0));
    dispatch(emptyCart());
  };
}

export function updateCart(data) {
  return dispatch => {
    dispatch(updateCheckOut(data));
  };
}

export function logOutDetails() {
  return dispatch => {
    localStorage.clear();
    dispatch(logOutClearData());
  };
}

export function sortItemsOnSelect(sortoption) {
  return dispatch => {
    let products = JSON.parse(localStorage.getItem("shownProducts"));

    if (sortoption === "popularity") {
      products.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        } else if (a.rating < b.rating) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortoption === "pricelh") {
      products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortoption === "pricehl") {
      products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    dispatch(shownProducts(products));
  };
}


export function updateSerchedProducts(products) {

  return dispatch => {

    dispatch(updateSerchedProductsAction(products));
  };
}