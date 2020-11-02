import React from 'react'
import PropTypes from 'prop-types';

const AddFoodBtn = ({ started }) => {
  return (
    started && (
      <div className="add-food-comp-container center">
        <a 
          className="waves-effect waves-light btn modal-trigger"
          href="#add-food-item-modal"
        >
          Add Food Item
        </a>
      </div>
    )
  )
}

AddFoodBtn.propTypes = {
  started: PropTypes.bool.isRequired,
}

export default AddFoodBtn;
