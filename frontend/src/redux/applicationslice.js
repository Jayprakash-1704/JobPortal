import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    allApplicants:{},
    loading:false,
    status:"pending"
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.allApplicants = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStatus:(state,action)=>{
       state.status = action.payload;
     
    }
    
    

  },
});


export const { setAllApplicants,setLoading,setStatus } = applicationSlice.actions;

export default applicationSlice.reducer;

