import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Lock, Eye, EyeOff, RefreshCw } from "lucide-react";

const AdminResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Check if we have the hash parameters from Supabase
    const hashParams = window.location.hash;
    if (!hashParams || !hashParams.includes('access_token')) {
      toast.error("Link non valido", {
        description: "Il link di reset password non è valido o è scaduto",
      });
      setTimeout(() => navigate("/admin"), 2000);
      return;
    }

    // Extract the hash and verify the session
    const hash = hashParams.substring(1); // Remove the #
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      // Set the session with the tokens from the URL
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          toast.error("Errore", {
            description: "Impossibile verificare il link di reset",
          });
          setTimeout(() => navigate("/admin"), 2000);
        } else {
          setIsVerifying(false);
        }
      });
    } else {
      toast.error("Link non valido", {
        description: "Il link di reset password non è valido",
      });
      setTimeout(() => navigate("/admin"), 2000);
    }
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validations
    if (!newPassword || !confirmPassword) {
      toast.error("Errore", {
        description: "Tutti i campi sono obbligatori",
      });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Errore", {
        description: "La password deve essere di almeno 6 caratteri",
      });
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Errore", {
        description: "Le password non corrispondono",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Password aggiornata", {
        description: "La password è stata cambiata con successo. Ora puoi accedere.",
      });

      // Sign out and redirect to login
      await supabase.auth.signOut();
      setTimeout(() => navigate("/admin"), 1500);
    } catch (error: any) {
      toast.error("Errore", {
        description: error.message || "Si è verificato un errore durante il reset password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-[#F9FBFF] flex items-center justify-center p-4 safe-area-all">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Verifica del link in corso...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F9FBFF] flex items-center justify-center p-4 safe-area-all">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-[#d8010c] rounded-full flex items-center justify-center mb-4">
            <Lock className="h-7 w-7 md:h-8 md:w-8 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Imposta Nuova Password</h1>
          <p className="text-sm md:text-base font-light text-gray-600 mt-1">
            Inserisci la tua nuova password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-4 md:space-y-5">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-900 mb-1.5">
              Nuova Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Inserisci la nuova password (min. 6 caratteri)"
                required
                disabled={isLoading}
                autoComplete="new-password"
                minLength={6}
                className="w-full bg-white border border-gray-200 rounded-xl h-11 md:h-10 px-4 pr-10 text-base md:text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-1.5">
              Conferma Nuova Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Conferma la nuova password"
                required
                disabled={isLoading}
                autoComplete="new-password"
                minLength={6}
                className="w-full bg-white border border-gray-200 rounded-xl h-11 md:h-10 px-4 pr-10 text-base md:text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white font-semibold rounded-xl px-6 py-3 md:py-2.5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:bg-[#f5b7b1] disabled:cursor-not-allowed text-base md:text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Aggiornamento in corso...
              </span>
            ) : (
              "Imposta Nuova Password"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
