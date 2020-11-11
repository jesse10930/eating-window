import React from 'react';
import PropTypes from 'prop-types';

const Remaining = ({ 
  dailyCalTot, 
  timeSinceFirstMeal, 
  started, 
  endTime, 
  foodListArr, 
  eatingWindow, 
  curTime 
}) => {
  // declare stringTime as empty string
  let stringTime = '';
  
  // runs if endTime not empty
  if (endTime) {
    // declare hour, minute, and ampm from endTime prop, then store into stringTime var as hh:mm am/pm format
    let hours = endTime.getHours();
    let minutes = endTime.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    stringTime = hours + ':' + minutes + ampm;
  }

  return (
    // run if started is true
    started && (
      <div className='container remaining-comp-container'>
        <div className="row">
          <div className="col s12">
            <div className="card teal lighten-1">
              <div className="card-content white-text center">
                {/* return finish eating by if foodListArr has at least 1 item */}
                {foodListArr.length >= 1 && (
                  <h4>Finish Eating By
                    {/* change to red text if past end time */}
                    <span className={curTime > endTime ? 'red-text text-darken-2' : ''}>  {stringTime}</span>
                  </h4>
                )}
                {/* return eating window if foodListArr has at least 2 items */}
                {foodListArr.length >= 2 && (
                  <h4>Eating Window:
                    {/* change to red text if past eating window */}
                    <span className={parseFloat(eatingWindow) < parseFloat(timeSinceFirstMeal) ? 'red-text text-darken-2' : ''}>  {timeSinceFirstMeal}</span>
                  </h4>
                )}
                <h4>Calories Remaining:
                  {/* change ro red text if past calorie goal */}
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
