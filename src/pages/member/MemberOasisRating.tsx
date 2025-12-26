import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Users, DollarSign, RefreshCw, TestTube } from 'lucide-react';
import SessionsTab from '@/components/oasis-rating/SessionsTab';
import DonationsTab from '@/components/oasis-rating/DonationsTab';
import OasisFilters from '@/components/oasis-rating/OasisFilters';

export interface OasisRating {
  id: string;
  user_id: string | null;
  display_name: string;
  display_type: string;
  gender: string | null;
  age: number | null;
  country: string | null;
  sessions_conducted: number;
  sessions_received: number;
  reviews_avg: number | null;
  reviews_count: number | null;
  donations_total: number;
  donations_month: number;
  donations_year: number;
  show_in_rating: boolean;
  is_test_data: boolean;
}

export interface Filters {
  gender: string;
  ageMin: number;
  ageMax: number;
  country: string;
  search: string;
}

const MemberOasisRating = () => {
  const [data, setData] = useState<OasisRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    gender: 'all',
    ageMin: 18,
    ageMax: 65,
    country: 'all',
    search: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: ratings, error } = await supabase
        .from('oasis_ratings')
        .select('*')
        .eq('show_in_rating', true)
        .order('sessions_conducted', { ascending: false });

      if (error) throw error;
      setData(ratings || []);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      toast.error('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const generateTestData = async () => {
    setGenerating(true);
    try {
      const { error } = await supabase.functions.invoke('generate-oasis-test-data');
      
      if (error) throw error;
      
      toast.success('Тестовые данные успешно созданы!');
      await fetchData();
    } catch (error) {
      console.error('Error generating test data:', error);
      toast.error('Ошибка генерации тестовых данных');
    } finally {
      setGenerating(false);
    }
  };

  const filteredData = data.filter(item => {
    if (filters.gender !== 'all' && item.gender !== filters.gender) return false;
    if (item.age && (item.age < filters.ageMin || item.age > filters.ageMax)) return false;
    if (filters.country !== 'all' && item.country !== filters.country) return false;
    if (filters.search && !item.display_name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const countries = [...new Set(data.map(d => d.country).filter(Boolean))] as string[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground">Рейтинг Оазиса</h1>
          <p className="text-sm text-muted-foreground mt-1">Статистика участников сообщества</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={generateTestData}
            disabled={generating}
            className="gap-2 bg-neon-purple hover:bg-neon-purple/80"
          >
            <TestTube className={`w-4 h-4 ${generating ? 'animate-pulse' : ''}`} />
            {generating ? 'Генерация...' : 'Запустить тест'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-neon-purple" />
              <div>
                <p className="text-2xl font-semibold text-foreground">{data.length}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Участников</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-neon-green" />
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {data.reduce((sum, d) => sum + d.donations_total, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Донаты</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {data.reduce((sum, d) => sum + d.sessions_conducted, 0)}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Проведено</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {data.reduce((sum, d) => sum + d.sessions_received, 0)}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Получено</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <OasisFilters 
        filters={filters} 
        setFilters={setFilters} 
        countries={countries} 
      />

      {/* Tabs */}
      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="sessions" className="gap-2">
            <Users className="w-4 h-4" />
            Сеансы
          </TabsTrigger>
          <TabsTrigger value="donations" className="gap-2">
            <DollarSign className="w-4 h-4" />
            Донаты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <SessionsTab data={filteredData} loading={loading} />
        </TabsContent>

        <TabsContent value="donations">
          <DonationsTab data={filteredData} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberOasisRating;
