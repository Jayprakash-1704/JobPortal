import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";

export default function Filters({ filter, setFilter }) {
  return (
    <aside className="md:col-span-1 bg-blue-200 p-4 rounded-2xl w-auto h-90">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Job Type */}
      <div className="mb-4">
        <label className=" mb-3 block text-sm font-medium">Job Type</label>
        <Select
          value={filter.type}
          onValueChange={(value) => setFilter({ ...filter, type: value })}
        >
          <SelectTrigger className="w-[180px] bg-white text-gray-800 border border-gray-300 rounded-md ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Full-time">Full-Time</SelectItem>
            <SelectItem value="Part-time">Part-Time</SelectItem>
            <SelectItem value="Internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="mb-3 block text-sm font-medium">Categories</label>
        <Select
          value={filter.category}
          onValueChange={(value) => setFilter({ ...filter, category: value })}
        >
          <SelectTrigger className="w-[180px] bg-white text-gray-800 border border-gray-300 rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
            <SelectItem value="Management">Management</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Business Administration">
              Business Administration
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* // category// */}

      <div className="mb-4">
        <label className="mb-3 block text-sm font-medium">Location</label>
        <Select
          value={filter.location}
          onValueChange={(value) => setFilter({ ...filter, location: value })}
        >
          <SelectTrigger className="w-[180px] bg-white text-gray-800 border border-gray-300 rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
            <SelectItem value="Bangaluru">Bengaluru</SelectItem>
            <SelectItem value="Chennai">Chennai</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Hydrabad">Hydrabad</SelectItem>
            <SelectItem value="Indore">Indore</SelectItem>
            <SelectItem value="Kolkata">Kolkata</SelectItem>
            <SelectItem value="Lucknow">Lucknow</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Noida">Noida</SelectItem>
            <SelectItem value="Pune">Pune</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
