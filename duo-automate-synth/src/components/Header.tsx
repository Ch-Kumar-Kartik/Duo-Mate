
import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [greeting, setGreeting] = useState("");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <header className="flex flex-col gap-6 px-4 md:px-6 py-6 border-b border-border animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 bg-background w-[200px] lg:w-[280px]" 
            />
          </div>
          
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-duopurple text-[10px] font-medium text-white">
              3
            </span>
          </Button>
        </div>
      </div>
      
      {title === "Dashboard" && (
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3 border border-border animate-fade-in animate-delay-200">
          <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-duoblue/10 text-duoblue">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {greeting}, John! Here's what your DuoMate has prepared for you today.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
