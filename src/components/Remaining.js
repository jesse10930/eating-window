import React from 'react';
import PropTypes from 'prop-types';

const Remaining = 
  ({ 
    dailyCalTot, 
    timeSinceFirstMeal, 
    started, endTime, 
    foodListArr, 
    eatingWindow, 
    curTime 
  }) => {
  let stringTime = '';
  
  if (endTime) {
    let hours = endTime.getHours();
    let minutes = endTime.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    stringTime = hours + ':' + minutes + ampm;
  }

  return (
    started && (
      <div className='container remaining-comp-container'>
        <div className="row">
          <div className="col s12">
            <div className="card teal lighten-1">
              <div className="card-content white-text center">
                {foodListArr.length >= 1 && (
                  <h4>Finish Eating By
                    <span className={curTime > endTime ? 'red-text text-darken-2' : ''}>  {stringTime}</span>
                  </h4>
                )}
                {foodListArr.length >= 2 && (
                  <h4>Eating Window:
                    <span className={parseFloat(eatingWindow) < parseFloat(timeSinceFirstMeal) ? 'red-text text-darken-2' : ''}>  {timeSinceFirstMeal}</span>
                  </h4>
                )}
                <h4>Calories Remaining:
                  <span className={parseInt(dailyCalTot) < 0 ? 'red-text text-darken-2' : ''}>  {dailyCalTot}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

Remaining.propTypes = {
  dailyCalTot: PropTypes.string.isRequired,
  timeSinceFirstMeal: PropTypes.string.isRequired,
  started: PropTypes.bool.isRequired,
  endTime: PropTypes.instanceOf(Date),
  foodListArr: PropTypes.array.isRequired,
  eatingWindow: PropTypes.string.isRequired,
  curTime: PropTypes.instanceOf(Date),
}

export default Remaining
