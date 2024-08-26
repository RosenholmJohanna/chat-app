import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  jwtToken: sessionStorage.getItem('jwtToken') || '',
  user: JSON.parse(sessionStorage.getItem('user')) || '', 
};


const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login: (state, action) => {
      state.jwtToken = action.payload.token;
      state.user = action.payload.user;
      sessionStorage.setItem('jwtToken', action.payload.token);
      sessionStorage.setItem('user', JSON.stringify(action.payload.user)); 
    },

    logout: (state) => {
      state.jwtToken = '';
      state.user = 'null'; 
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('user'); 
      
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user'); 
    },
    
    updateUserInfo: (state, action) => {
      console.log('Before update:', state.user);
      state.user = {
        ...state.user,
        ...action.payload,
      };
      sessionStorage.setItem('user', JSON.stringify(state.user)); 
    },
  },
});

export const { login, logout, updateUserInfo } = authSlice.actions;

// selectors
export const selectAuthToken = (state) => state.auth.jwtToken;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;


// export const selectAuthToken = (state) => {
//     return (
//         state.auth.jwtToken
//     )
// } 