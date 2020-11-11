import React, { useState, useEffect }  from 'react';
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

  // useEffect hook runs once upon initial mount
  useEffect(() => {
    // Initialize Materialize JS
    window.M.AutoInit();

    // check if data already entered
    Promise.all([firstApiCall(), secondApiCall()])
    .then((results) => {
      // get results of both api calls, update state if db has values
      if (results[0].data.length > 0) {
        const food = results[0].data;
        const remaining = results[1].data;

        // set foodListArr state
        let tempFoodArr = [];
        Object.keys(food).forEach((entry) => {
          tempFoodArr.push([
            food[entry]['item'], 
            food[entry]['quantity'], 
            food[entry]['calories']
          ]);
        });
        updateFoodListArrState(tempFoodArr);

        // set started state
        updateStartedState();

        // set dailyCalTot state
        let tempCalTot = 0;
        Object.keys(food).forEach((entry) => {
          tempCalTot += food[entry]['calories']
        })
        updateDailyCalTotState((remaining[0]['calorieGoal'] - tempCalTot).toString());

        // set eatingWindow state
        updateEatingWindowState(remaining[0]['eatingWindow'].toString())

        // set curTime state
        updateCurTimeState(new Date());

        // set startTime state
        updateStartTimeState(new Date(remaining[0]['startTime']));

        // set timeSinceFirstMeal state
        let now = new Date();
        let curTimeStr = Date.parse(now);
        let start = new Date(remaining[0]['startTime']);
        let startTimeStr = Date.parse(start);
        updateTimeSinceFirstMealState(((((curTimeStr - startTimeStr)/1000)/60)/60).toFixed(2) + ' hours')

        // set endTime state
        let endHour = start.getHours() + remaining[0]['eatingWindow'];
        let tempEndTime = new Date(remaining[0]['startTime']);
        tempEndTime.setHours(endHour);
        updateEndTimeState(tempEndTime);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // api call to foods database
  function firstApiCall() {
    return axios.get('api/foods');
  }

  // api call to remaining database
  function secondApiCall() {
    return axios.get('api/remaining');
  }

   // change dailyCalTot state
   const updateDailyCalTotState = (userCalTot) => {
     setDailyCalTot(userCalTot);
   }

   // change eatingWindow state 
   const updateEatingWindowState = (userEatingWindow) => {
     setEatingWindow(userEatingWindow);
   }

  //  change foodListArr state
   const updateFoodListArrState = (foodItem) => {
     setFoodListArr(foodItem);
   }

  //  change started state
   const updateStartedState = () => {
     setStarted(!started);
   }

  //  change endTime state
   const updateEndTimeState = (windowEnd) => {
     setEndTime(windowEnd);
   }

  //  change startTime state
   const updateStartTimeState = (windowStart) => {
     setStartTime(windowStart);
   }

  //  change timeSinceFirstMeal state
   const updateTimeSinceFirstMealState = (newTime) => {
     setTimeSinceFirstMeal(newTime);
   }

  //  change curTime state
   const updateCurTimeState = (now) => {
     setCurTime(now);
   }

  return (
    <div className="App">
      {/* UserInput comp resceives and stores data from user */}
      {!started && (
        <UserInput 
          updateDailyCalTotState={updateDailyCalTotState}
          updateEatingWindowState={updateEatingWindowState}
          updateStartedState={updateStartedState}
        />
      )}
      {/* Remaining comp displays inormation about calories and time based on user input */}
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
      {/* AddFoodBtn comp launches a modal */}
      <AddFoodBtn started={started}/>
      {/* AddFoodItemModal comp is a modal that accepts and stores food input from user and updates state based on that input */}
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
      {/* FoodList comp displays the food items entered by user */}
      <FoodList foodListArr={foodListArr} started={started}/>
      {/* NewDayBtn clears the state and returns user to user input page */}
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
