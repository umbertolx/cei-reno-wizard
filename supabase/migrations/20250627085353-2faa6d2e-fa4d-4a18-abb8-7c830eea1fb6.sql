
-- Enable RLS policies for the leads table to allow CRUD operations
-- Since there's no authentication system yet, we'll allow all operations for now

-- Policy to allow SELECT operations on leads
CREATE POLICY "Allow public read access to leads" 
  ON public.leads 
  FOR SELECT 
  USING (true);

-- Policy to allow INSERT operations on leads  
CREATE POLICY "Allow public insert access to leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow UPDATE operations on leads
CREATE POLICY "Allow public update access to leads" 
  ON public.leads 
  FOR UPDATE 
  USING (true);

-- Policy to allow DELETE operations on leads
CREATE POLICY "Allow public delete access to leads" 
  ON public.leads 
  FOR DELETE 
  USING (true);
