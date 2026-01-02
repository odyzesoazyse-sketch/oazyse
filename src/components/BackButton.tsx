import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="p-1 text-foreground hover:text-foreground/70 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
    </button>
  );
};

export default BackButton;
