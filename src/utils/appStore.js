import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice';
import requestReducer from './requestSlice';

const appStore = configureStore({
    reducer: { 
        user: userReducer ,
        feed:feedReducer,
        connection:connectionReducer,
        request:requestReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default appStore;
