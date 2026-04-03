CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT,
    telegram TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users" ON public.waitlist
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Enable read access for admins" ON public.waitlist
    FOR SELECT TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
