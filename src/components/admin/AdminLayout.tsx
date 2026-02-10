
import { ReactNode, useState, useEffect } from "react";
import { Home, Users, LogOut, Menu, X, UserCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Desktop sidebar collapse state (persisted in localStorage)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved === 'true';
    }
    return false;
  });

  // Save sidebar collapse state to localStorage
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
    }
  }, [sidebarCollapsed, isMobile]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, sidebarOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Leads", path: "/admin/leads" },
    { icon: UserCircle, label: "Account", path: "/admin/account" },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white flex w-full overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: collapsible, Mobile: slide-in drawer */}
      <aside
        className={`
          ${isMobile
            ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `flex-shrink-0 sticky top-0 transition-all duration-300 ease-in-out ${
                sidebarCollapsed ? "w-16" : "w-56"
              }`
          }
          bg-white border-r border-gray-200 flex flex-col h-screen h-[100dvh] safe-area-top
        `}
      >
        {/* Logo */}
        <div 
          className="px-3 sm:px-5 border-b border-gray-200 flex items-center justify-between"
          style={{
            height: isMobile ? '3.5rem' : '4rem',
          }}
        >
          <div className={`min-w-0 transition-opacity duration-300 flex flex-col items-center gap-1 ${sidebarCollapsed && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <img src="/logo-ricasa-pro.png" alt="Logo Ricasa Pro" className="h-4 sm:h-5 w-auto" />
            <img src="/logo-cei.png" alt="Logo CEI" className="h-6 sm:h-8 w-auto" />
          </div>
          {isMobile ? (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          ) : (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl hover:bg-[#F9FBFF] transition-colors flex-shrink-0"
              title={sidebarCollapsed ? "Espandi menu" : "Collassa menu"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className={isMobile ? "mx-2" : sidebarCollapsed ? "mx-2" : "mx-2"}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center ${
                      sidebarCollapsed && !isMobile 
                        ? "justify-center px-2" 
                        : "gap-3 px-4"
                    } py-2.5 rounded-xl text-sm transition-all font-roboto ${
                      isActive
                        ? "bg-ricasa-orange text-ricasa-white font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                    title={sidebarCollapsed && !isMobile ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className={`transition-opacity duration-300 ${
                      sidebarCollapsed && !isMobile 
                        ? "opacity-0 w-0 overflow-hidden" 
                        : "opacity-100"
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout button inside sidebar (mobile) or desktop when expanded */}
        {(isMobile || !sidebarCollapsed) && (
          <div className="p-4 border-t border-gray-200 safe-area-bottom">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                sidebarCollapsed && !isMobile 
                  ? "justify-center px-2" 
                  : "gap-3 px-4"
              } py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-roboto`}
              title={sidebarCollapsed && !isMobile ? "Logout" : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={`transition-opacity duration-300 ${
                sidebarCollapsed && !isMobile 
                  ? "opacity-0 w-0 overflow-hidden" 
                  : "opacity-100"
              }`}>
                Logout
              </span>
            </button>
          </div>
        )}
        
        {/* Desktop: Logout button when collapsed */}
        {!isMobile && sidebarCollapsed && (
          <div className="p-2 border-t border-gray-200 safe-area-bottom">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors font-roboto"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header
          className="bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0 sticky top-0 z-30"
          style={{
            height: isMobile ? '3.5rem' : '4rem',
          }}
        >
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl hover:bg-[#F9FBFF] transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          )}

          {/* Centered Ricasa logo */}
          <div className={isMobile ? "absolute left-1/2 -translate-x-1/2" : "flex-1 flex justify-center"}>
            <img src="/logo-ricasa-pro.png" alt="Ricasa Pro" className="h-8 w-auto" />
          </div>

          {/* Desktop: right-aligned logout. Mobile: placeholder for balanced layout */}
          <div className={isMobile ? "w-9" : ""}>
            {!isMobile && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 font-medium text-sm transition-colors font-roboto"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <div
            className="overflow-y-auto p-3 md:p-6"
            style={{
              height: isMobile
                ? 'calc(100dvh - 3.5rem - env(safe-area-inset-bottom, 0px))'
                : 'calc(100dvh - 4rem)',
            }}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
          <div className="flex items-center justify-around py-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 py-1 px-6 rounded-xl transition-colors font-roboto ${
                    isActive
                      ? "text-ricasa-orange"
                      : "text-gray-400"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"} font-roboto`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 py-1 px-6 rounded-xl transition-colors text-gray-400 font-roboto"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs font-medium font-roboto">Esci</span>
            </button>
          </div>
          {/* Safe area spacer for home indicator */}
          <div className="pb-safe" />
        </nav>
      )}
    </div>
  );
};
