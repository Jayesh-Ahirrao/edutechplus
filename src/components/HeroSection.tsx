const HeroSection: React.FC = () => {
    return (
        <section id="home" className="h-screen bg-gray-100 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to EduTech+
        </h1>
        <p className="text-xl mb-6">
          The future of learning, simplified.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700">
          Join Now
        </button>
      </section>
    );
};

export default HeroSection;
