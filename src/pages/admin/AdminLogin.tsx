
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Mail } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Check if user has admin role
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        if (userRole) {
          navigate("/admin/dashboard");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Check if user has admin role
        const { data: userRole, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authData.user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roleError) throw roleError;

        if (!userRole) {
          await supabase.auth.signOut();
          toast.error("Accesso negato", {
            description: "Non hai i permessi di amministratore",
          });
          return;
        }

        toast.success("Login effettuato", {
          description: "Benvenuto nel dashboard admin!",
        });
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error("Errore", {
        description: error.message || "Credenziali non valide",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;

      toast.success("Email inviata", {
        description: "Controlla la tua casella email per il link di reset password",
      });
      setShowResetPassword(false);
      setResetEmail("");
    } catch (error: any) {
      toast.error("Errore", {
        description: error.message || "Impossibile inviare l'email di reset",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 flex items-center justify-center p-4 safe-area-all">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-[#d8010c] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-xl md:text-2xl font-bold">CEI</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {showResetPassword ? "Recupera Password" : "Admin Dashboard"}
          </h1>
          <p className="text-sm md:text-base font-light text-gray-600 mt-1">
            {showResetPassword
              ? "Inserisci la tua email per ricevere il link di reset"
              : "Accedi al pannello di controllo"}
          </p>
        </div>

        {showResetPassword ? (
          /* Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-4 md:space-y-5">
            <div>
              <label htmlFor="resetEmail" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Email
              </label>
              <input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isResetting}
                autoComplete="email"
                inputMode="email"
                className="w-full bg-white border border-gray-200 rounded-xl h-11 md:h-10 px-4 text-base md:text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isResetting}
              className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white font-semibold rounded-xl px-6 py-3 md:py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:bg-[#f5b7b1] disabled:cursor-not-allowed text-base md:text-sm"
            >
              {isResetting ? "Invio in corso..." : "Invia link di reset"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowResetPassword(false);
                setResetEmail("");
              }}
              disabled={isResetting}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al login
            </button>
          </form>
        ) : (
          /* Login Form */
          <>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  inputMode="email"
                  className="w-full bg-white border border-gray-200 rounded-xl h-11 md:h-10 px-4 text-base md:text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la password"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="w-full bg-white border border-gray-200 rounded-xl h-11 md:h-10 px-4 text-base md:text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white font-semibold rounded-xl px-6 py-3 md:py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:bg-[#f5b7b1] disabled:cursor-not-allowed text-base md:text-sm"
              >
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-sm text-[#d8010c] hover:text-[#b8000a] font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto"
              >
                <Mail className="h-4 w-4" />
                Password dimenticata?
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
