import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies:[],
    searchCompanyByText:"",
    loading:false
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies:(state,action)=>{
      state.companies=action.payload
    },
    setSearchCompanyByText:(state,action)=>{
      state.searchCompanyByText=action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
    

  },
});

export const { setSingleCompany,loading, setCompanies, setSearchCompanyByText } = companySlice.actions;

export default companySlice.reducer;

