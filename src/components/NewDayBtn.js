import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

const NewDayBtn = ({ 
  started,
  updateStartedState,
  updateDailyCalTotState,
  updateEatingWindowState,
  updateFoodListArrState,
  updateEndTimeState,
  updateStartTimeState,
  updateCurTimeState,
  updateTimeSinceFirstMealState
 }) => {
   const onClick = (event) => {
     event.preventDefault();
     updateStartedState();
     updateDailyCalTotState('0')
     updateEatingWindowState('0')
     updateFoodListArrState([])
     updateEndTimeState()
     updateStartTimeState()
     updateCurTimeState()
     updateTimeSinceFirstMealState('')

    axios.delete('api/foods')
      .then(res => console.log(res.data));
    
    axios.delete('api/remaining')
      .then(res => console.log(res.data));
   }

  return (
    started && (
      <div className="next-day-comp-container center">
        <button 
          className="waves-effect waves-light btn"
          onClick={onClick}
        >
          Start New Day
        </button>
      </div>
    )
  )
}

NewDayBtn.propTypes = {
  started: PropTypes.bool.isRequired,
  updateStartedState: PropTypes.func.isRequired,
  updateDailyCalTotState: PropTypes.func.isRequired,
  updateEatingWindowState: PropTypes.func.isRequired,
  updateFoodListArrState: PropTypes.func.isRequired,
  updateEndTimeState: PropTypes.func.isRequired,
  updateStartTimeState: PropTypes.func.isRequired,
  updateCurTimeState: PropTypes.func.isRequired,
  updateTimeSinceFirstMealState: PropTypes.func.isRequired,
}

export default NewDayBtn;
