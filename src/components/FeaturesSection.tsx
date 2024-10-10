import React from 'react';

const FeaturesSection: React.FC = () => {
    const features = [
        { title: 'Interactive Courses', description: 'Engage with hands-on learning' },
        { title: 'Expert Tutors', description: 'Learn from industry experts' },
        { title: 'Flexible Schedules', description: 'Study at your own pace' }
    ];

    return (
        <section id="features" className="py-20 bg-white text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose EduTech+</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 border rounded-lg shadow-md bg-white hover:bg-gray-50 hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
                    >
                        <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
