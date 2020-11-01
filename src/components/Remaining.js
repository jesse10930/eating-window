import React from 'react';
import PropTypes from 'prop-types';

const Remaining = ({ dailyCalTot, eatingWindow }) => {
  return (
    <div className='container remaining-comp-container'>
      <div className="row">
        <div className="col s12">
          <div className="card teal lighten-1">
            <div className="card-content white-text center">
              <h4>Eating Window:  {eatingWindow} hours</h4>
              <h4>Calories Remaining:  {dailyCalTot}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Remaining.propTypes = {
  dailyCalTot: PropTypes.string.isRequired,
  eatingWindow: PropTypes.string.isRequired,
}

export default Remaining
