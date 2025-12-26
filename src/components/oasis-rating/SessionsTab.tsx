import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Star, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { OasisRating } from '@/pages/member/MemberOasisRating';

interface SessionsTabProps {
  data: OasisRating[];
  loading: boolean;
}

type SortField = 'sessions_conducted' | 'sessions_received' | 'reviews_avg' | 'age';
type SortDirection = 'asc' | 'desc';

const COLORS = ['hsl(var(--neon-purple))', 'hsl(var(--neon-green))', '#6366f1', '#8b5cf6', '#a855f7'];

const SessionsTab = ({ data, loading }: SessionsTabProps) => {
  const [sortField, setSortField] = useState<SortField>('sessions_conducted');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField] ?? 0;
    const bVal = b[sortField] ?? 0;
    return sortDirection === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
  });

  const paginatedData = sortedData.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  // Chart data
  const top10Sessions = [...data]
    .sort((a, b) => b.sessions_conducted - a.sessions_conducted)
    .slice(0, 10)
    .map(d => ({ name: d.display_name.slice(0, 10), conducted: d.sessions_conducted, received: d.sessions_received }));

  const genderDistribution = [
    { name: 'М', value: data.filter(d => d.gender === 'M').length },
    { name: 'Ж', value: data.filter(d => d.gender === 'F').length },
    { name: 'Другое', value: data.filter(d => d.gender === 'Other').length },
  ].filter(d => d.value > 0);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-muted/20 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Топ-10 по сеансам</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={top10Sessions}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="conducted" fill="hsl(var(--neon-purple))" name="Проведено" />
                <Bar dataKey="received" fill="hsl(var(--neon-green))" name="Получено" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-muted/20 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Распределение по полу</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genderDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-muted/20 border-border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Участник</TableHead>
                <TableHead>Пол</TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center gap-1">
                    Возраст <SortIcon field="age" />
                  </div>
                </TableHead>
                <TableHead>Страна</TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('sessions_conducted')}
                >
                  <div className="flex items-center gap-1">
                    Проведено <SortIcon field="sessions_conducted" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('sessions_received')}
                >
                  <div className="flex items-center gap-1">
                    Получено <SortIcon field="sessions_received" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => handleSort('reviews_avg')}
                >
                  <div className="flex items-center gap-1">
                    Рейтинг <SortIcon field="reviews_avg" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, idx) => (
                <TableRow key={item.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-muted-foreground">
                    {page * pageSize + idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{item.display_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.gender === 'M' ? 'М' : item.gender === 'F' ? 'Ж' : 'Др'}
                  </TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell className="text-neon-purple font-semibold">{item.sessions_conducted}</TableCell>
                  <TableCell className="text-neon-green font-semibold">{item.sessions_received}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{(item.reviews_avg ?? 0).toFixed(1)}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Назад
          </Button>
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            Вперёд
          </Button>
        </div>
      )}
    </div>
  );
};

export default SessionsTab;
