"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { MainContent } from "@/components/main-content";
import { TopNav } from "@/components/top-nav";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Flex container for layout */}
      <div className="flex flex-col min-h-screen">
        {/* TopNav spanning the full width of the screen */}
        <TopNav
          onMenuClick={() => setIsSidebarOpen(true)} // Open sidebar on menu click
          className="sticky top-0 z-50 w-full bg-background shadow-md"
        />

        {/* Main content area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <DashboardNav
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />

          {/* Main content */}
          <div className="flex-1">
            <MainContent />
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
        />
      )}
    </div>
  );
}