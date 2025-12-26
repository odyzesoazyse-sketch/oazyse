import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';
import type { Filters } from '@/pages/member/MemberOasisRating';

interface OasisFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  countries: string[];
}

const OasisFilters = ({ filters, setFilters, countries }: OasisFiltersProps) => {
  return (
    <Card className="bg-muted/20 border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Фильтры</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-9 bg-background border-border"
            />
          </div>

          {/* Gender */}
          <Select
            value={filters.gender}
            onValueChange={(value) => setFilters({ ...filters, gender: value })}
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Пол" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="M">Мужской</SelectItem>
              <SelectItem value="F">Женский</SelectItem>
              <SelectItem value="Other">Другое</SelectItem>
            </SelectContent>
          </Select>

          {/* Country */}
          <Select
            value={filters.country}
            onValueChange={(value) => setFilters({ ...filters, country: value })}
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Страна" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все страны</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Age Range */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Возраст: {filters.ageMin} - {filters.ageMax}</span>
            </div>
            <Slider
              value={[filters.ageMin, filters.ageMax]}
              min={18}
              max={65}
              step={1}
              onValueChange={([min, max]) => setFilters({ ...filters, ageMin: min, ageMax: max })}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OasisFilters;
