"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    title: "Gaming UI Designer",
    company: "Rockstar Games",
    logo: "/jobs/1.png",
    location: "El Mansoura, Egypt",
    postedTime: "10 days ago",
    experience: "0 - 3y of exp",
    type: "Full-time",
    workMode: "Remote",
    category: "Creative / Design    -   IT / Software development  -  Gaming ",
  },
  {
    id: 2,
    title: "Senior UX UI Designer",
    company: "Egabi",
    logo: "/jobs/2.png",
    location: "Cairo, Egypt",
    postedTime: "month ago",
    experience: "0 - 3y of exp",
    type: "Full-time",
    workMode: "Hybrid",
    category: "Creative / Design    -   IT / Software development ",
  },
  {
    id: 3,
    title: "Gaming UI designer",
    company: "Rockstar Games",
    logo: "/jobs/3.png",
    location: "Cairo, Egypt",
    postedTime: "month ago",
    experience: "5 - 7y of exp",
    type: "Freelance",
    workMode: "Remote",
    category: "Creative / Design    -   IT / Software development ",
  },
  {
    id: 4,
    title: "Gaming UI Designer",
    company: "Rockstar Games",
    logo: "/jobs/1.png",
    location: "El Mansoura, Egypt",
    postedTime: "10 days ago",
    experience: "0 - 3y of exp",
    type: "Full-time",
    workMode: "Remote",
    category: "Creative / Design    -   IT / Software development  -  Gaming ",
  },
  {
    id: 5,
    title: "Senior UX UI Designer",
    company: "Egabi",
    logo: "/jobs/2.png",
    location: "Cairo, Egypt",
    postedTime: "month ago",
    experience: "0 - 3y of exp",
    type: "Full-time",
    workMode: "Hybrid",
    category: "Creative / Design    -   IT / Software development ",
  },
  {
    id: 6,
    title: "Gaming UI designer",
    company: "Rockstar Games",
    logo: "/jobs/3.png",
    location: "Cairo, Egypt",
    postedTime: "month ago",
    experience: "5 - 7y of exp",
    type: "Freelance",
    workMode: "Remote",
    category: "Creative / Design    -   IT / Software development ",
  },
];

export function MainContent() {
  const [sorting, setSorting] = useState("top-match");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Banner */}
      <div className="bg-green-500 text-white p-4 flex justify-between items-center rounded-t-lg">
        <div>
          <h1 className="text-xl font-bold">UI Designer in Egypt</h1>
          <p className="text-sm">70 job positions</p>
        </div>
        <div className="flex items-center gap-2">
          <span>Set alert:</span>
          <Switch id="alert" />
        </div>
      </div>

      {/* Sorting and Filters */}
      <div className="flex justify-end mb-4">
        <Select value={sorting} onValueChange={setSorting}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top-match">Top match</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="salary-high">Highest Salary</SelectItem>
            <SelectItem value="salary-low">Lowest Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {currentJobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-lg shadow-md">
            {/* Logo and Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={70}
                  height={70}
                  className="rounded object-cover"
                />
                <div>
                <h3 className="font-dm-sans font-medium text-[25px] leading-[150%] text-[#161616] flex items-center">
  {job.title}
</h3>
                  <p className="font-dm-sans font-bold text-[17px] leading-[24px] text-[#14A077] flex items-center">
  {job.company}
</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 focus:outline-none">
                <i className="fas fa-heart"></i>
              </button>
            </div>

            <div className="mt-2 text-sm text-gray-600 flex items-center">
  <Image src="/4.png" alt="Location Icon" width={16} height={16} className="w-4 h-4 mr-1" />
  <span>{job.location}</span>
  <span className="mx-2">•</span>
  <i className="fas fa-calendar-alt mr-1"></i>
  <span>{job.postedTime}</span>
</div>


            {/* Experience, Type, Work Mode */}
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary">{job.experience}</Badge>
              <Badge variant="secondary">{job.type}</Badge>
              <Badge variant="secondary">{job.workMode}</Badge>
            </div>

            {/* Divider */}
            <hr className="my-4 border-gray-200" />

            {/* Categories */}
            <div className="text-sm text-gray-600">
              <p>
                {job.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 mx-1 rounded border border-gray-300 bg-white disabled:opacity-50"
  >
    &lt;
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={`px-3 py-1 mx-1 rounded border border-gray-300 ${
        pageNumber === currentPage ? "bg-green-500 text-white" : "bg-white text-gray-800"
      }`}
    >
      {pageNumber}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 mx-1 rounded border border-gray-300 bg-white disabled:opacity-50"
  >
    &gt;
  </button>
        
      </div>
    
  );
}