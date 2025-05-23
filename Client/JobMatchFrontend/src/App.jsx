// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import StudentDashboard from './pages/StudentDashboard';
// import EmployerDashboard from './pages/EmployerDashboard';
// import JobApplicationPage from './pages/JobApplicationPage';
// import AboutPage from './pages/AboutPage';
// import StudentProfilePage from './pages/StudentProfilePage';
// import EmployerProfilePage from './pages/EmployerProfilePage'; // Add this import

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-100">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/student/dashboard" element={<StudentDashboard />} />
//             <Route path="/student/profile" element={<StudentProfilePage />} />
//             <Route path="/employer/dashboard" element={<EmployerDashboard />} />
//             <Route path="/employer/profile" element={<EmployerProfilePage />} /> {/* Add this route */}
//             <Route path="/job/:id/apply" element={<JobApplicationPage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import JobApplicationPage from './pages/JobApplicationPage';
import AboutPage from './pages/AboutPage';
import StudentProfilePage from './pages/StudentProfilePage';
import EmployerProfilePage from './pages/EmployerProfilePage';

// A wrapper component to handle redirection based on auth state
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// A component to redirect logged-in users away from public pages
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/profile"
              element={
                <ProtectedRoute>
                  <StudentProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/profile"
              element={
                <ProtectedRoute>
                  <EmployerProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/:id/apply"
              element={
                <ProtectedRoute>
                  <JobApplicationPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;