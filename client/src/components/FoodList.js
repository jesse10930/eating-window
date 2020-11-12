import React from 'react'
import PropTypes from 'prop-types';

const FoodList = ({ foodListArr, started }) => {
  return (
    // run if started is true
    started && (
      <div className="container food-list-comp-container">
        <ul className="collection with-header">
          {/* map through foodListArr prop, return a list item for each entry */}
          {foodListArr.map((food, index) => (
            <li className="collection-item center" key={index}>
              <div className='row'>
                <div className='col s4'><h6>{food[0]}</h6></div>
                <div className='col s4'><h6>{food[1]}</h6></div>
                <div className='col s4'><h6>{food[2]}</h6></div>
              </div>
            </li>
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
