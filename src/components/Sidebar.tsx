import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { FaChartPie } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoSettings } from 'react-icons/io5';
import { TbLogout2 } from 'react-icons/tb';
import { User, SidebarButtons } from '../constants/types';

interface SidebarProps {
    user: User | null;
    onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(({ user, onLogout }) => {
    const location = useLocation();
    const sidebarMenuItems: SidebarButtons[] = useMemo(() => [
        { title: "My Courses", icon: <GoHomeFill />, link: "/mycourses" },
        { title: "Analytics", icon: <FaChartPie />, link: "/analytics" },
        { title: "Account Settings", icon: <IoSettings />, link: "#" },
        { title: user?.name || "User", icon: <BiUser />, link: `/dashboard`, isUser: true },
    ], [user?.name]);

    return (
        <div className="col-span-2 md:col-span-3 pt-1 sm:pl-4 flex flex-col justify-between max-h-[90vh] sticky top-0">
            <div className="menuitems">
                <h4 className="mb-2 text-sm md:text-xl w-fit hover:bg-gray-200 rounded-full py-2 px-3 cursor-pointer transition-all duration-200 ease-in">
                    <Link to="/" className='font-bold'>
                        <span className="block md:hidden">ET+</span>
                        <span className="hidden md:block">EduTech+</span>
                    </Link>
                </h4>
                <ul className="text-sm xl:text-xl font-normal flex flex-col">
                    {sidebarMenuItems.map(item => (
                        <Link to={item.link} key={item.title}>
                            <li className={`flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200 ease-in px-4 py-2 md:py-3 pr-6 my-1 w-fit${location.pathname === item.link ? "bg-gray-200 text-purple-600" : ""}`}>
                                <span className="text-2xl lg:text-3xl ">{item.icon}</span>
                                <span className="hidden md:inline">{item.title}</span>
                            </li>
                        </Link>
                    ))}
                    <div key="logout" onClick={onLogout}>
                        <li className="flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200 ease-in px-4 py-2 md:py-3 pr-6 my-1 w-fit">
                            <span className="text-2xl lg:text-3xl">{<TbLogout2 />}</span>
                            <span className="hidden md:inline">Logout</span>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
});
