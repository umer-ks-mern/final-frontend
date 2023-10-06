import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: localStorage.getItem("user_email") || "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state,action) => {


      state.email = action.payload;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setEmail} = authSlice.actions

export default authSlice.reducer