import React, { useState, useEffect }  from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserInput from './components/UserInput';
import Remaining from './components/Remaining';
import AddFoodBtn from './components/AddFoodBtn';
import FoodList from './components/FoodList';
import AddFoodItemModal from './components/AddFoodItemModal';
import NewDayBtn from './components/NewDayBtn';
import axios from 'axios';
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

    // check if data already entered
    Promise.all([firstApiCall(), secondApiCall()])
    .then((results) => {
      if (results[0].data.length > 0) {
        const food = results[0].data;
        const remaining = results[1].data;

        console.log(food);
        console.log(remaining);

        // foodListArr
        // started
        let tempFoodArr = [];
        Object.keys(food).forEach((entry) => {
          tempFoodArr.push([
            food[entry]['item'], 
            food[entry]['quantity'], 
            food[entry]['calories']
          ]);
        });
        updateFoodListArrState(tempFoodArr);
        updateStartedState();

        // dailyCalTot
        let tempCalTot = 0;
        Object.keys(food).forEach((entry) => {
          tempCalTot += food[entry]['calories']
        })
        updateDailyCalTotState((remaining[0]['calorieGoal'] - tempCalTot).toString());
      }
    });
    
  }, []);

  // api call to foods database
  function firstApiCall() {
    return axios.get('api/foods');
  }

  // api call to remaining database
  function secondApiCall() {
    return axios.get('api/remaining');
  }

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
     setStarted(!started);
   }

   const updateEndTimeState = (windowEnd) => {
     setEndTime(windowEnd);
   }

   const updateStartTimeState = (windowStart) => {
     setStartTime(windowStart);
   }

   const updateTimeSinceFirstMealState = (newTime) => {
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
        updateTimeSinceFirstMealState={updateTimeSinceFirstMealState}
        updateCurTimeState={updateCurTimeState}
      />
      {/* food list array state passed as props to FoodList component */}
      <FoodList foodListArr={foodListArr} started={started}/>
      <NewDayBtn 
        started={started}
        updateStartedState={updateStartedState}
        updateDailyCalTotState={updateDailyCalTotState}
        updateEatingWindowState={updateEatingWindowState}
        updateFoodListArrState={updateFoodListArrState}
        updateEndTimeState={updateEndTimeState}
        updateStartTimeState={updateStartTimeState}
        updateCurTimeState={updateCurTimeState}
        updateTimeSinceFirstMealState={updateTimeSinceFirstMealState}
      />
    </div>
  );
}

export default App;
