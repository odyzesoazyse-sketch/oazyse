import Header from '@/components/Header';
import OazyseSection from '@/components/sections/OazyseSection';

const OazysePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-10">
        <OazyseSection />
      </div>
    </div>
  );
};

export default OazysePage;
