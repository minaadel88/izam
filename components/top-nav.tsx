"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home as HomeIcon, Briefcase, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import { Menu, Bell, MessageSquare, User, Settings, Languages, HelpCircle, LogOut } from "lucide-react";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <div className="border-b bg-black">
      <div className="flex h-14 items-center px-4 gap-4 max-w-[1400px] mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">i<span className="text-green-500">Z</span>
            <span className="text-2xl font-bold text-white">AM</span></span>
          </div>

           {/* Search Bar */}
      <div className="flex-grow">
        <Input
          type="search"
          placeholder="Search by name, job title..."
          className="w-full bg-white/10 border-0 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full px-4 py-2 pl-10"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Image
            src="/1.png" // Replace with the actual path to your search icon
            alt="Search Icon"
            width={20}
            height={20}
            className="pointer-events-none"
          />
        </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center gap-6">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
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
    </div>
  );
}