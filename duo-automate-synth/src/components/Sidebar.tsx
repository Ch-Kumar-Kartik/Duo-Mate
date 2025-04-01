
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Home,
  Inbox,
  Layers,
  Menu,
  Settings,
  X
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Email Assistant",
    href: "/email",
    icon: Inbox,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Daily Digest",
    href: "/digest",
    icon: Layers,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Render mobile menu button
  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50 bg-duodark-400/80 backdrop-blur-md"
      onClick={toggleSidebar}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );

  // If mobile and sidebar is closed, only show the button
  if (isMobile && !isOpen) {
    return <MobileMenuButton />;
  }

  return (
    <>
      {isMobile && <MobileMenuButton />}
      
      <div
        className={`
          ${isMobile 
            ? "fixed inset-0 z-40 bg-duodark-900/70 backdrop-blur-sm transition-opacity duration-200" 
            : ""}
          ${isMobile && !isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
        onClick={isMobile ? toggleSidebar : undefined}
      >
        <aside
          className={`
            fixed md:sticky top-0 z-40 h-full 
            ${isMobile ? "w-64 transform transition-transform duration-300 ease-in-out" : ""}
            ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
            ${!isMobile && isCollapsed ? "w-20" : "w-64"}
            transition-all duration-300 bg-sidebar border-r border-sidebar-border shadow-xl md:shadow-none
          `}
          onClick={(e) => isMobile && e.stopPropagation()}
        >
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-14 items-center border-b border-sidebar-border px-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 font-semibold"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-duo">
                  <span className="text-white font-bold">D</span>
                </div>
                {!isCollapsed && <span className="text-lg">DuoMate</span>}
              </Link>
              <div className="ml-auto md:flex hidden">
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                      ${location.pathname === item.href 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"}
                      animate-fade-in animate-delay-${index * 100}
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="mt-auto p-4">
              <div className={`flex items-center gap-2 rounded-lg bg-sidebar-accent/50 p-2 ${isCollapsed ? "justify-center" : ""}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-duopurple text-white">
                  <span className="text-xs font-semibold">JD</span>
                </div>
                {!isCollapsed && (
                  <div className="text-sm">
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-sidebar-foreground/70">john@example.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
