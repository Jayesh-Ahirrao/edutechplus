import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";


const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    )
}

export default LandingPage;