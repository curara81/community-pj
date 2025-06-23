
-- Enable RLS on profiles table (if not already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create comprehensive RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" 
  ON public.profiles 
  FOR DELETE 
  USING (auth.uid() = id);

-- Enable RLS on donations table (if not already enabled)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own donations" ON public.donations;
DROP POLICY IF EXISTS "Users can create their own donations" ON public.donations;

-- Create comprehensive RLS policies for donations table
CREATE POLICY "Users can view their own donations" 
  ON public.donations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own donations" 
  ON public.donations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donations" 
  ON public.donations 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create tables for secure form submissions
CREATE TABLE public.volunteer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  message TEXT,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on volunteer_applications
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for volunteer applications
CREATE POLICY "Users can view their own applications" 
  ON public.volunteer_applications 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create volunteer applications" 
  ON public.volunteer_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Create audit log table for security monitoring
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs (admin only access)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs" 
  ON public.audit_logs 
  FOR SELECT 
  USING (false); -- Will be updated when admin roles are implemented

-- Add constraint to ensure user_id is not null for donations (security requirement)
ALTER TABLE public.donations ALTER COLUMN user_id SET NOT NULL;
