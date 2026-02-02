import AccreditationSection from "./Components/Accreditation";
import ClientsSections from "./Components/Clients";
import Footer from "./Components/Footer";
import ConsultationsSection from "./Components/FreeConsultations";
import Hero from "./Components/HeroSection";
import AboutSection from "./Components/LearnAbout";
import Navbar from "./Components/NavBar";
import SolutionsCTA from "./Components/SolutionsCTA";
import SuccessStory from "./Components/SuccessStory";
import WhySection from "./Components/Why";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SolutionsCTA />
      <AboutSection />
      <AccreditationSection />
      <SuccessStory />
      <WhySection />
      <ClientsSections />
      <ConsultationsSection />
      <Footer />
    </>
  );
}
