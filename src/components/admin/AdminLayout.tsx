
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    navigate("/admin");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Leads", path: "/admin/leads" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b w-full">
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

      <div className="flex w-full h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm h-full border-r transition-all duration-300 flex flex-col flex-shrink-0`}>
          <div className="p-4 flex-1">
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Button
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      className={`w-full ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start'}`}
                      onClick={() => navigate(item.path)}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Collapse Toggle */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full justify-center"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
