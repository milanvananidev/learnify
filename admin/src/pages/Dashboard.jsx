import React from 'react';
import Authenticated from '../utils/Authenticated';
import InfoCard from '../components/InfoCard';

const dashboardData = [
  {
    title: 'Total Students',
    info: '250'
  },
  {
    title: 'Total Courses',
    info: '20'
  },
  {
    title: 'Total Earnings',
    info: '₹5999'
  },
]

const Dashboard = () => {
  return (
    <Authenticated>
      <div className='flex gap-5'>
        {
          dashboardData.map((info) => {
            return <InfoCard {...info} />
          })
        }
      </div>
    </Authenticated>
  );
}

export default Dashboard;
