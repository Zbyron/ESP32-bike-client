import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../features/session/sessionSlice'
import currentScreenReducer from '../features/appData/appDataSlice'
export default configureStore({
  reducer: {
    session: sessionReducer,
    currentScreen: currentScreenReducer,
  },
})