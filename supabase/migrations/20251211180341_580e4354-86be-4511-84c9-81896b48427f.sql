-- Create quiz_responses table to store all quiz answers
CREATE TABLE public.quiz_responses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    
    -- Level 0: Entry
    code_name text,
    
    -- Level 1: Bio-identification (questions 1-20)
    birth_sex text,
    current_gender text,
    orientation text,
    romantic_orientation text,
    age integer,
    height integer,
    weight integer,
    body_fat_percent integer,
    eye_color text,
    blood_type text,
    chronic_diseases text,
    allergies text,
    surgeries text,
    birth_country text,
    current_country text,
    city text,
    city_district text,
    mother_nationality text,
    father_nationality text,
    childhood_language text,
    second_language text,
    
    -- Level 2: Religion and cosmology (questions 21-45)
    official_religion text,
    actual_belief text,
    believes_reincarnation boolean,
    past_lives_count integer,
    starseed_type text,
    earth_mission text,
    believes_god text,
    daily_meditation_hours integer,
    conspiracy_beliefs jsonb DEFAULT '[]'::jsonb,
    believes_simulation boolean,
    believes_adrenochrome boolean,
    believes_flat_earth boolean,
    believes_antarctica boolean,
    believes_moon_station boolean,
    believes_chips boolean,
    believes_5g boolean,
    believes_reptilians boolean,
    believes_anunnaki boolean,
    believes_great_deception boolean,
    believes_deep_state boolean,
    
    -- Level 3: Ancestral karma and childhood (questions 46-85)
    family_size integer,
    birth_order integer,
    father_relationship integer,
    mother_relationship integer,
    has_stepparent boolean,
    grandparents_relationship text,
    physical_abuse boolean,
    emotional_abuse boolean,
    sexual_abuse boolean,
    family_alcoholism boolean,
    family_suicides boolean,
    family_cancer boolean,
    family_poverty boolean,
    family_wealth boolean,
    parents_main_fear text,
    mother_main_message text,
    father_main_message text,
    first_memory text,
    scariest_childhood_day text,
    favorite_toy text,
    first_sexual_experience_age integer,
    first_love_age integer,
    first_kiss_age integer,
    first_sex_age integer,
    first_cheating_age integer,
    
    -- Level 4: Current family and children (questions 86-110)
    relationship_status text,
    marriages_count integer,
    divorces_count integer,
    children jsonb DEFAULT '[]'::jsonb,
    abortions_count integer,
    miscarriages_count integer,
    plans_more_children boolean,
    ideal_family_10_years text,
    parent_role_rating integer,
    main_fear_for_children text,
    
    -- Level 5: Money and power (questions 111-140)
    monthly_income jsonb DEFAULT '[]'::jsonb,
    passive_income integer,
    max_single_payment integer,
    current_savings integer,
    debts integer,
    mortgage integer,
    attitude_to_rich text,
    envy_or_admiration text,
    ready_billionaire_any_cost boolean,
    political_views text,
    ready_for_revolution boolean,
    favorite_politician text,
    tax_optimization boolean,
    black_cash boolean,
    has_crypto boolean,
    has_stocks boolean,
    has_real_estate boolean,
    
    -- Level 6: Education and calling (questions 141-160)
    school_name text,
    university_name text,
    specialty text,
    honors_diploma boolean,
    expelled boolean,
    favorite_subject text,
    hated_subject text,
    iq_score integer,
    eq_score integer,
    talents text,
    genius_level text,
    current_profession text,
    loves_current_job boolean,
    dream_occupation text,
    
    -- Level 7: Sex and intimacy (questions 161-200)
    sex_satisfaction integer,
    sex_frequency text,
    masturbation_frequency text,
    porn_addiction boolean,
    favorite_porn_categories text,
    main_fantasy text,
    taboo text,
    bdsm_role text,
    cheating_history boolean,
    partners_count integer,
    is_virgin boolean,
    prostitution_bought boolean,
    prostitution_sold boolean,
    sexual_trauma boolean,
    rape_victim boolean,
    harassment_victim boolean,
    fantasy_orientation text,
    real_orientation text,
    genital_self_rating integer,
    orgasmic_ability integer,
    frigidity_impotence boolean,
    
    -- Level 8: Body and health (questions 201-225)
    naked_body_rating integer,
    body_complexes text,
    current_sport text,
    best_weight integer,
    worst_weight integer,
    eating_disorder boolean,
    bulimia boolean,
    anorexia boolean,
    chronic_pain text,
    psychosomatics text,
    antidepressants boolean,
    tranquilizers boolean,
    psychiatric_treatment boolean,
    
    -- Level 9: Nutrition and addictions (questions 226-245)
    diet_type text,
    intermittent_fasting boolean,
    raw_food boolean,
    alcohol_liters_weekly numeric,
    cigarettes_daily integer,
    drugs_history jsonb DEFAULT '[]'::jsonb,
    sugar_addiction boolean,
    coffee_addiction boolean,
    energy_drinks boolean,
    sex_work_doping boolean,
    
    -- Level 10: Mental health and dark side (questions 246-275)
    official_diagnoses text,
    suicide_attempts integer,
    self_harm boolean,
    psychopathy_self_rating integer,
    narcissism_self_rating integer,
    schizoid_self_rating integer,
    darkest_deed text,
    killed_animals boolean,
    killed_humans boolean,
    theft_history boolean,
    violence_history boolean,
    prison_history boolean,
    biggest_sin text,
    
    -- Level 11: Death and legacy (questions 276-290)
    believes_afterlife boolean,
    afterlife_type text,
    death_fear_rating integer,
    desired_death_way text,
    epitaph text,
    legacy_wish text,
    
    -- Level 12: Metasynchronics (questions 291-300)
    ready_ego_death boolean,
    daily_practice_hours integer,
    transformation_investment integer,
    ready_give_all_property boolean,
    ready_public_confession boolean,
    ready_commune_life boolean,
    email text,
    telegram text,
    archive_permission boolean,
    confirmation_word text,
    
    -- Automatic flags
    flag_childhood_trauma boolean DEFAULT false,
    flag_sexual_trauma boolean DEFAULT false,
    flag_extreme_conspiracy boolean DEFAULT false,
    flag_millionaire_ready boolean DEFAULT false,
    flag_severe_porn_addiction boolean DEFAULT false,
    flag_suicide_risk boolean DEFAULT false,
    flag_poverty_karma boolean DEFAULT false,
    flag_violence_karma boolean DEFAULT false,
    flag_lgbt_imbalance boolean DEFAULT false,
    flag_narcissist_psychopath boolean DEFAULT false,
    flag_starseed boolean DEFAULT false,
    flag_ego_death_ready boolean DEFAULT false,
    flag_financial_ceiling boolean DEFAULT false,
    flag_top77_candidate boolean DEFAULT false,
    
    -- AI Report
    ai_report text,
    completed boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (anonymous quiz)
CREATE POLICY "Anyone can create quiz response"
ON public.quiz_responses
FOR INSERT
WITH CHECK (true);

-- Allow reading own response by session_id
CREATE POLICY "Anyone can read their own quiz response"
ON public.quiz_responses
FOR SELECT
USING (true);

-- Allow updating own response
CREATE POLICY "Anyone can update quiz response"
ON public.quiz_responses
FOR UPDATE
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_quiz_responses_updated_at
BEFORE UPDATE ON public.quiz_responses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();