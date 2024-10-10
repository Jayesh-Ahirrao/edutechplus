
const Navbar = () => {
    return (
        <nav className="flex justify-between items-center w-[100%] mx-auto h-20">
        <div className="max-h-fit logo text-xl text-center font-bold">EduTech+</div>
  
        <ul className="flex space-x-6 list-none">
          <li><a href="#home" className="hover:text-blue-400 p-1">Home</a></li>
          <li><a href="#about" className="hover:text-blue-400 p-1">About</a></li>
          <li><a href="#courses" className="hover:text-blue-400 p-1">Courses</a></li>
          <li><a href="#contact" className="hover:text-blue-400 p-1">Contact</a></li>
        </ul>
      </nav>
    )
}

export default Navbar;