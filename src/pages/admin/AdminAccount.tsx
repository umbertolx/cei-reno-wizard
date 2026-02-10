import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserCircle, Lock, Mail, User, Shield, RefreshCw, Eye, EyeOff } from "lucide-react";

const AdminAccount = () => {
  const { user, isAdmin, isLoading: authLoading } = useAdminAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract user info from user metadata
  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.firstName || null;
  const lastName = user?.user_metadata?.last_name || user?.user_metadata?.lastName || null;
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.fullName || null;
  const displayName = fullName || (firstName && lastName ? `${firstName} ${lastName}` : null);
  const email = user?.email || "";

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validations
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Errore", {
        description: "Tutti i campi sono obbligatori",
      });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Errore", {
        description: "La nuova password deve essere di almeno 6 caratteri",
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
      // Verify current password by attempting to sign in
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: email,
        password: currentPassword,
      });

      if (verifyError) {
        toast.error("Errore", {
          description: "Password attuale non corretta",
        });
        setIsLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      toast.success("Password aggiornata", {
        description: "La password è stata cambiata con successo",
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error("Errore", {
        description: error.message || "Si è verificato un errore durante il cambio password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Caricamento account...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null; // useAdminAuth will redirect
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6 w-full pb-20 md:pb-0">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Account</h1>
          <p className="text-sm md:text-base font-light text-gray-600 mt-1">
            Gestisci le informazioni del tuo account
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
            Informazioni Account
          </h2>
          <div className="space-y-4 md:space-y-5">
            {/* Nome */}
            <div>
              <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 mb-1.5">
                <User className="h-4 w-4" />
                Nome
              </label>
              <div className="text-sm md:text-base text-gray-900 font-medium">
                {displayName || firstName || "Non impostato"}
              </div>
            </div>

            {/* Cognome (only if we have separate first/last name) */}
            {firstName && lastName && (
              <div>
                <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 mb-1.5">
                  <User className="h-4 w-4" />
                  Cognome
                </label>
                <div className="text-sm md:text-base text-gray-900 font-medium">
                  {lastName}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 mb-1.5">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <div className="text-sm md:text-base text-gray-900 font-medium">
                {email}
              </div>
            </div>

            {/* Admin Badge */}
            {isAdmin && (
              <div>
                <label className="flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-500 mb-1.5">
                  <Shield className="h-4 w-4" />
                  Ruolo
                </label>
                <span className="inline-flex items-center gap-1.5 bg-[#d8010c]/10 text-[#d8010c] rounded-full px-3 py-1.5 text-xs md:text-sm font-semibold">
                  <Shield className="h-3.5 w-3.5" />
                  Admin
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Password Change Card */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Cambia Password
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-4 md:space-y-5">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-900 mb-1.5">
                Password Attuale
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Inserisci la password attuale"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="w-full bg-white border border-gray-200 rounded-xl h-11 md:h-10 px-4 pr-10 text-base md:text-sm placeholder:text-gray-400 focus:border-[#d8010c] focus:ring-1 focus:ring-[#d8010c]/20 transition-colors outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
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

            {/* Confirm Password */}
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

            {/* Submit Button */}
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
                "Cambia Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAccount;
