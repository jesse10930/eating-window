import React, { useState }  from 'react';
import UserInput from './components/UserInput';
import './App.css';

const  App = () => {
  // initializing state
   const [dailyCalTot, setDailyCalTot] = useState(0);
   const [eatingWindow, setEatingWindow] = useState(0);

   // change dailyCalTot state when user inputs value
   const updateDailyCalTotState = (userCalTot) => {
     setDailyCalTot(userCalTot);
   }

   const updateEatingWindowState = (userEatingWindow) => {
     setEatingWindow(userEatingWindow);
   }

  return (
    <div className="App">
      {/* daily calorie total state and set function passed as props to userinput component */}
      <UserInput 
        updateDailyCalTotState={updateDailyCalTotState}
        updateEatingWindowState={updateEatingWindowState}
      />
      <h1>
        {dailyCalTot}
        <br></br>
        {eatingWindow}
      </h1>
    </div>
  );
}

export default App;
