"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home as HomeIcon, Briefcase, Users, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Menu, Bell, MessageSquare, User, Settings, Languages, HelpCircle, LogOut } from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <div className="border-b bg-black">
      <div className="flex h-14 items-center px-4 gap-4 max-w-[1400px] mx-auto">
        {/* Hamburger Menu for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">
            i<span className="text-green-500">Z</span>
            <span className="text-2xl font-bold text-white">AM</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow lg:block hidden">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <Input
            type="search"
            placeholder="Search by name, job title..."
            className="w-full bg-white border-0 text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full px-4 py-2 pl-12"
          />
        </div>

        {/* Navigation Items (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
            <div className="flex flex-col items-center">
              <HomeIcon className="h-6 w-6 mb-2" />
              <span>Home</span>
            </div>
          </Button>
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
            <div className="flex flex-col items-center">
              <Briefcase className="h-6 w-6 mb-2" />
              <span>Jobs</span>
            </div>
          </Button>
          <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 mb-2" />
              <span>Employers</span>
            </div>
          </Button>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <span className="text-xs text-white lg:block hidden">Notifications</span>
          </div>

          {/* Messaging */}
          <div className="relative flex flex-col items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10 relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full px-1 py-0.5">1</span>
            </Button>
            <span className="text-xs text-white lg:block hidden">Messaging</span>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                  <Image src="/1.jpg" alt="Profile Picture" width={32} height={32} className="h-8 w-2 rounded-full" />
                </Button>
                <ChevronDown className="h-4 w-4 text-white lg:block hidden" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Mina Adel</span>
                  <span className="text-sm text-muted-foreground">UX UI Designer</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings and Privacy</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Languages className="mr-2 h-4 w-4" />
                <span>Language</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}