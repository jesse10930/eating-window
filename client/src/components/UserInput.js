import React from 'react'
import PropTypes from 'prop-types';

const UserInput = ({ updateDailyCalTotState, updateEatingWindowState, updateStartedState }) => {
  const onClick = (event) => {
    event.preventDefault();

    // declare input from users
    const cals = document.getElementById('icon_food').value;
    const hours = document.getElementById('icon_clock').value;

    // regix to check for positive integer
    const isNumeric = (value) => {
      return /^\d+$/.test(value);
    }

    // check user inputs positive integer for calories and eating window
    if (cals.includes(',')) {
      window.M.toast({html: 'Refrain from using a comma for numbers in the 1000s'});
    } else if (cals.includes('.') || isNaN(cals)) {
      window.M.toast({html: 'Enter an integer value'});
    } else if (parseInt(cals) < 0) {
      window.M.toast({html: 'Enter an integer greater than 0'});
    } else if (cals === '') {
      window.M.toast({html: 'Enter calorie goal'})
    } else if (!isNumeric(hours)) {
      window.M.toast({html: 'Enter integer value eating window'})
    } else {
      // set dailyCalTot, eatingWindow, and started app level states
      updateDailyCalTotState(cals);
      updateEatingWindowState(hours);
      updateStartedState();
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
