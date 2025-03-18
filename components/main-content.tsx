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
import { Heart } from "lucide-react";

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
    title: "React Frontend developer",
    company: "Magara",
    logo: "/jobs/3.png",
    location: "Cairo, Egypt",
    postedTime: "10 days ago",
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
  const [currentPage, setCurrentPage] = useState(2);
  const [isSortingOpen, setIsSortingOpen] = useState(false); // For mobile sorting toggle
  const totalPages = 3;

  return (
    <div >
     
      <div className=" p-1">
        
      </div>

      {/* Banner */}
      <div className="bg-green-600 p-4 flex justify-between items-center">
        <div className="text-white">
          <h1 className="text-lg font-semibold">UI Designer in Egypt</h1>
          <p className="text-sm">70 job positions</p>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="alert" className="data-[state=checked]:bg-white" />
          
        </div>

        
      </div>

      {/* Sorting and Filters */}
      <div className="flex justify-end mb-4 px-4">
        {/* Sorting Toggle for Mobile */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSortingOpen(!isSortingOpen)}
          className="md:hidden w-full text-left"
        >
          Sort by: {sorting === "top-match" ? "Top match" : sorting}
        </Button>

        {/* Sorting Dropdown for Desktop */}
        <Select
          value={sorting}
          onValueChange={setSorting}
        >
          <SelectTrigger className="w-[180px] hidden md:block">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top-match">Top match</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="salary-high">Highest Salary</SelectItem>
            <SelectItem value="salary-low">Lowest Salary</SelectItem>
          </SelectContent>
        </Select>

        {/* Sorting Dropdown for Mobile */}
        {isSortingOpen && (
          <div className="md:hidden absolute top-20 right-4 z-10 bg-white rounded-md shadow-md p-2">
            <Select
              value={sorting}
              onValueChange={(value) => {
                setSorting(value);
                setIsSortingOpen(false);
              }}
            >
              <SelectTrigger className="w-full">
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
        )}
      </div>

      {/* Job Listings */}
      <div className="flex-1 space-y-4 p-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="rounded"
                />
                <div>
                  <h3 className="font-medium text-base">{job.title}</h3>
                  <p className="text-green-600 text-sm font-medium">{job.company}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.postedTime}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                {job.experience}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                {job.type}
              </Badge>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                {job.workMode}
              </Badge>
            </div>

            <div className="mt-3 text-sm text-gray-500">{job.category}</div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 p-4 bg-white">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="h-8 w-8"
        >
          {"<"}
        </Button>
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={`h-8 w-8 ${
              currentPage === page ? "bg-green-600 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="h-8 w-8"
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
