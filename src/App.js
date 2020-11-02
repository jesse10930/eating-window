import React, { useState, useEffect }  from 'react';
import UserInput from './components/UserInput';
import Remaining from './components/Remaining';
import AddFoodBtn from './components/AddFoodBtn';
import FoodList from './components/FoodList';
import AddFoodItemModal from './components/AddFoodItemModal';
import './App.css';

const  App = () => {
  // initializing state
   const [dailyCalTot, setDailyCalTot] = useState('0');
   const [eatingWindow, setEatingWindow] = useState('0');
   const [foodListArr, setFoodListArr] = useState([]);
   const [started, setStarted] = useState(false);
   const [endTime, setEndTime] = useState('');

   useEffect(() => {
     // Init Materialize JS
     window.M.AutoInit();
   });

   // change dailyCalTot state when user inputs value
   const updateDailyCalTotState = (userCalTot) => {
     setDailyCalTot(userCalTot);
   }

   const updateEatingWindowState = (userEatingWindow) => {
     setEatingWindow(userEatingWindow);
   }

   const updateFoodListArrState = (foodItem) => {
     setFoodListArr(foodItem);
   }

   const updateStartedState = () => {
     setStarted(true);
   }

   const updateEndTimeState = (windowEnd) => {
     setEndTime(windowEnd);
   }

  return (
    <div className="App">
      {/* daily calorie total set function and eating window set function passed as props to userinput component */}
      {!started && (
        <UserInput 
          updateDailyCalTotState={updateDailyCalTotState}
          updateEatingWindowState={updateEatingWindowState}
          updateStartedState={updateStartedState}
          updateEndTimeState={updateEndTimeState}
        />
      )}
      {/* daily calorie total state and eating window state passed as props to remaining component */}
      <Remaining 
        dailyCalTot={dailyCalTot} 
        eatingWindow={eatingWindow}
        started={started}
        endTime={endTime}
      />
      <AddFoodBtn started={started}/>
      <AddFoodItemModal 
        foodListArr={foodListArr} 
        updateFoodListArrState={updateFoodListArrState}
        updateDailyCalTotState={updateDailyCalTotState}
        dailyCalTot={dailyCalTot}
      />
      {/* food list array state passed as props to FoodList component */}
      <FoodList foodListArr={foodListArr} started={started}/>
    </div>
  );
}

export default App;
