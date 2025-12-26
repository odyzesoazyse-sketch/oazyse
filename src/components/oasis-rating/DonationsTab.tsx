import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Trophy, Medal, Award, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { OasisRating } from '@/pages/member/MemberOasisRating';

interface DonationsTabProps {
  data: OasisRating[];
  loading: boolean;
}

type DonationPeriod = 'total' | 'month' | 'year';
type SortDirection = 'asc' | 'desc';

const COLORS = ['#fbbf24', '#a78bfa', '#34d399', '#f472b6', '#60a5fa'];

const DonationsTab = ({ data, loading }: DonationsTabProps) => {
  const [period, setPeriod] = useState<DonationPeriod>('total');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const getDonationValue = (item: OasisRating) => {
    switch (period) {
      case 'month': return item.donations_month;
      case 'year': return item.donations_year;
      default: return item.donations_total;
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = getDonationValue(a);
    const bVal = getDonationValue(b);
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const paginatedData = sortedData.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  // Chart data
  const top10Donations = sortedData.slice(0, 10).map(d => ({
    name: d.display_name.slice(0, 10),
    amount: getDonationValue(d)
  }));

  const getRankIcon = (index: number) => {
    const rank = page * pageSize + index;
    if (rank === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 2) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 text-center text-muted-foreground">{rank + 1}</span>;
  };

  const periodLabels: Record<DonationPeriod, string> = {
    total: 'Всего',
    month: 'За месяц',
    year: 'За год'
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Period Toggle */}
      <div className="flex justify-center gap-2">
        {(['total', 'month', 'year'] as DonationPeriod[]).map((p) => (
          <Button
            key={p}
            variant={period === p ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod(p)}
            className={period === p ? 'bg-neon-green hover:bg-neon-green/80 text-background' : ''}
          >
            {periodLabels[p]}
          </Button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-muted/20 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Топ-10 донатеров ({periodLabels[period]})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={top10Donations} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                <Tooltip formatter={(value) => [`$${value}`, 'Сумма']} />
                <Bar dataKey="amount" fill="hsl(var(--neon-green))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-muted/20 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Распределение донатов</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={top10Donations}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {top10Donations.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Сумма']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card className="bg-muted/20 border-border">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Участник</TableHead>
                <TableHead>Пол</TableHead>
                <TableHead>Возраст</TableHead>
                <TableHead>Страна</TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground"
                  onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
                >
                  <div className="flex items-center gap-1">
                    Сумма {sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, idx) => (
                <TableRow key={item.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium">
                    {getRankIcon(idx)}
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
                    {item.gender === 'male' ? 'М' : item.gender === 'female' ? 'Ж' : 'Др'}
                  </TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell className="text-neon-green font-bold text-lg">
                    ${getDonationValue(item).toLocaleString()}
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

export default DonationsTab;
