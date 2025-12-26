import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Faker-like data generators
const firstNames = {
  male: ['Alex', 'Ivan', 'Dmitry', 'Sergei', 'Michael', 'James', 'John', 'Wei', 'Hiroshi', 'Hans', 'Pierre', 'Carlos', 'Ahmed', 'Raj', 'Kim'],
  female: ['Maria', 'Anna', 'Elena', 'Olga', 'Emma', 'Sarah', 'Yuki', 'Li', 'Sophie', 'Mia', 'Isabella', 'Fatima', 'Priya', 'Ji-Young', 'Nina'],
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Lee', 'Kim', 'Park', 'Chen', 'Wang', 'Singh', 'Kumar', 'Müller', 'Schmidt', 'Ivanov', 'Petrov', 'Smirnov', 'Tanaka', 'Suzuki', 'Dubois', 'Martin'];

const nicknames = ['CoolMaster', 'ZenWarrior', 'MindExplorer', 'SoulSeeker', 'StarChild', 'MoonWalker', 'SunRay', 'OceanDeep', 'MountainHigh', 'ForestSpirit', 'DesertWind', 'RiverFlow', 'CloudDancer', 'LightBringer', 'PathFinder', 'DreamCatcher', 'EnergyFlow', 'SpiritGuide', 'InnerPeace', 'CosmicSoul'];

const countries = [
  { name: 'USA', weight: 15 },
  { name: 'Russia', weight: 15 },
  { name: 'Kazakhstan', weight: 10 },
  { name: 'India', weight: 10 },
  { name: 'Germany', weight: 10 },
  { name: 'France', weight: 5 },
  { name: 'Brazil', weight: 5 },
  { name: 'Japan', weight: 5 },
  { name: 'China', weight: 5 },
  { name: 'UK', weight: 5 },
  { name: 'Canada', weight: 3 },
  { name: 'Australia', weight: 3 },
  { name: 'Spain', weight: 2 },
  { name: 'Italy', weight: 2 },
  { name: 'Mexico', weight: 1 },
  { name: 'Ukraine', weight: 1 },
  { name: 'Turkey', weight: 1 },
  { name: 'South Korea', weight: 1 },
  { name: 'Netherlands', weight: 0.5 },
  { name: 'Sweden', weight: 0.5 },
];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedRandomCountry(): string {
  const totalWeight = countries.reduce((sum, c) => sum + c.weight, 0);
  let random = Math.random() * totalWeight;
  for (const country of countries) {
    random -= country.weight;
    if (random <= 0) return country.name;
  }
  return countries[0].name;
}

function normalDistribution(min: number, max: number, mean?: number): number {
  const m = mean ?? (min + max) / 2;
  const std = (max - min) / 6;
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + m;
  return Math.max(min, Math.min(max, Math.round(num)));
}

function exponentialDistribution(min: number, max: number): number {
  const lambda = 1.5;
  const u = Math.random();
  const value = -Math.log(1 - u) / lambda;
  const normalized = value / 5;
  return Math.round(min + normalized * (max - min));
}

function generateParticipant(): object {
  // 40% name, 40% nickname, 20% anonymous
  const displayTypeRandom = Math.random();
  let displayType: string;
  let displayName: string;
  
  // Gender: equal distribution
  const genders = ['male', 'female', 'other'];
  const gender = randomChoice(genders);
  
  if (displayTypeRandom < 0.4) {
    displayType = 'name';
    const genderKey = gender === 'other' ? randomChoice(['male', 'female']) : gender;
    const firstName = randomChoice(firstNames[genderKey as 'male' | 'female']);
    const lastName = randomChoice(lastNames);
    displayName = `${firstName} ${lastName}`;
  } else if (displayTypeRandom < 0.8) {
    displayType = 'nickname';
    displayName = randomChoice(nicknames) + Math.floor(Math.random() * 1000);
  } else {
    displayType = 'anonymous';
    displayName = `Anonymous #${Math.floor(Math.random() * 10000)}`;
  }

  const age = Math.floor(Math.random() * (65 - 18 + 1)) + 18;
  const country = weightedRandomCountry();
  
  // Sessions with normal distribution (0-50)
  const sessionsConducted = normalDistribution(0, 50, 15);
  const sessionsReceived = normalDistribution(0, 50, 20);
  
  // Reviews
  const reviewsCount = Math.floor(Math.random() * (sessionsConducted + sessionsReceived));
  const reviewsAvg = reviewsCount > 0 ? Math.round((3.5 + Math.random() * 1.5) * 10) / 10 : 0;
  
  // Donations with exponential distribution (0-5000)
  const donationsTotal = exponentialDistribution(0, 5000);
  const donationsYear = Math.round(donationsTotal * (0.3 + Math.random() * 0.5));
  const donationsMonth = Math.round(donationsYear * (0.1 + Math.random() * 0.2));

  return {
    display_name: displayName,
    display_type: displayType,
    gender,
    age,
    country,
    sessions_conducted: sessionsConducted,
    sessions_received: sessionsReceived,
    reviews_avg: reviewsAvg,
    reviews_count: reviewsCount,
    donations_total: donationsTotal,
    donations_month: donationsMonth,
    donations_year: donationsYear,
    show_in_rating: true,
    is_test_data: true,
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting test data generation...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete previous test data
    console.log('Deleting previous test data...');
    const { error: deleteError } = await supabase
      .from('oasis_ratings')
      .delete()
      .eq('is_test_data', true);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw deleteError;
    }

    // Generate 100 participants
    console.log('Generating 100 test participants...');
    const participants = Array.from({ length: 100 }, () => generateParticipant());

    // Insert in batches
    const batchSize = 25;
    for (let i = 0; i < participants.length; i += batchSize) {
      const batch = participants.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from('oasis_ratings')
        .insert(batch);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}`);
    }

    console.log('Test data generation complete!');
    
    return new Response(
      JSON.stringify({ success: true, message: '100 test participants generated successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
