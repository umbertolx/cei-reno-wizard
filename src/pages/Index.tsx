import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to admin login
    navigate("/admin");
  }, [navigate]);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex items-center justify-center safe-area-all">
      <p className="text-muted-foreground">Reindirizzamento in corso...</p>
    </div>
  );
};

export default Index;
