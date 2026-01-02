import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SalesPage from './SalesPage';

const MetahumanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="flex items-center h-12 px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>
        </div>
      </header>
      <div className="pt-12">
        <SalesPage />
      </div>
    </div>
  );
};

export default MetahumanPage;
