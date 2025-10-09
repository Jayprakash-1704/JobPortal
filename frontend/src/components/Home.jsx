import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  // const { loading } = useSelector((store) => store.job);
const {user}=useSelector(store=>store.auth)
const navigate= useNavigate()
  useEffect(()=>{
   if (user?.role==="recruiter") {
      navigate("/admin/companies")
   }
  },[])

  return (
    <div>
      <HeroSection />
      <Categories />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
