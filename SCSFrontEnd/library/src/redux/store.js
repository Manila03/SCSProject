import bookReducer from "./bookSlice";
import imageReducer from "./imageSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        books: bookReducer,
        image: imageReducer
    },
});

export default store;