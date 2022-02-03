// Action Creators
// Person who is submitting the form
const newBooking = (name, amount) => {
  return {
    type: "NEW_BOOKING",
    payload: {
      name,
      amount,
    },
  };
};
const cancelBooking = (name, refundAmount) => {
  return {
    type: "CANCEL_BOOKING",
    payload: {
      name,
      refundAmount,
    },
  };
};

// Reducers
const reservationHistory = (oldReservationList = [], action) => {
  if (action.type === "NEW_BOOKING") {
    return [...oldReservationList, action.payload.name];
  } else if (action.type === "CANCEL_BOOKING") {
    return oldReservationList.filter((record) => {
      return record !== action.payload.name;
    });
  }

  return oldReservationList;
};
const cancellationHistory = (oldReservationList = [], action) => {
  if (action.type === "CANCEL_BOOKING") {
    return [...oldReservationList, action.payload.name];
  }

  return oldReservationList;
};
const accounting = (totalMoney = 100, action) => {
  if (action.type === "NEW_BOOKING") {
    return totalMoney + action.payload.amount;
  } else if (action.type === "CANCEL_BOOKING") {
    return totalMoney - action.payload.refundAmount;
  }

  return totalMoney;
};

// Redux Store
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
  accounting: accounting,
  reservationHistory: reservationHistory,
  cancellationHistory: cancellationHistory,
});

const store = createStore(railwayCentralStore);

// Test store
const action = newBooking("Sunny", 800);
store.dispatch(action);
store.dispatch(newBooking("Tanmay", 850));
store.dispatch(newBooking("Sandeep", 750));
store.dispatch(cancelBooking("Tanmay", 400));

console.log(store.getState());
