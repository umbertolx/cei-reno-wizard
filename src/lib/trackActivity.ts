import { supabase } from "@/integrations/supabase/client";

/**
 * Logga un evento di attività utente.
 * Completamente fire-and-forget: non blocca nulla, non lancia errori.
 */
export const trackActivity = async (
  eventType: "login" | "page_view" | "logout",
  page?: string
) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    await supabase.from("user_activity_log").insert({
      user_id: session.user.id,
      event_type: eventType,
      page: page ?? null,
    });
  } catch {
    // Silenzioso — non deve mai interferire con l'app
  }
};
