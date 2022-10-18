import { configureStore } from '@reduxjs/toolkit'
import ReposReducer from './Features/ReposApi/ReposApiSlice'
const store = configureStore({
  reducer: {
    repos: ReposReducer,
  },
})

export default store