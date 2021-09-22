import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: { 
    session: {
    startDate: 0,
    peds: 0,
    meters:0,
    endDate: 0
  }
},
  reducers: {
    latest: (state, action) => {
      state.session = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { latest } = sessionSlice.actions

export default sessionSlice.reducer