import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserDataQuery } from '../redux/features/api/apiSlice';
import SideBar from '../components/SideBar';

const Admin = () => {
  const navigate = useNavigate();
  const { data, error, isSuccess } = useGetUserDataQuery();

  useEffect(() => {
    if (error) {
      console.error('Error fetching user data:', error);
      return navigate('/login');
    }

    if (isSuccess && data && data.user.role !== 'admin') {
      return navigate('/login');
    }
  }, [isSuccess, error]);


  return (
    <div className='flex h-[200vh]'>
      <div className='1500px:w-[16%] w-1/5'>
        <SideBar />
      </div>

      <div className='w-[85%]'>

      </div>
    </div>
  )
};

export default Admin;
