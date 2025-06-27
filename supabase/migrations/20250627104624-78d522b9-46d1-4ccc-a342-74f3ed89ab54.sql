
-- Create a table for custom columns
CREATE TABLE public.custom_columns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - for now making it accessible to all authenticated users
-- since this is an admin feature
ALTER TABLE public.custom_columns ENABLE ROW LEVEL SECURITY;

-- Create policy that allows authenticated users to view custom columns
CREATE POLICY "Authenticated users can view custom columns" 
  ON public.custom_columns 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create policy that allows authenticated users to insert custom columns
CREATE POLICY "Authenticated users can create custom columns" 
  ON public.custom_columns 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy that allows authenticated users to update custom columns
CREATE POLICY "Authenticated users can update custom columns" 
  ON public.custom_columns 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create policy that allows authenticated users to delete custom columns
CREATE POLICY "Authenticated users can delete custom columns" 
  ON public.custom_columns 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create an index for better performance on ordering
CREATE INDEX idx_custom_columns_order ON public.custom_columns(display_order);
