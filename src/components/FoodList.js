import React from 'react'
import PropTypes from 'prop-types';

const FoodList = ({ foodListArr, started }) => {
  return (
    started && (
      <div className="container food-list-comp-container">
        <ul className="collection with-header">
          <li className="collection-header center"><h4>Food Items</h4></li>
          {foodListArr.map((food, index) => (
            <li className="collection-item center" key={index}>{food}</li>
          ))}
        </ul>
      </div>
    )
  )
}

FoodList.protoTypes = {
  foodListArr: PropTypes.array.isRequired,
  started: PropTypes.bool.isRequired,
}

export default FoodList;
