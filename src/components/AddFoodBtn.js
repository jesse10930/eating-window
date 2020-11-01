import React from 'react'

const AddFoodBtn = () => {
  return (
    <div className="add-food-comp-container center">
      <a 
        className="waves-effect waves-light btn modal-trigger"
        href="#add-food-item-modal"
      >
        Add Food Item
      </a>
    </div>
  )
}

export default AddFoodBtn;
