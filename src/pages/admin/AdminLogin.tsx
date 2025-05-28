
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password mock per demo
    if (password === "admin123") {
      toast({
        title: "Login effettuato",
        description: "Benvenuto nel dashboard admin!",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Errore",
        description: "Password non corretta",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#d8010c] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">CEI</span>
          </div>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <p className="text-gray-600">Accedi al pannello di controllo</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci la password admin"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#d8010c] hover:bg-[#b8010a]">
              Accedi
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Demo:</strong> Usa la password "admin123"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
