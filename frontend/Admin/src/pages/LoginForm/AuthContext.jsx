import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // null, "admin", or "superadmin"

  // Giả sử login thành công sẽ gán role
  const login = (role) => {
    setUserRole(role); // Role sẽ được lấy từ backend
  };

  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
