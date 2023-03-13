import {configureStore} from "@reduxjs/toolkit"
import postReducer from "./features/postSlice.js"

const store = configureStore({
    reducer:{
        post: postReducer
    }
})

export default store;