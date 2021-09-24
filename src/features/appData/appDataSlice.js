import { createSlice } from '@reduxjs/toolkit'

export const appDataSlice = createSlice({
  name: 'appData',
  initialState: { 
    appData: {
      currentScreen: '',
  }
},
  reducers: {
    currentScreen: (state, action) => {
      state.appData.currentScreen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { currentScreen } = appDataSlice.actions

export default appDataSlice.reducer