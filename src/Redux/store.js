import {configureStore} from "@reduxjs/toolkit"
import appConfigSlice from "./appConfigSlice"
import postSlice from "./postSlice"
import feedSlice from "./feedSlice"
export default configureStore({
    reducer:{
        appConfigReducer:appConfigSlice,
        postSlice,
        feedSlice 
    }

})