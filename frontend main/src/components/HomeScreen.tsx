import Faq from "./Faq";
import HeroSection from "./HeroSection";
import Navigation from "./Navigation";
import StoneDetect from "./StoneDetect";

export function HomeScreen() {
  return (
    <div className="">
      <Navigation />
      <HeroSection />
      <Faq />
      <StoneDetect />
    </div>
  );
}
