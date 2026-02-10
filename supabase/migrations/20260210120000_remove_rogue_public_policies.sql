-- Remove rogue public policies that were manually added to the database
-- These policies bypass the secure RLS setup from migration 20251014195903

-- 1. Remove 'allow_all_selects' policy - exposes customer PII to public internet
DROP POLICY IF EXISTS "allow_all_selects" ON public.leads;

-- 2. Remove 'allow_all_inserts' policy - allows unrestricted lead creation bypassing validation
DROP POLICY IF EXISTS "allow_all_inserts" ON public.leads;

-- Verify that the correct secure policies remain:
-- - "Allow anonymous lead creation" (INSERT only, stato='nuovo', unauthenticated users)
-- - "Admins can view all leads" (SELECT, admin role required)
-- - "Admins can update leads" (UPDATE, admin role required)
-- - "Admins can delete leads" (DELETE, admin role required)
