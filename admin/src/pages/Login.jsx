import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../redux/features/auth/authApi';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [login, { data, error, isSuccess }] = useLoginMutation();

    useEffect(() => {
        if (data) {
            if (data.user.role !== 'admin') {
                setIsLoading(false);
                return toast.error("Invalid email/username or password")
            }

            window.location.href = '/dashboard'
        };

        if (error) {
            setIsLoading(false);
            toast.error(error.data?.message)
        }
    }, [data, isSuccess, error])


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        login({
            login: email,
            password
        });
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-8 px-6">
                <div className="w-full max-w-lg bg-white rounded-lg shadow dark:border sm:max-w-md lg:max-w-xl dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="mb-9 text-2xl font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="flex items-center space-x-2">
                                <span>Login To <span className='text-primary font-bold'>Learnify Admin</span> account</span>
                            </a>
                            <hr className='mt-2' />
                        </div>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email / Username
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="john@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="*********"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                {isLoading ? 'Loading...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login