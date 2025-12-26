-- Create lessons table for video training
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view published lessons" 
ON public.lessons FOR SELECT TO authenticated
USING (is_published = true);

CREATE POLICY "Admins can manage lessons"
ON public.lessons FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create lesson progress tracking
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own progress"
ON public.lesson_progress FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_score INTEGER NOT NULL,
  passed BOOLEAN DEFAULT false,
  certified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certifications"
ON public.certifications FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certifications"
ON public.certifications FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create session requests table
CREATE TABLE public.session_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_date DATE,
  preferred_time_start TIME,
  preferred_time_end TIME,
  gender_preference TEXT CHECK (gender_preference IN ('male', 'female', 'any')),
  language TEXT DEFAULT 'ru',
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'booked', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.session_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view open requests"
ON public.session_requests FOR SELECT TO authenticated
USING (status = 'open' OR requester_id = auth.uid());

CREATE POLICY "Users can create their own requests"
ON public.session_requests FOR INSERT TO authenticated
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their own requests"
ON public.session_requests FOR UPDATE TO authenticated
USING (auth.uid() = requester_id);

-- Create session bookings table
CREATE TABLE public.session_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES public.session_requests(id) ON DELETE CASCADE,
  practitioner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  meeting_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.session_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view their bookings"
ON public.session_bookings FOR SELECT TO authenticated
USING (
  practitioner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.session_requests WHERE id = request_id AND requester_id = auth.uid())
);

CREATE POLICY "Certified practitioners can create bookings"
ON public.session_bookings FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = practitioner_id AND 
  EXISTS (SELECT 1 FROM public.certifications WHERE user_id = auth.uid() AND passed = true)
);

CREATE POLICY "Participants can update their bookings"
ON public.session_bookings FOR UPDATE TO authenticated
USING (
  practitioner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.session_requests WHERE id = request_id AND requester_id = auth.uid())
);

-- Create feedback table
CREATE TABLE public.session_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.session_bookings(id) ON DELETE CASCADE,
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(booking_id, from_user_id)
);

ALTER TABLE public.session_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view feedback about them"
ON public.session_feedback FOR SELECT TO authenticated
USING (to_user_id = auth.uid() OR from_user_id = auth.uid());

CREATE POLICY "Users can create feedback"
ON public.session_feedback FOR INSERT TO authenticated
WITH CHECK (auth.uid() = from_user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_requests_updated_at
BEFORE UPDATE ON public.session_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_bookings_updated_at
BEFORE UPDATE ON public.session_bookings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample lessons
INSERT INTO public.lessons (title, description, video_url, duration_minutes, order_index, is_published) VALUES
('Введение в Метасинхронику', 'Основные понятия и принципы работы с подсознанием', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 15, 1, true),
('Техника глубокого расслабления', 'Как достичь состояния глубокого расслабления для работы', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 20, 2, true),
('Работа с ограничивающими убеждениями', 'Выявление и трансформация деструктивных паттернов', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 25, 3, true),
('Проведение сеанса: практика', 'Пошаговое руководство по проведению сеанса', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 30, 4, true),
('Этика и безопасность', 'Правила безопасной работы и этические нормы', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 15, 5, true);