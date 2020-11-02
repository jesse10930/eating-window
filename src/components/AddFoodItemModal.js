import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddFoodItemModal = ({ foodListArr, updateFoodListArrState, dailyCalTot, updateDailyCalTotState }) => {
  const [foodItem, setFoodItem] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [calories, setCalories] = useState('');

  const onSubmit = () => {
    let newFoodItem = [foodItem, servingSize, calories];
    let newFoodList = foodListArr.slice().concat([newFoodItem]);
    let newCals = parseInt(dailyCalTot) - parseInt(calories);
    
    updateFoodListArrState(newFoodList);
    updateDailyCalTotState(newCals.toString());
  }

  return (
    <div id='add-food-item-modal' className='modal' style={modalStyle}>
      <div className="modal-content">
        <div className="row">
          <div className="input-field">
            <input 
              type="text" 
              name='food' 
              value={foodItem} onChange={event => setFoodItem(event.target.value)}
              autoComplete='off'
            />
            <label htmlFor='food' className='active'>Food Item</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
          <input 
              type="text" 
              name='serving' 
              value={servingSize} onChange={event => setServingSize(event.target.value)}
              autoComplete='off'
            />
            <label htmlFor='serving' className='active'>Serving Size</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
          <input 
              type="text" 
              name='calories' 
              value={calories} onChange={event => setCalories(event.target.value)}
              autoComplete='off'
            />
            <label htmlFor='calories' className='active'>Calories</label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-green btn">Add</a>
      </div>
    </div>
  )
}

const modalStyle = {
  width: '50%',
  height: '55%',
};

AddFoodItemModal.propTypes = {
  foodListArr: PropTypes.array.isRequired,
  updateFoodListArrState: PropTypes.func.isRequired,
  dailyCalTot: PropTypes.string.isRequired,
  updateDailyCalTotState: PropTypes.func.isRequired,
}

export default AddFoodItemModal;