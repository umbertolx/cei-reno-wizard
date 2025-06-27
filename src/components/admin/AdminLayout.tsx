
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  Database
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin/dashboard",
      active: location.pathname === "/admin/dashboard"
    },
    {
      icon: Users,
      label: "Gestione Lead",
      path: "/admin/leads",
      active: location.pathname === "/admin/leads"
    },
    {
      icon: Database,
      label: "Database Info",
      path: "/admin/database-info",
      active: location.pathname === "/admin/database-info"
    },
    {
      icon: Settings,
      label: "Impostazioni",
      path: "/admin/settings",
      active: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Torna al Sito</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/login")}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    item.active 
                      ? "bg-[#d8010c] hover:bg-[#b8010a] text-white" 
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
