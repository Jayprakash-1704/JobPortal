import { createSlice } from "@reduxjs/toolkit";

 const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    appliedJobs: [],
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
      state.loading = action.payload; // true/false
    },
    

  },
});

export const { setAllJobs,setLoading,setAppliedJobs } = jobSlice.actions;

export default jobSlice.reducer;

