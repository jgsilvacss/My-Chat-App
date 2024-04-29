import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    console.log("-------------------------")
    console.log(tokenCookie)

  return tokenCookie ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;