export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          certified_at: string | null
          created_at: string
          id: string
          passed: boolean | null
          test_score: number
          user_id: string
        }
        Insert: {
          certified_at?: string | null
          created_at?: string
          id?: string
          passed?: boolean | null
          test_score: number
          user_id: string
        }
        Update: {
          certified_at?: string | null
          created_at?: string
          id?: string
          passed?: boolean | null
          test_score?: number
          user_id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          order_index: number
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          preview: string
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          preview: string
          published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          preview?: string
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      oasis_ratings: {
        Row: {
          age: number | null
          country: string | null
          created_at: string
          display_name: string
          display_type: string
          donations_month: number
          donations_total: number
          donations_year: number
          gender: string | null
          id: string
          is_test_data: boolean
          reviews_avg: number | null
          reviews_count: number | null
          sessions_conducted: number
          sessions_received: number
          show_in_rating: boolean
          updated_at: string
          user_id: string | null
        }
        Insert: {
          age?: number | null
          country?: string | null
          created_at?: string
          display_name: string
          display_type?: string
          donations_month?: number
          donations_total?: number
          donations_year?: number
          gender?: string | null
          id?: string
          is_test_data?: boolean
          reviews_avg?: number | null
          reviews_count?: number | null
          sessions_conducted?: number
          sessions_received?: number
          show_in_rating?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          age?: number | null
          country?: string | null
          created_at?: string
          display_name?: string
          display_type?: string
          donations_month?: number
          donations_total?: number
          donations_year?: number
          gender?: string | null
          id?: string
          is_test_data?: boolean
          reviews_avg?: number | null
          reviews_count?: number | null
          sessions_conducted?: number
          sessions_received?: number
          show_in_rating?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          abortions_count: number | null
          actual_belief: string | null
          afterlife_type: string | null
          age: number | null
          ai_report: string | null
          alcohol_liters_weekly: number | null
          allergies: string | null
          anorexia: boolean | null
          antidepressants: boolean | null
          archive_permission: boolean | null
          attitude_to_rich: string | null
          bdsm_role: string | null
          believes_5g: boolean | null
          believes_adrenochrome: boolean | null
          believes_afterlife: boolean | null
          believes_antarctica: boolean | null
          believes_anunnaki: boolean | null
          believes_chips: boolean | null
          believes_deep_state: boolean | null
          believes_flat_earth: boolean | null
          believes_god: string | null
          believes_great_deception: boolean | null
          believes_moon_station: boolean | null
          believes_reincarnation: boolean | null
          believes_reptilians: boolean | null
          believes_simulation: boolean | null
          best_weight: number | null
          biggest_sin: string | null
          birth_country: string | null
          birth_order: number | null
          birth_sex: string | null
          black_cash: boolean | null
          blood_type: string | null
          body_complexes: string | null
          body_fat_percent: number | null
          bulimia: boolean | null
          cheating_history: boolean | null
          childhood_language: string | null
          children: Json | null
          chronic_diseases: string | null
          chronic_pain: string | null
          cigarettes_daily: number | null
          city: string | null
          city_district: string | null
          code_name: string | null
          coffee_addiction: boolean | null
          completed: boolean | null
          confirmation_word: string | null
          conspiracy_beliefs: Json | null
          created_at: string
          current_country: string | null
          current_gender: string | null
          current_profession: string | null
          current_savings: number | null
          current_sport: string | null
          daily_meditation_hours: number | null
          daily_practice_hours: number | null
          darkest_deed: string | null
          death_fear_rating: number | null
          debts: number | null
          desired_death_way: string | null
          diet_type: string | null
          divorces_count: number | null
          dream_occupation: string | null
          drugs_history: Json | null
          earth_mission: string | null
          eating_disorder: boolean | null
          email: string | null
          emotional_abuse: boolean | null
          energy_drinks: boolean | null
          envy_or_admiration: string | null
          epitaph: string | null
          eq_score: number | null
          expelled: boolean | null
          eye_color: string | null
          family_alcoholism: boolean | null
          family_cancer: boolean | null
          family_poverty: boolean | null
          family_size: number | null
          family_suicides: boolean | null
          family_wealth: boolean | null
          fantasy_orientation: string | null
          father_main_message: string | null
          father_nationality: string | null
          father_relationship: number | null
          favorite_politician: string | null
          favorite_porn_categories: string | null
          favorite_subject: string | null
          favorite_toy: string | null
          first_cheating_age: number | null
          first_kiss_age: number | null
          first_love_age: number | null
          first_memory: string | null
          first_sex_age: number | null
          first_sexual_experience_age: number | null
          flag_childhood_trauma: boolean | null
          flag_ego_death_ready: boolean | null
          flag_extreme_conspiracy: boolean | null
          flag_financial_ceiling: boolean | null
          flag_lgbt_imbalance: boolean | null
          flag_millionaire_ready: boolean | null
          flag_narcissist_psychopath: boolean | null
          flag_poverty_karma: boolean | null
          flag_severe_porn_addiction: boolean | null
          flag_sexual_trauma: boolean | null
          flag_starseed: boolean | null
          flag_suicide_risk: boolean | null
          flag_top77_candidate: boolean | null
          flag_violence_karma: boolean | null
          frigidity_impotence: boolean | null
          genital_self_rating: number | null
          genius_level: string | null
          grandparents_relationship: string | null
          harassment_victim: boolean | null
          has_crypto: boolean | null
          has_real_estate: boolean | null
          has_stepparent: boolean | null
          has_stocks: boolean | null
          hated_subject: string | null
          height: number | null
          honors_diploma: boolean | null
          id: string
          ideal_family_10_years: string | null
          intermittent_fasting: boolean | null
          iq_score: number | null
          is_virgin: boolean | null
          killed_animals: boolean | null
          killed_humans: boolean | null
          legacy_wish: string | null
          loves_current_job: boolean | null
          main_fantasy: string | null
          main_fear_for_children: string | null
          marriages_count: number | null
          masturbation_frequency: string | null
          max_single_payment: number | null
          miscarriages_count: number | null
          monthly_income: Json | null
          mortgage: number | null
          mother_main_message: string | null
          mother_nationality: string | null
          mother_relationship: number | null
          naked_body_rating: number | null
          narcissism_self_rating: number | null
          official_diagnoses: string | null
          official_religion: string | null
          orgasmic_ability: number | null
          orientation: string | null
          parent_role_rating: number | null
          parents_main_fear: string | null
          partners_count: number | null
          passive_income: number | null
          past_lives_count: number | null
          physical_abuse: boolean | null
          plans_more_children: boolean | null
          political_views: string | null
          porn_addiction: boolean | null
          prison_history: boolean | null
          prostitution_bought: boolean | null
          prostitution_sold: boolean | null
          psychiatric_treatment: boolean | null
          psychopathy_self_rating: number | null
          psychosomatics: string | null
          rape_victim: boolean | null
          raw_food: boolean | null
          ready_billionaire_any_cost: boolean | null
          ready_commune_life: boolean | null
          ready_ego_death: boolean | null
          ready_for_revolution: boolean | null
          ready_give_all_property: boolean | null
          ready_public_confession: boolean | null
          real_orientation: string | null
          relationship_status: string | null
          romantic_orientation: string | null
          scariest_childhood_day: string | null
          schizoid_self_rating: number | null
          school_name: string | null
          second_language: string | null
          self_harm: boolean | null
          session_id: string
          sex_frequency: string | null
          sex_satisfaction: number | null
          sex_work_doping: boolean | null
          sexual_abuse: boolean | null
          sexual_trauma: boolean | null
          specialty: string | null
          starseed_type: string | null
          sugar_addiction: boolean | null
          suicide_attempts: number | null
          surgeries: string | null
          taboo: string | null
          talents: string | null
          tax_optimization: boolean | null
          telegram: string | null
          theft_history: boolean | null
          tranquilizers: boolean | null
          transformation_investment: number | null
          university_name: string | null
          updated_at: string
          violence_history: boolean | null
          weight: number | null
          worst_weight: number | null
        }
        Insert: {
          abortions_count?: number | null
          actual_belief?: string | null
          afterlife_type?: string | null
          age?: number | null
          ai_report?: string | null
          alcohol_liters_weekly?: number | null
          allergies?: string | null
          anorexia?: boolean | null
          antidepressants?: boolean | null
          archive_permission?: boolean | null
          attitude_to_rich?: string | null
          bdsm_role?: string | null
          believes_5g?: boolean | null
          believes_adrenochrome?: boolean | null
          believes_afterlife?: boolean | null
          believes_antarctica?: boolean | null
          believes_anunnaki?: boolean | null
          believes_chips?: boolean | null
          believes_deep_state?: boolean | null
          believes_flat_earth?: boolean | null
          believes_god?: string | null
          believes_great_deception?: boolean | null
          believes_moon_station?: boolean | null
          believes_reincarnation?: boolean | null
          believes_reptilians?: boolean | null
          believes_simulation?: boolean | null
          best_weight?: number | null
          biggest_sin?: string | null
          birth_country?: string | null
          birth_order?: number | null
          birth_sex?: string | null
          black_cash?: boolean | null
          blood_type?: string | null
          body_complexes?: string | null
          body_fat_percent?: number | null
          bulimia?: boolean | null
          cheating_history?: boolean | null
          childhood_language?: string | null
          children?: Json | null
          chronic_diseases?: string | null
          chronic_pain?: string | null
          cigarettes_daily?: number | null
          city?: string | null
          city_district?: string | null
          code_name?: string | null
          coffee_addiction?: boolean | null
          completed?: boolean | null
          confirmation_word?: string | null
          conspiracy_beliefs?: Json | null
          created_at?: string
          current_country?: string | null
          current_gender?: string | null
          current_profession?: string | null
          current_savings?: number | null
          current_sport?: string | null
          daily_meditation_hours?: number | null
          daily_practice_hours?: number | null
          darkest_deed?: string | null
          death_fear_rating?: number | null
          debts?: number | null
          desired_death_way?: string | null
          diet_type?: string | null
          divorces_count?: number | null
          dream_occupation?: string | null
          drugs_history?: Json | null
          earth_mission?: string | null
          eating_disorder?: boolean | null
          email?: string | null
          emotional_abuse?: boolean | null
          energy_drinks?: boolean | null
          envy_or_admiration?: string | null
          epitaph?: string | null
          eq_score?: number | null
          expelled?: boolean | null
          eye_color?: string | null
          family_alcoholism?: boolean | null
          family_cancer?: boolean | null
          family_poverty?: boolean | null
          family_size?: number | null
          family_suicides?: boolean | null
          family_wealth?: boolean | null
          fantasy_orientation?: string | null
          father_main_message?: string | null
          father_nationality?: string | null
          father_relationship?: number | null
          favorite_politician?: string | null
          favorite_porn_categories?: string | null
          favorite_subject?: string | null
          favorite_toy?: string | null
          first_cheating_age?: number | null
          first_kiss_age?: number | null
          first_love_age?: number | null
          first_memory?: string | null
          first_sex_age?: number | null
          first_sexual_experience_age?: number | null
          flag_childhood_trauma?: boolean | null
          flag_ego_death_ready?: boolean | null
          flag_extreme_conspiracy?: boolean | null
          flag_financial_ceiling?: boolean | null
          flag_lgbt_imbalance?: boolean | null
          flag_millionaire_ready?: boolean | null
          flag_narcissist_psychopath?: boolean | null
          flag_poverty_karma?: boolean | null
          flag_severe_porn_addiction?: boolean | null
          flag_sexual_trauma?: boolean | null
          flag_starseed?: boolean | null
          flag_suicide_risk?: boolean | null
          flag_top77_candidate?: boolean | null
          flag_violence_karma?: boolean | null
          frigidity_impotence?: boolean | null
          genital_self_rating?: number | null
          genius_level?: string | null
          grandparents_relationship?: string | null
          harassment_victim?: boolean | null
          has_crypto?: boolean | null
          has_real_estate?: boolean | null
          has_stepparent?: boolean | null
          has_stocks?: boolean | null
          hated_subject?: string | null
          height?: number | null
          honors_diploma?: boolean | null
          id?: string
          ideal_family_10_years?: string | null
          intermittent_fasting?: boolean | null
          iq_score?: number | null
          is_virgin?: boolean | null
          killed_animals?: boolean | null
          killed_humans?: boolean | null
          legacy_wish?: string | null
          loves_current_job?: boolean | null
          main_fantasy?: string | null
          main_fear_for_children?: string | null
          marriages_count?: number | null
          masturbation_frequency?: string | null
          max_single_payment?: number | null
          miscarriages_count?: number | null
          monthly_income?: Json | null
          mortgage?: number | null
          mother_main_message?: string | null
          mother_nationality?: string | null
          mother_relationship?: number | null
          naked_body_rating?: number | null
          narcissism_self_rating?: number | null
          official_diagnoses?: string | null
          official_religion?: string | null
          orgasmic_ability?: number | null
          orientation?: string | null
          parent_role_rating?: number | null
          parents_main_fear?: string | null
          partners_count?: number | null
          passive_income?: number | null
          past_lives_count?: number | null
          physical_abuse?: boolean | null
          plans_more_children?: boolean | null
          political_views?: string | null
          porn_addiction?: boolean | null
          prison_history?: boolean | null
          prostitution_bought?: boolean | null
          prostitution_sold?: boolean | null
          psychiatric_treatment?: boolean | null
          psychopathy_self_rating?: number | null
          psychosomatics?: string | null
          rape_victim?: boolean | null
          raw_food?: boolean | null
          ready_billionaire_any_cost?: boolean | null
          ready_commune_life?: boolean | null
          ready_ego_death?: boolean | null
          ready_for_revolution?: boolean | null
          ready_give_all_property?: boolean | null
          ready_public_confession?: boolean | null
          real_orientation?: string | null
          relationship_status?: string | null
          romantic_orientation?: string | null
          scariest_childhood_day?: string | null
          schizoid_self_rating?: number | null
          school_name?: string | null
          second_language?: string | null
          self_harm?: boolean | null
          session_id?: string
          sex_frequency?: string | null
          sex_satisfaction?: number | null
          sex_work_doping?: boolean | null
          sexual_abuse?: boolean | null
          sexual_trauma?: boolean | null
          specialty?: string | null
          starseed_type?: string | null
          sugar_addiction?: boolean | null
          suicide_attempts?: number | null
          surgeries?: string | null
          taboo?: string | null
          talents?: string | null
          tax_optimization?: boolean | null
          telegram?: string | null
          theft_history?: boolean | null
          tranquilizers?: boolean | null
          transformation_investment?: number | null
          university_name?: string | null
          updated_at?: string
          violence_history?: boolean | null
          weight?: number | null
          worst_weight?: number | null
        }
        Update: {
          abortions_count?: number | null
          actual_belief?: string | null
          afterlife_type?: string | null
          age?: number | null
          ai_report?: string | null
          alcohol_liters_weekly?: number | null
          allergies?: string | null
          anorexia?: boolean | null
          antidepressants?: boolean | null
          archive_permission?: boolean | null
          attitude_to_rich?: string | null
          bdsm_role?: string | null
          believes_5g?: boolean | null
          believes_adrenochrome?: boolean | null
          believes_afterlife?: boolean | null
          believes_antarctica?: boolean | null
          believes_anunnaki?: boolean | null
          believes_chips?: boolean | null
          believes_deep_state?: boolean | null
          believes_flat_earth?: boolean | null
          believes_god?: string | null
          believes_great_deception?: boolean | null
          believes_moon_station?: boolean | null
          believes_reincarnation?: boolean | null
          believes_reptilians?: boolean | null
          believes_simulation?: boolean | null
          best_weight?: number | null
          biggest_sin?: string | null
          birth_country?: string | null
          birth_order?: number | null
          birth_sex?: string | null
          black_cash?: boolean | null
          blood_type?: string | null
          body_complexes?: string | null
          body_fat_percent?: number | null
          bulimia?: boolean | null
          cheating_history?: boolean | null
          childhood_language?: string | null
          children?: Json | null
          chronic_diseases?: string | null
          chronic_pain?: string | null
          cigarettes_daily?: number | null
          city?: string | null
          city_district?: string | null
          code_name?: string | null
          coffee_addiction?: boolean | null
          completed?: boolean | null
          confirmation_word?: string | null
          conspiracy_beliefs?: Json | null
          created_at?: string
          current_country?: string | null
          current_gender?: string | null
          current_profession?: string | null
          current_savings?: number | null
          current_sport?: string | null
          daily_meditation_hours?: number | null
          daily_practice_hours?: number | null
          darkest_deed?: string | null
          death_fear_rating?: number | null
          debts?: number | null
          desired_death_way?: string | null
          diet_type?: string | null
          divorces_count?: number | null
          dream_occupation?: string | null
          drugs_history?: Json | null
          earth_mission?: string | null
          eating_disorder?: boolean | null
          email?: string | null
          emotional_abuse?: boolean | null
          energy_drinks?: boolean | null
          envy_or_admiration?: string | null
          epitaph?: string | null
          eq_score?: number | null
          expelled?: boolean | null
          eye_color?: string | null
          family_alcoholism?: boolean | null
          family_cancer?: boolean | null
          family_poverty?: boolean | null
          family_size?: number | null
          family_suicides?: boolean | null
          family_wealth?: boolean | null
          fantasy_orientation?: string | null
          father_main_message?: string | null
          father_nationality?: string | null
          father_relationship?: number | null
          favorite_politician?: string | null
          favorite_porn_categories?: string | null
          favorite_subject?: string | null
          favorite_toy?: string | null
          first_cheating_age?: number | null
          first_kiss_age?: number | null
          first_love_age?: number | null
          first_memory?: string | null
          first_sex_age?: number | null
          first_sexual_experience_age?: number | null
          flag_childhood_trauma?: boolean | null
          flag_ego_death_ready?: boolean | null
          flag_extreme_conspiracy?: boolean | null
          flag_financial_ceiling?: boolean | null
          flag_lgbt_imbalance?: boolean | null
          flag_millionaire_ready?: boolean | null
          flag_narcissist_psychopath?: boolean | null
          flag_poverty_karma?: boolean | null
          flag_severe_porn_addiction?: boolean | null
          flag_sexual_trauma?: boolean | null
          flag_starseed?: boolean | null
          flag_suicide_risk?: boolean | null
          flag_top77_candidate?: boolean | null
          flag_violence_karma?: boolean | null
          frigidity_impotence?: boolean | null
          genital_self_rating?: number | null
          genius_level?: string | null
          grandparents_relationship?: string | null
          harassment_victim?: boolean | null
          has_crypto?: boolean | null
          has_real_estate?: boolean | null
          has_stepparent?: boolean | null
          has_stocks?: boolean | null
          hated_subject?: string | null
          height?: number | null
          honors_diploma?: boolean | null
          id?: string
          ideal_family_10_years?: string | null
          intermittent_fasting?: boolean | null
          iq_score?: number | null
          is_virgin?: boolean | null
          killed_animals?: boolean | null
          killed_humans?: boolean | null
          legacy_wish?: string | null
          loves_current_job?: boolean | null
          main_fantasy?: string | null
          main_fear_for_children?: string | null
          marriages_count?: number | null
          masturbation_frequency?: string | null
          max_single_payment?: number | null
          miscarriages_count?: number | null
          monthly_income?: Json | null
          mortgage?: number | null
          mother_main_message?: string | null
          mother_nationality?: string | null
          mother_relationship?: number | null
          naked_body_rating?: number | null
          narcissism_self_rating?: number | null
          official_diagnoses?: string | null
          official_religion?: string | null
          orgasmic_ability?: number | null
          orientation?: string | null
          parent_role_rating?: number | null
          parents_main_fear?: string | null
          partners_count?: number | null
          passive_income?: number | null
          past_lives_count?: number | null
          physical_abuse?: boolean | null
          plans_more_children?: boolean | null
          political_views?: string | null
          porn_addiction?: boolean | null
          prison_history?: boolean | null
          prostitution_bought?: boolean | null
          prostitution_sold?: boolean | null
          psychiatric_treatment?: boolean | null
          psychopathy_self_rating?: number | null
          psychosomatics?: string | null
          rape_victim?: boolean | null
          raw_food?: boolean | null
          ready_billionaire_any_cost?: boolean | null
          ready_commune_life?: boolean | null
          ready_ego_death?: boolean | null
          ready_for_revolution?: boolean | null
          ready_give_all_property?: boolean | null
          ready_public_confession?: boolean | null
          real_orientation?: string | null
          relationship_status?: string | null
          romantic_orientation?: string | null
          scariest_childhood_day?: string | null
          schizoid_self_rating?: number | null
          school_name?: string | null
          second_language?: string | null
          self_harm?: boolean | null
          session_id?: string
          sex_frequency?: string | null
          sex_satisfaction?: number | null
          sex_work_doping?: boolean | null
          sexual_abuse?: boolean | null
          sexual_trauma?: boolean | null
          specialty?: string | null
          starseed_type?: string | null
          sugar_addiction?: boolean | null
          suicide_attempts?: number | null
          surgeries?: string | null
          taboo?: string | null
          talents?: string | null
          tax_optimization?: boolean | null
          telegram?: string | null
          theft_history?: boolean | null
          tranquilizers?: boolean | null
          transformation_investment?: number | null
          university_name?: string | null
          updated_at?: string
          violence_history?: boolean | null
          weight?: number | null
          worst_weight?: number | null
        }
        Relationships: []
      }
      session_bookings: {
        Row: {
          created_at: string
          id: string
          meeting_link: string | null
          practitioner_id: string
          request_id: string
          scheduled_at: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          meeting_link?: string | null
          practitioner_id: string
          request_id: string
          scheduled_at: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          meeting_link?: string | null
          practitioner_id?: string
          request_id?: string
          scheduled_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_bookings_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "session_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      session_feedback: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          from_user_id: string
          id: string
          rating: number
          to_user_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          from_user_id: string
          id?: string
          rating: number
          to_user_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          from_user_id?: string
          id?: string
          rating?: number
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_feedback_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "session_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      session_requests: {
        Row: {
          created_at: string
          gender_preference: string | null
          id: string
          language: string | null
          notes: string | null
          preferred_date: string | null
          preferred_time_end: string | null
          preferred_time_start: string | null
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          gender_preference?: string | null
          id?: string
          language?: string | null
          notes?: string | null
          preferred_date?: string | null
          preferred_time_end?: string | null
          preferred_time_start?: string | null
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          gender_preference?: string | null
          id?: string
          language?: string | null
          notes?: string | null
          preferred_date?: string | null
          preferred_time_end?: string | null
          preferred_time_start?: string | null
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
