import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useAuth();

  // Kiểm tra nếu vai trò không thuộc allowedRoles
  if (!allowedRoles.includes(userRole)) {
    return <div>Permission Denied</div>; // Hiển thị thông báo
  }

  return children;
};

export default ProtectedRoute;
