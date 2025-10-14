-- Fix critical security issues in the database

-- 1. Create user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Fix leads table security - Remove all public policies
DROP POLICY IF EXISTS "Allow all operations on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public read access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public update access to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public delete access to leads" ON public.leads;

-- Create secure policies for leads
CREATE POLICY "Allow anonymous lead creation"
ON public.leads FOR INSERT
WITH CHECK (
  stato = 'nuovo' AND
  auth.uid() IS NULL
);

CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.leads FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Fix estimates table security - Remove public policy
DROP POLICY IF EXISTS "Allow all operations on estimates" ON public.estimates;

-- Create secure policies for estimates
CREATE POLICY "Admins can view all estimates"
ON public.estimates FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage estimates"
ON public.estimates FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update estimates"
ON public.estimates FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete estimates"
ON public.estimates FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Enable RLS and secure leads_real table
ALTER TABLE public.leads_real ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view leads_real"
ON public.leads_real FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage leads_real"
ON public.leads_real FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Fix custom_columns to be admin-only
DROP POLICY IF EXISTS "Authenticated users can view custom columns" ON public.custom_columns;
DROP POLICY IF EXISTS "Authenticated users can create custom columns" ON public.custom_columns;
DROP POLICY IF EXISTS "Authenticated users can update custom columns" ON public.custom_columns;
DROP POLICY IF EXISTS "Authenticated users can delete custom columns" ON public.custom_columns;

CREATE POLICY "Admins can manage custom columns"
ON public.custom_columns FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Fix update_updated_at_column function security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;