import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PopularGames from "@/components/PopularGames";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <Hero />
      <Services />
      <PopularGames />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
