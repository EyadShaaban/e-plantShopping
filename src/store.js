import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Task: Importing your cart reducer

// Task: Create a Redux store using configureStore
const store = configureStore({
    reducer: {
        // 'cart' is the name of the slice in the store
        cart: cartReducer,
    },
});

export default store; // Task: Exporting for use in <Provider store={store}>