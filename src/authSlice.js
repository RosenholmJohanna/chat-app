import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwtToken: localStorage.getItem('jwtToken') || '',
  user: JSON.parse(localStorage.getItem('user')) || '', 
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.jwtToken = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('jwtToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user)); 
    },

    logout: (state) => {
      state.jwtToken = '';
      state.user = ''; 
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user'); 
    },
  },
});

export const { login, logout } = authSlice.actions;

// selectors
export const selectAuthToken = (state) => state.auth.jwtToken;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;


// export const selectAuthToken = (state) => {
//     return (
//         state.auth.jwtToken
//     )
// } 