import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center w-full mx-auto h-20">
            <div className="max-h-fit logo text-xl text-center font-bold">EduTech+</div>

            <ul className="md:flex hidden space-x-6 list-none">
                <li><Link to="#home" className="hover:text-blue-400 p-1">Home</Link></li>
                <li><Link to="#about" className="hover:text-blue-400 p-1">About</Link></li>
                <li><Link to="/mycourses" className="hover:text-blue-400 p-1">Courses</Link></li>
                <li><Link to="#contact" className="hover:text-blue-400 p-1">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
