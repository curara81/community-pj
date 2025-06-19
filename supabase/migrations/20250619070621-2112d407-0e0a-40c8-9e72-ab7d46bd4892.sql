
-- 사용자 프로필 테이블 생성
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('individual', 'business_entity', 'non_business_entity')) DEFAULT 'individual',
  business_name TEXT,
  business_registration_number TEXT,
  representative_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- RLS 정책 설정
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 사용자가 자신의 프로필만 조회할 수 있도록
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- 사용자가 자신의 프로필을 생성할 수 있도록
CREATE POLICY "Users can create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 사용자가 자신의 프로필을 수정할 수 있도록
CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- 기부 내역 테이블 생성
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  amount INTEGER NOT NULL,
  donation_type TEXT CHECK (donation_type IN ('regular', 'one_time')) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 기부 내역 테이블 RLS 설정
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own donations" 
  ON public.donations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own donations" 
  ON public.donations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 자동으로 프로필 생성하는 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, birth_date, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NULL,
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
END;
$$;

-- 새 사용자가 생성될 때마다 프로필을 자동 생성하는 트리거
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
