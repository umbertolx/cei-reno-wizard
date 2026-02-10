
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
    <div className="min-h-screen min-h-[100dvh] bg-ricasa-white flex items-center justify-center px-6 py-8 sm:px-4 sm:py-6 md:px-6 md:py-8 safe-area-all font-roboto">
      <div className="w-full max-w-md bg-ricasa-white rounded-xl sm:rounded-2xl border border-gray-300 shadow-lg px-6 py-6 sm:px-6 sm:py-6 md:px-8 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-6 md:mb-8">
          <div className="mx-auto mb-5 sm:mb-6 flex flex-col items-center justify-center gap-3 sm:gap-3">
            <img 
              src="/logo-ricasa-pro.png" 
              alt="Ricasa Pro Logo" 
              className="h-6 sm:h-8 md:h-10 w-auto object-contain"
            />
            <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-300"></div>
            <img 
              src="/logo-cei.png" 
              alt="CEI Logo" 
              className="h-[25.6px] sm:h-[35.2px] md:h-[44.8px] w-auto object-contain"
            />
          </div>
          {showResetPassword && (
            <>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-ricasa-black">
                Recupera Password
              </h1>
              <p className="text-xs sm:text-sm md:text-base font-normal text-gray-700 mt-1">
                Inserisci la tua email per ricevere il link di reset
              </p>
            </>
          )}
        </div>

        {showResetPassword ? (
          /* Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-4 md:space-y-5">
            <div>
              <label htmlFor="resetEmail" className="block text-xs sm:text-sm font-medium text-ricasa-black mb-1 sm:mb-1.5">
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
                className="w-full bg-ricasa-white border border-gray-300 rounded-lg sm:rounded-xl h-11 sm:h-11 md:h-10 px-4 sm:px-4 text-sm sm:text-base md:text-sm placeholder:text-gray-400 focus:border-cei-red focus:ring-2 focus:ring-cei-red/20 transition-colors outline-none disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isResetting}
              className="w-full bg-cei-red hover:bg-cei-red-dark text-ricasa-white font-medium rounded-lg sm:rounded-xl px-6 py-2.5 sm:py-3 md:py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:bg-cei-red-light disabled:cursor-not-allowed text-sm sm:text-base md:text-sm"
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
              className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-ricasa-black transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Torna al login
            </button>
          </form>
        ) : (
          /* Login Form */
          <>
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-4 md:space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-ricasa-black mb-1 sm:mb-1.5">
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
                  className="w-full bg-ricasa-white border border-gray-300 rounded-lg sm:rounded-xl h-11 sm:h-11 md:h-10 px-4 sm:px-4 text-sm sm:text-base md:text-sm placeholder:text-gray-400 focus:border-cei-red focus:ring-2 focus:ring-cei-red/20 transition-colors outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-ricasa-black mb-1 sm:mb-1.5">
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
                  className="w-full bg-ricasa-white border border-gray-300 rounded-lg sm:rounded-xl h-11 sm:h-11 md:h-10 px-4 sm:px-4 text-sm sm:text-base md:text-sm placeholder:text-gray-400 focus:border-cei-red focus:ring-2 focus:ring-cei-red/20 transition-colors outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cei-red hover:bg-cei-red-dark text-ricasa-white font-medium rounded-lg sm:rounded-xl px-6 py-2.5 sm:py-3 md:py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:bg-cei-red-light disabled:cursor-not-allowed text-sm sm:text-base md:text-sm"
              >
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </button>
            </form>
            <div className="mt-5 sm:mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-xs sm:text-sm text-cei-red hover:text-cei-red-dark font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
