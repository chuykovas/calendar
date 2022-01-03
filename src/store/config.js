import { configureStore } from '@reduxjs/toolkit'
import {groups} from './groups/slice'
import {auth} from "./auth/slice";

const store = configureStore({
  reducer: {
    groups,
    auth
  }
})

export default store
