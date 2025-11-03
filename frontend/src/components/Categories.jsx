import { Briefcase, Code, Stethoscope, PenTool, BarChart, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export default function Categories() {
  const categories = [
    { id: 1, name: "Technology", icon: <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1761591890/project-management_liozvu.png" alt="img-technology" />, jobs: "1200+" },
    { id: 2, name: "Business", icon: <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1761591890/cooperation_fnsimj.png" alt="" />, jobs: "800+" },
    { id: 3, name: "Healthcare", icon: <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1761591890/healthcare_p7sbnh.png" alt="" /> , jobs: "600+" },
    { id: 4, name: "Design", icon: <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1761591393/graphic-designer_enuyn0.png" alt="" />, jobs: "400+" },
    { id: 5, name: "Engineering", icon:<img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1761591890/engineering_tbq1mj.png" alt="" />, jobs: "700+" },
    { id: 6, name: "General", icon: <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1761591890/general_kcwbzi.png" alt="" />, jobs: "500+" },
  ];

  return (  
    <section className="py-8 bg-[var(--color-teal)] text-black ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold ">
            Explore Job Categories
          </h2>
          <p className="mt-2">
            Find opportunities across different fields and industries
          </p>
        </div>
        
        

        <Link>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-[var(--color-yellow)] rounded-2xl shadow-md p-6 flex flex-col items-center text-[var(--color-white)] text-center hover:shadow-xl transition"
            >
              <div className="mb-3 p-4 bg-white rounded-full">{category.icon}</div>
              <h3 className="text-lg font-semibold ">{category.name}</h3>
              <p className="text-sm ">{category.jobs} Jobs</p>
            </div>
          ))}
        </div>
        </Link>
      </div>
    </section>
  );
}
