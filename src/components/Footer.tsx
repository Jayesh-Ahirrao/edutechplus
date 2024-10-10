import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50  py-6 text-center">
            <p>&copy; 2024 EduTech+. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="hover:text-blue-400">Terms of Service</a>
                <a href="#" className="hover:text-blue-400">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400">Social Media</a>
            </div>
        </footer>
    );
}

export default Footer;