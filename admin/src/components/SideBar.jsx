import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaFileInvoice, FaBook, FaChartLine, FaBell } from 'react-icons/fa';
import { IoMdAddCircle } from "react-icons/io";
import logo from '../assets/logo.png';
import icon from '../assets/icon.png';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false); // State to manage sub-menu visibility

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard', },
        {
            name: 'Courses',
            icon: <FaBook />,
            path: '/courses',
            subItems: [
                { name: 'Create course', path: '/create-course', icon: <IoMdAddCircle /> },
            ],
        },
        { name: 'Invoices', icon: <FaFileInvoice />, path: '/invoices' },
        { name: 'Users', icon: <FaUsers />, path: '/users' },
        { name: 'Courses Analytics', icon: <FaChartLine />, path: '/courses-analytics' },
        { name: 'Notifications', icon: <FaBell />, path: '/notifications' },
    ];

    return (
        <div className="h-[100vh] w-[18%] min-w-[18%] text-black flex flex-col">
            <div className="border-2 m-4 rounded-md">
                <div className="flex flex-col items-center w-full rounded-md rounded-b-none bg-primary">
                    <img className="w-20 h-20 m-3 rounded-full border-4 border-white shadow-lg" src={icon} alt="Profile Image" />
                </div>

                <div className='my-2'>
                    <h2 className="text-lg font-semibold text-center">Leanify</h2>
                    <p className="text-gray-600 font-regular text-center">Admin</p>
                </div>

                <div className='m-4'>
                    <button className='bg-primary w-full py-2 rounded-md text-white font-semibold text-lg' onClick={()=>{navigate('/create-course')}}>
                       <span> Add a course </span>
                    </button>
                </div>
            </div>
            <nav className="flex-grow border-2 m-4 mt-[10px] rounded-md">
                {menuItems.map((item) => (
                    <div key={item.name}>
                        <div
                            className={`flex items-center my-5 px-4  cursor-pointer transition-colors duration-200 ${location.pathname === item.path
                                ? 'text-primary'
                                : ' text-black hover:text-primary'
                                }`}
                            onClick={() => {
                                navigate(item.path);
                            }}
                        >
                            <span className={`mr-3 text-lg `}>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default SideBar;
