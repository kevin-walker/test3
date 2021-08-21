import React, { Component } from "react";
class Rating extends Component {
  range = [1, 2, 3, 4, 5];
  ratingStarArray = [];
  render() {
    this.ratingStarArray = [];
    this.range.forEach(r => {
      if (r < this.props.rate) {
        this.ratingStarArray.push(
          <span key={Math.random()}>
            <i
              className=" glyphicon glyphicon-star"
              style={{ color: "#ff8040" }}
            ></i>
          </span>
        );
      } else {
        this.ratingStarArray.push(
          <span key={Math.random()}>
            <i
              className=" glyphicon glyphicon-star-empty "
              style={{ color: "#ff8040" }}
            ></i>
          </span>
        );
      }
    });

    return this.ratingStarArray.length > 0 ? this.ratingStarArray : null;
  }
}

export default Rating;
