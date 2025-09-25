import { Briefcase, Code, Stethoscope, PenTool, BarChart, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export default function Categories() {
  const categories = [
    { id: 1, name: "Technology", icon: <Code className="w-8 h-8 text-blue-600" />, jobs: "1200+" },
    { id: 2, name: "Business", icon: <BarChart className="w-8 h-8 text-green-600" />, jobs: "800+" },
    { id: 3, name: "Healthcare", icon: <Stethoscope className="w-8 h-8 text-red-600" />, jobs: "600+" },
    { id: 4, name: "Design", icon: <PenTool className="w-8 h-8 text-pink-600" />, jobs: "400+" },
    { id: 5, name: "Engineering", icon: <Settings className="w-8 h-8 text-purple-600" />, jobs: "700+" },
    { id: 6, name: "General", icon: <Briefcase className="w-8 h-8 text-yellow-600" />, jobs: "500+" },
  ];

  return (  
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Explore Job Categories
          </h2>
          <p className="mt-2 text-gray-600">
            Find opportunities across different fields and industries
          </p>
        </div>
        
        

        <Link>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-blue-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.jobs} Jobs</p>
            </div>
          ))}
        </div>
        </Link>
      </div>
    </section>
  );
}
