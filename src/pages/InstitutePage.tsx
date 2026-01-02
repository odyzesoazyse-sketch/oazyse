import Header from '@/components/Header';
import InstituteSection from '@/components/sections/InstituteSection';

const InstitutePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <InstituteSection />
      </div>
    </div>
  );
};

export default InstitutePage;
