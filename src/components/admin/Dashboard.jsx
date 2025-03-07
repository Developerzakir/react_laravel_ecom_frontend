import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // const {logout} = useContext(AdminAuthContext);

    const authContext = useContext(AdminAuthContext);

    if (!authContext) {
      return <p>Loading...</p>;
    }
  
    const { logout } = authContext;
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate("/admin/login");
    };

    
  return (
    <Layout>
        <h1>Dashboard</h1>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </Layout>
  )
}

export default Dashboard