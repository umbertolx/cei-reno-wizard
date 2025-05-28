
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, BarChart3, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/admin");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Leads", path: "/admin/leads" },
    { icon: BarChart3, label: "Statistiche", path: "/admin/stats" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-[#d8010c]">CEI Admin</h1>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">Dashboard Preventivi</span>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-73px)] border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
