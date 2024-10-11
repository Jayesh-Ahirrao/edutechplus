import axios from 'axios';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { FaChartPie } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoSettings } from 'react-icons/io5';
import { TbLogout2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FactTile from '../components/FactTile';



interface User {
    name: string;
    email: string;
}

interface SidebarButtons {
    title: string;
    icon: React.ReactNode;
    link: string;
    isUser?: boolean;
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
    const location = useLocation();


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
            link: `/dashboard`,
            isUser: true,
        },
    ], [user?.name]);

    const handleLogout = useCallback(async () => {
        await localStorage.removeItem('user');
        await setUser(null);
        navigate('/');
        window.dispatchEvent(new Event('storage'));
    }, [navigate]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (loading) {
        return (<div>
            Loading...
        </div>);
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
                            <h4 className="mb-2 text-sm md:text-xl w-fit hover:bg-gray-200 rounded-full py-2 px-3 cursor-pointer transition-all duration-200 ease-in">
                                <Link to="/" className='font-bold'>
                                    <span className="block md:hidden">ET+</span>
                                    <span className="hidden md:block">EduTech+</span>
                                </Link>
                            </h4>


                            <div >
                                <ul className="text-sm xl:text-xl font-normal flex flex-col">
                                    {sidebarMenuItems.map((item) => (
                                        <Link to={item.link} key={item.title}>
                                            <li
                                                className={`flex justify-start items-center gap-4 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-200 ease-in px-4 py-2 md:py-3 pr-6 my-1 w-fit${location.pathname === item.link ? "bg-gray-200 text-purple-600" : ""}`}
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
                        children ?
                            children :
                            (catFacts &&
                                <DashboardBody user={user} catFacts={catFacts} />
                            )
                    }
                </div>

            </div>
        </div>
    );
};


const DashboardBody: React.FC<{ user: User | null; catFacts: CatFacts[] }> = ({ user, catFacts }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
                    Welcome back, {user ? user.name : 'User'}
                </h1>
                <p className="text-lg text-start px-3 m-2 font-bold mt-8 mb-4">
                    Here’s some fun cat facts to brighten your day:
                </p>
                <div className="flex gap-2 flex-wrap text-start">
                    {catFacts.map((cat) => (
                        <FactTile fact={cat.fact} key={cat.fact} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
