// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Button from '../components/Button';

// const RegisterPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const role = new URLSearchParams(location.search).get('role') || 'student';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(email, password, role);
//       navigate(`/${role}/dashboard`);
//     } catch (err) {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Register as {role.charAt(0).toUpperCase() + role.slice(1)}
//         </h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
// <Button
//   type="submit"
//   className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
//   Register
// </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, role);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
        </h2>

        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            className={`px-4 py-1 rounded-full border ${role === 'student' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded-full border ${role === 'employer' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setRole('employer')}
          >
            Employer
          </button>
        </div>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <div className="flex items-center border rounded px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <div className="flex items-center border rounded px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
            Register as {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
