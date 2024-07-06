import React from 'react';
import Authenticated from '../utils/Authenticated';

const Dashboard = () => {
  return (
    <Authenticated>
      <h1>Welcome to the Dashboard!</h1>
      {/* Add more content for authenticated users */}
    </Authenticated>
  );
}

export default Dashboard;
