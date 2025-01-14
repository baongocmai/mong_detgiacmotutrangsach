import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Homepage from "./pages/Homepage/Homepage";
import LoginForm from "./pages/LoginForm/LoginForm";
import ForgotPassword from "./pages/LoginForm/ForgotPassword";
import OTPInput from "./pages/LoginForm/OTPInput";
import Reset from "./pages/LoginForm/Reset";
import Layout from './components/Layout/Layout';
import AdminAccount from "./pages/AdminAccount/AdminAccount";
import Dashboard from './pages/Dashboard/Dashboard';
import UsersManagement from './pages/Users/UsersManagement';
import StoriesManagement from './pages/Stories/StoriesManagement';
import Comments from './pages/Comments/Comments';
import Report from './pages/Report/Report';
import Settings from './pages/Settings/Settings';
import AdminManagement from './pages/AdminManagement/AdminManagement';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/forgot/otp" element={<OTPInput />} />
            <Route path="/reset" element={<Reset />} />
            <Route element={<Layout />}>
                <Route path = "/AdminAccount" element={<AdminAccount />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Users" element={<UsersManagement />} />
                <Route path="/Stories" element={<StoriesManagement />} />
                <Route path="/Comments" element={<Comments />} />
                <Route path="/Report" element={<Report />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/AdminManagement" element={<AdminManagement />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Homepage from "./pages/Homepage/Homepage";
// import LoginForm from "./pages/LoginForm/LoginForm";
// import ForgotPassword from "./pages/LoginForm/ForgotPassword";
// import OTPInput from "./pages/LoginForm/OTPInput";
// import Reset from "./pages/LoginForm/Reset";
// import Layout from './components/Layout/Layout';
// import AdminAccount from "./pages/AdminAccount/AdminAccount";
// import Dashboard from './pages/Dashboard/Dashboard';
// import UsersManagement from './pages/Users/UsersManagement';
// import StoriesManagement from './pages/Stories/StoriesManagement';
// import Comments from './pages/Comments/Comments';
// import Report from './pages/Report/Report';
// import Settings from './pages/Settings/Settings';
// import AdminManagement from './pages/AdminManagement/AdminManagement";
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//           <Routes>
//               <Route path="/" element={<Homepage />} />
//               <Route path="/LoginForm" element={<LoginForm />} />
//               <Route path="/forgot" element={<ForgotPassword />} />
//               <Route path="/forgot/otp" element={<OTPInput />} />
//               <Route path="/reset" element={<Reset />} />
//               <Route element={<Layout />}>
//                   <Route path = "/AdminAccount" element={<AdminAccount />} />
//                   <Route path="/Dashboard" element={<Dashboard />} />
//                   <Route path="/Users" element={<UsersManagement />} />
//                   <Route path="/Stories" element={<StoriesManagement />} />
//                   <Route path="/Comments" element={<Comments />} />
//                   <Route path="/Report" element={<Report />} />
//                   {/* Chỉ superadmin mới truy cập được Settings */}
//                   <Route
//                     path="/Settings"
//                     element={
//                       <ProtectedRoute allowedRoles={['superadmin']}>
//                         <Settings />
//                       </ProtectedRoute>
//                     }
//                   />
//                   {/* Chỉ superadmin mới truy cập được AdminManagement */}
//                   <Route
//                     path="/AdminManagement"
//                     element={
//                       <ProtectedRoute allowedRoles={['superadmin']}>
//                         <AdminManagement />
//                       </ProtectedRoute>
//                     }
//                   />
//               </Route>
//           </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
