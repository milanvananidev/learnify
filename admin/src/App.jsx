import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Invoices from './pages/Invoices';
import Courses from './pages/Courses';
import CoursesAnalytics from './pages/CourseAnalytics';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import CreateCourse from './pages/CreateCourse/CreateCourse';
import CreateCourseMedia from './pages/CreateCourse/CreateCourseMedia';
import CreateCourseCurriculum from './pages/CreateCourse/CreateCourseCurriculum';

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/create-course-media" element={<CreateCourseMedia />} />
            <Route path="/create-course-curriculum" element={<CreateCourseCurriculum />} />
            <Route path="/courses-analytics" element={<CoursesAnalytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

const App = () => {
    const { pathname } = useLocation();
    const showSidebar = pathname !== '/login';

    return (
        <div className="flex">
            {showSidebar && <SideBar />}
            <div className="flex-grow py-4 mx-5">
                <PrivateRoutes />
            </div>
        </div>
    );
}

export default App;
