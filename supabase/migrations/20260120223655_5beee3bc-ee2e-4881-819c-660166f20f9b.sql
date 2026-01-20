-- CRITICAL SECURITY FIX: Proper RLS for quiz_responses
-- The previous migration had a logical issue with session_id = session_id (always true)
-- This migration properly restricts access

-- Drop all quiz_responses policies to start fresh
DROP POLICY IF EXISTS "Users can create quiz response" ON public.quiz_responses;
DROP POLICY IF EXISTS "Users can read own quiz response by session" ON public.quiz_responses;
DROP POLICY IF EXISTS "Users can update own quiz response by session" ON public.quiz_responses;
DROP POLICY IF EXISTS "Admins can view all quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Admins can update quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Admins can delete quiz responses" ON public.quiz_responses;
DROP POLICY IF EXISTS "Anyone can create quiz response" ON public.quiz_responses;
DROP POLICY IF EXISTS "Anyone can read their own quiz response" ON public.quiz_responses;
DROP POLICY IF EXISTS "Anyone can update quiz response" ON public.quiz_responses;

-- For anonymous quiz functionality, we need to completely block public access 
-- and only allow access through authenticated admin or service role
-- The quiz will work through client-side session management where the session_id
-- is stored in the browser and passed to edge functions for processing

-- INSERT: Allow anyone to create (still anonymous quiz support)
-- But we'll rely on edge function to process data, not direct table access
CREATE POLICY "Allow insert for quiz creation"
ON public.quiz_responses
FOR INSERT
WITH CHECK (true);

-- SELECT: DENY all direct access - data must go through edge function
-- Admin-only read access for administrative purposes
CREATE POLICY "Admin only read access"
ON public.quiz_responses
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- UPDATE: Admin-only or service role through edge functions  
CREATE POLICY "Admin only update access"
ON public.quiz_responses
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- DELETE: Admin only
CREATE POLICY "Admin only delete access"
ON public.quiz_responses
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));