import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  email:{
    type:String,
    required:true
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true   
  },
});
const Company = mongoose.model("Company", companySchema);
 
export default Company;