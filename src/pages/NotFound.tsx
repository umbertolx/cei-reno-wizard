import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">Pagina non trovata</p>
        <a href="/" className="text-[#d8010c] hover:text-[#b8000a] font-medium underline">
          Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
