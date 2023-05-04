import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from "./cars/cars.reducer";
import { usersReducer } from './users/users.reducer';

export default configureStore({
  reducer: {
    cars: carsReducer,
    users: usersReducer
  },
})