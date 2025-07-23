import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameServices from "@/components/GameServices";
import Professional from "@/components/Professional";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <Hero />
      <GameServices />
      <Professional />
      <Footer />
    </div>
  );
};

export default Index;
