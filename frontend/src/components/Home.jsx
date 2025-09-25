import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";

function Home() {
  // const { loading } = useSelector((store) => store.job);

  

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
