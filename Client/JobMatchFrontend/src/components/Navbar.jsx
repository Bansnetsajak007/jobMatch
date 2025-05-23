// import { useAuth } from '../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold text-primary">
//         JobMatch
//       </Link>
//       <div className="space-x-4">
//         <Link to="/" className="text-gray-600 hover:text-primary">
//           Home
//         </Link>
//         <Link to="/about" className="text-gray-600 hover:text-primary">
//           About
//         </Link>
//         {user ? (
//           <>
//             <Link
//               to={`/${user.role}/dashboard`}
//               className="text-gray-600 hover:text-primary"
//             >
//               Dashboard
//             </Link>
//             {user.role === 'student' && (
//               <Link
//                 to="/student/profile"
//                 className="text-gray-600 hover:text-primary"
//               >
//                 Profile
//               </Link>
//             )}
//             {user.role === 'employer' && (
//               <Link
//                 to="/employer/profile"
//                 className="text-gray-600 hover:text-primary"
//               >
//                 Profile
//               </Link>
//             )}
//             <button
//               onClick={handleLogout}
//               className="text-gray-600 hover:text-primary"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="text-gray-600 hover:text-primary">
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return null; // Don't show the navbar while loading user state
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">
        JobMatch
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-primary">
          Home
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-primary">
          About
        </Link>
        {user ? (
          <>
            <Link
              to={`/${user.role}/dashboard`}
              className="text-gray-600 hover:text-primary"
            >
              Dashboard
            </Link>
            {user.role === 'student' && (
              <Link
                to="/student/profile"
                className="text-gray-600 hover:text-primary"
              >
                Profile
              </Link>
            )}
            {user.role === 'employer' && (
              <Link
                to="/employer/profile"
                className="text-gray-600 hover:text-primary"
              >
                Profile
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show "Register" as the primary button when not logged in */}
            <Link
              to="/register"
              className="text-gray-600 hover:text-primary"
            >
              Register
            </Link>
            {/* Show "Login" as a secondary link */}
            <Link to="/login" className="text-gray-600 hover:text-primary">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;