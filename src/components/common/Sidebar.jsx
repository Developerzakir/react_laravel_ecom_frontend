import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {

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
    <div>
        <div className="card shadow mb-5 sidebar">
                <div className="card-body p-4">
                  <ul>
                    <li>
                      <a href="">Dashboard</a>
                    </li>
                    <li>
                      <Link to="/admin/categories">Categories</Link>
                    </li>
                    <li>
                      <Link to="/admin/brands">Brands</Link>
                    </li>
                    <li>
                    <Link to="/admin/products">Products</Link>
                    </li>
                    <li>
                      <a href="">Orders</a>
                    </li>
                    <li>
                      <a href="">Users</a>
                    </li>
                    <li>
                      <a href="">Shipping</a>
                    </li>
                    <li>
                      <a href="">Change Password</a>
                    </li>
                    <li>
                      <a href="" onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
    </div>
  )
}

export default Sidebar