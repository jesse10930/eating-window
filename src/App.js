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
   const [endTime, setEndTime] = useState();
   const [startTime, setStartTime] = useState();
   const [curTime, setCurTime] = useState();
   const [timeSinceFirstMeal, setTimeSinceFirstMeal] = useState('')

   useEffect(() => {
     // Initialize Materialize JS
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

   const updateStartTimeState = (windowStart) => {
     setStartTime(windowStart);
   }

   const updateSetTimeSinceFirstMealState = (newTime) => {
     setTimeSinceFirstMeal(newTime);
   }

   const updateCurTimeState = (now) => {
     setCurTime(now);
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
        timeSinceFirstMeal={timeSinceFirstMeal}
        started={started}
        endTime={endTime}
        foodListArr={foodListArr}
        eatingWindow={eatingWindow}
        curTime={curTime}
        startTime={startTime}
      />
      <AddFoodBtn started={started}/>
      <AddFoodItemModal 
        foodListArr={foodListArr} 
        updateFoodListArrState={updateFoodListArrState}
        updateDailyCalTotState={updateDailyCalTotState}
        dailyCalTot={dailyCalTot}
        updateEndTimeState={updateEndTimeState}
        eatingWindow={eatingWindow}
        startTime={startTime}
        updateStartTimeState={updateStartTimeState}
        updateSetTimeSinceFirstMealState={updateSetTimeSinceFirstMealState}
        updateCurTimeState={updateCurTimeState}
      />
      {/* food list array state passed as props to FoodList component */}
      <FoodList foodListArr={foodListArr} started={started}/>
    </div>
  );
}

export default App;
