-- Add TG_OP guard to handle_new_user for defense-in-depth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF TG_OP <> 'INSERT' THEN
    RETURN NEW;
  END IF;
  
  INSERT INTO public.profiles (id, name, birth_date, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
    NULL,
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$;