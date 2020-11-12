import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddFoodItemModal = ({ 
  foodListArr, 
  updateFoodListArrState, 
  dailyCalTot, 
  updateDailyCalTotState, 
  updateEndTimeState, 
  eatingWindow, 
  startTime, 
  updateStartTimeState, 
  updateTimeSinceFirstMealState,
  updateCurTimeState 
}) => {
  // initializing comp level state
  const [foodItem, setFoodItem] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [calories, setCalories] = useState('');

  const onSubmit = () => {
    // regix to check for positive integer
    const isNumeric = (value) => {
      return /^\d+$/.test(value);
    }

    // check if user inputs are valid
    if (foodItem === '') {
      window.M.toast({html: 'Enter food item'});
    } else if (servingSize === '') {
      window.M.toast({html: 'Enter serving size'});
    } else if (!isNumeric(calories)) {
      window.M.toast({html: 'Enter integer value calories'});
    } else {
      // call to usda nutrional api
      // considering adding more functionality in the future, that might change the function/usability of the app though
      axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=HcOenwa6MFJRacTk7hJdn8Spf1Zud9caZWoESvZ9&query=${foodItem}&pageSize=1`)
        .then(res => console.log(res.data.foods[0].foodNutrients));

      // declare user input to array, add array to foodListArr prop and declare in new array, declare calories remaining var
      let newFoodItem = [foodItem, servingSize, calories];
      let newFoodList = foodListArr.slice().concat([newFoodItem]);
      let newCals = parseInt(dailyCalTot) - parseInt(calories);

      // declare current date, declare hour for end of eating window time, declare new date with end of eating window hour
      const curTime = new Date();
      let endHour = curTime.getHours() + parseInt(eatingWindow);
      let tempEndTime = new Date();
      tempEndTime.setHours(endHour)
      
      // add user input to foodListArr, set dailyCalTot to new calories remaining, set curTime to curren time
      updateFoodListArrState(newFoodList);
      updateDailyCalTotState(newCals.toString());
      updateCurTimeState(curTime);

      // check if this is the first food item entered, set endTime and startTime
      if (foodListArr.length === 0) {
        updateEndTimeState(tempEndTime);
        updateStartTimeState(curTime);

        // store startTime, eatingWindow, and calorieGoal in database
        axios.post('api/remaining', {
          startTime: curTime,
          eatingWindow: parseInt(eatingWindow),
          calorieGoal: parseInt(dailyCalTot)
        })
          .then(res => console.log(res.data))
      }

      // if not first food item entered, declare time elapsed since start to nearest hundredths and set timeSinceFirstMeal
      if (foodListArr.length > 0) {
        let exactHours = (((curTime - startTime)/1000)/60)/60;
        updateTimeSinceFirstMealState(exactHours.toFixed(2) + ' hours');
      }

      // store foodItem, servingSize, and calories in database
      axios.post('api/foods', {
        item: foodItem,
        quantity: servingSize,
        calories: calories
      })
        .then(res => console.log(res.data));
    }
  }

  return (
    <div id='add-food-item-modal' className='modal' style={modalStyle}>
      <div className="modal-content">
        <div className="row">
          <div className="input-field">
            {/* updated foodItem comp state on user input */}
            <input 
              type="text" 
              name='food' 
              value={foodItem} 
              onChange={event => setFoodItem(event.target.value)}
              autoComplete='off'
            />
            <label htmlFor='food' className='active'>Food Item</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            {/* update servingSize comp state on user input */}
            <input
              type="text" 
              name='serving' 
              value={servingSize} 
              onChange={event => setServingSize(event.target.value)}
              autoComplete='off'
            />
            <label htmlFor='serving' className='active'>Serving Size</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            {/* update calories comp state on user input */}
            <input 
              type="text" 
              name='calories' 
              value={calories} 
              onChange={event => setCalories(event.target.value)}
              autoComplete='off'
            />
            <label htmlFor='calories' className='active'>Calories</label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-green btn">Add</a>
      </div>
      <div className="modal-footer">
        {/* link usda nutrion information */}
        <a href="https://fdc.nal.usda.gov/index.html" rel="noreferrer" target="_blank" className="waves-effect waves-light btn">Not Sure?</a>
      </div>
    </div>
  )
}

// size modal
const modalStyle = {
  width: '50%',
  height: '60%',
};

AddFoodItemModal.propTypes = {
  foodListArr: PropTypes.array.isRequired,
  updateFoodListArrState: PropTypes.func.isRequired,
  dailyCalTot: PropTypes.string.isRequired,
  updateDailyCalTotState: PropTypes.func.isRequired,
  updateEndTimeState: PropTypes.func.isRequired,
  eatingWindow: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(Date),
  updateStartTimeState: PropTypes.func.isRequired,
  updateTimeSinceFirstMealState: PropTypes.func.isRequired,
  updateCurTimeState: PropTypes.func.isRequired,
}

export default AddFoodItemModal;