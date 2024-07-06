import React, { useState } from 'react';
import { FaTachometerAlt, FaUsers, FaFileInvoice, FaBook, FaChartLine, FaBell } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
        { name: 'Users', icon: <FaUsers />, path: '/users' },
        { name: 'Invoices', icon: <FaFileInvoice />, path: '/invoices' },
        { name: 'Courses', icon: <FaBook />, path: '/courses' },
        { name: 'Courses Analytics', icon: <FaChartLine />, path: '/courses-analytics' },
        { name: 'Notifications', icon: <FaBell />, path: '/notifications' },
    ];

    return (
        <div className="h-[100vh] w-[15%] bg-white text-black flex flex-col border-r-2 border-r-slate-150">
            <div className="flex items-center p-6">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>
            <nav className="flex-grow">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center mx-4 my-2 px-4 py-3 cursor-pointer transition-colors duration-200 ${location.pathname === item.path
                                ? 'bg-primary text-white rounded-lg'
                                : 'bg-white text-black hover:bg-primary hover:text-white rounded-lg'
                            }`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default SideBar;
