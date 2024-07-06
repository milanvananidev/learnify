import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Invoices from './pages/Invoices';
import Courses from './pages/Courses';
import CourseAnytics from './pages/CourseAnalytics';
import Notifications from './pages/Notifications';
import CreateCourse from './pages/CreateCourse';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Admin />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/users",
        element: <Users />
    },
    {
        path: "/invoices",
        element: <Invoices />
    },
    {
        path: "/courses",
        element: <Courses />
    },
    {
        path: "/create-course",
        element: <CreateCourse />
    },
    {
        path: "/courses-analytics",
        element: <CourseAnytics />
    },
    {
        path: "/notifications",
        element: <Notifications />
    },

]);

export default router;