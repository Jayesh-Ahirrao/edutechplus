import axios from 'axios';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { FaChartPie } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoSettings } from 'react-icons/io5';
import { TbLogout2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface User {
    name: string;
    email: string;
}

interface SidebarButtons {
    title: string;
    icon: React.ReactNode;
    link: string;
}

interface Props {
    children?: ReactNode;
}
interface CatFacts {
    fact: string;
}


const Dashboard: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [catFacts, setCatFacts] = useState<CatFacts[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // const response = await axios.request(options);
                const response = await axios.get('https://catfact.ninja/facts');
                setCatFacts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);


    const sidebarMenuItems: SidebarButtons[] = useMemo(() => [

        {
            title: "My Courses",
            icon: <GoHomeFill />,
            link: "/mycourses",
        },
        {
            title: "Analytics",
            icon: <FaChartPie />,
            link: "/analytics",
        },
        {
            title: "Account Settings",
            icon: <IoSettings />,
            link: "#",
        },
        {
            title: user?.name || "User",
            icon: <BiUser />,
            link: `#`,
        },
    ], [user?.name]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (

        <div>
            <div className="grid grid-cols-12 min-h-screen ">
                {/* left sidebar */}

                <div className="col-span-2 md:col-span-3 pt-1  sm:pl-4  flex flex-col justify-between max-h-[90vh] sticky top-0">

                    <div className="min-h-[70vh] flex flex-col justify-between ">
                        <div className="menuitems">
                            <p className="mb-2  text-sm  md:text-xl w-fit hover:bg-gray-200 rounded-full py-2 px-3 cursor-pointer transition-all duration-200 ease-in">
                                <Link to="/" > EduTech+</Link>
                            </p>

                            <div >
                                {" "}
                                {/* Adjust max-height as needed */}
                                <ul className="text-sm xl:text-xl font-normal flex flex-col">
                                    {sidebarMenuItems.map((item) => (
                                        <Link to={item.link} key={item.title}>
                                            <li
                                                className="flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200 ease-in px-4 py-2 md:py-3 pr-6 my-1 w-fit "
                                                key={item.title}
                                            >
                                                <span className="text-2xl lg:text-3xl ">{item.icon}</span>
                                                <span className=" hidden md:inline" >{item.title}</span>
                                            </li>
                                        </Link>
                                    ))}
                                    <div key="logout" onClick={handleLogout} >
                                        <li
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200 ease-in px-4 py-2 md:py-3 pr-6 my-1 w-fit "
                                        >
                                            <span className="text-2xl lg:text-3xl ">{<TbLogout2 />}</span>
                                            <span className=" hidden md:inline" >Logout</span>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" col-span-10 md:col-span-9 custom-colspan min-h-screen">
                    {
                        children ? children : (
                            catFacts?.map((cat) => <p key={cat.fact}>{cat.fact}</p>)
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
