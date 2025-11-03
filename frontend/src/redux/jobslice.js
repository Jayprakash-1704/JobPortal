import { createSlice } from "@reduxjs/toolkit";

 const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    allAdminJobs:[],
    appliedJobs: [],
    searchJobByText:"",
    loading:false,
    
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
      state.loading = false;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
      state.loading = false;
    },
     setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllAdminJobs:(state,action)=>{
      state.allAdminJobs=action.payload;
    },
     setSearchJobByText:(state,action)=>{
      state.searchJobByText=action.payload
    }
    

  },
});

export const { setAllJobs,setLoading,setAppliedJobs,setAllAdminJobs,setSearchJobByText } = jobSlice.actions;

export default jobSlice.reducer;

