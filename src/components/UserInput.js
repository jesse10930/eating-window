import React from 'react'
import PropTypes from 'prop-types';

const UserInput = ({ updateDailyCalTotState, updateEatingWindowState, updateStartedState, updateEndTimeState }) => {
  const onClick = (event) => {
    event.preventDefault();

    const cals = document.getElementById('icon_food').value;
    const hours = document.getElementById('icon_clock').value;

    const curTime = new Date();
    let endHour = curTime.getHours() + parseInt(hours);

    let endMinute = (curTime.getMinutes() < 10)
      ? ('0' + curTime.getMinutes().toString()) 
      : (curTime.getMinutes().toString());

    let windowEnd = (endHour < 12)
      ? (endHour.toString() + ':' + endMinute + 'am')
      : (endHour === 12)
      ? (endHour.toString() + ':' + endMinute + 'pm')
      : ((endHour - 12).toString() + ':' + endMinute + 'pm');
    

    // check if cals is an integer
    // check if cals is filled in
    // check if eating window is filled in
    if (cals.includes(',')) {
      window.M.toast({html: 'Refrain from using a comma if number is greater than 1,000'});
    } else {
      updateDailyCalTotState(cals);
      updateEatingWindowState(hours);
      updateStartedState();
      updateEndTimeState(windowEnd);
    }
  }

  return (
    <div className='container user-input-comp-container'>
      <div className="row">
        <form className="col s12" autoComplete='off'>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">local_pizza</i>
              <input id="icon_food" type="text" className="validate" name='calorie-goal'></input>
              <label htmlFor="icon_food">Daily Calorie Goal</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">access_time</i>
              <input id="icon_clock" type="tel" className="validate" name='window-length'></input>
              <label htmlFor="icon_clock">Eating Window Length</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light col offset-s5" type="submit" name="action" onClick={onClick}>Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  )
}

UserInput.propTypes = {
  updateDailyCalTotState: PropTypes.func.isRequired,
  updateEatingWindowState: PropTypes.func.isRequired,
  updateStartedState: PropTypes.func.isRequired,
}

export default UserInput
