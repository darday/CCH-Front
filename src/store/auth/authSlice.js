import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    status:'not-authenticated',//not-authenticated , authenticated
    accessToken:null,
    uid:null,
    email:null,
    displayName:null,
    img:null,
    errorMessage:null,
  },
  reducers: {
    login:(state,{payload})=>{
      state.status='authenticated';//not-authenticated , authenticated
      state.accessToken=payload.accessToken;
      state.uid=payload.user.id;
      state.email=payload.user.email;
      state.displayName=payload.user.name;
      state.img=null;
      state.errorMessage=null;
    },
    logout:(state,payload)=>{
      state.status='not-authenticated';//not-authenticated , authenticated
      state.accessToken=null;
      state.uid=null;
      state.email=null;
      state.displayName=null;
      state.img=null;
      state.errorMessage=payload.payload.message;
    },
    checkingCredentials:(state)=>{
      state.status='checking';
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
export default authSlice.reducer




