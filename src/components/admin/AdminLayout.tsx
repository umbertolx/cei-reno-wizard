
import { ReactNode, useState, useEffect } from "react";
import { Home, Users, LogOut, Menu, X, UserCircle } from "lucide-react";
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
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 flex w-full overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: always visible, Mobile: slide-in drawer */}
      <aside
        className={`
          ${isMobile
            ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-56 flex-shrink-0 sticky top-0"
          }
          bg-white border-r border-gray-200 flex flex-col h-screen h-[100dvh] safe-area-top
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="min-w-0">
            <img src="/logo-ricasa.png" alt="Ricasa Pro" className="h-7 w-auto" />
            <img src="/logo-cei.png" alt="Logo CEI" className="h-6 w-auto mt-1" />
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="mx-2">
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm transition-all ${
                      isActive
                        ? "bg-[#d8010c] text-white font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout button inside sidebar (mobile) */}
        {isMobile && (
          <div className="p-4 border-t border-gray-200 safe-area-bottom">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
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
              className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
          )}

          {/* Mobile centered logo */}
          {isMobile && (
            <img src="/logo-ricasa.png" alt="Ricasa Pro" className="h-6 w-auto" />
          )}

          {/* Desktop: right-aligned logout. Mobile: placeholder for balanced layout */}
          <div className={isMobile ? "w-9" : "ml-auto"}>
            {!isMobile && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 font-medium text-sm transition-colors"
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
            className="overflow-y-auto p-4 md:p-8"
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
                  className={`flex flex-col items-center gap-1 py-1 px-6 rounded-xl transition-colors ${
                    isActive
                      ? "text-[#d8010c]"
                      : "text-gray-400"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 py-1 px-6 rounded-xl transition-colors text-gray-400"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-xs font-medium">Esci</span>
            </button>
          </div>
          {/* Safe area spacer for home indicator */}
          <div className="pb-safe" />
        </nav>
      )}
    </div>
  );
};
