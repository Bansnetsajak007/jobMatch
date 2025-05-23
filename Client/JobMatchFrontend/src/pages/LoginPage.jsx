
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Button from '../components/Button';
// import axios from 'axios';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       const { user } = useAuth();
//       if (user.role === 'student') {
//         const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/student/profile');
//         const profile = res.data;
//         let filledFields = 0;
//         let totalFields = 0;

//         const basicFields = ['firstName', 'lastName', 'address'];
//         totalFields += basicFields.length;
//         filledFields += basicFields.filter(field => profile[field] && profile[field].trim() !== '').length;

//         totalFields += profile.education.length * 4;
//         profile.education.forEach(edu => {
//           if (edu.institution) filledFields++;
//           if (edu.degree) filledFields++;
//           if (edu.startDate) filledFields++;
//           if (edu.endDate) filledFields++;
//         });

//         totalFields += profile.experience.length * 5;
//         profile.experience.forEach(exp => {
//           if (exp.company) filledFields++;
//           if (exp.role) filledFields++;
//           if (exp.startDate) filledFields++;
//           if (exp.endDate) filledFields++;
//           if (exp.description) filledFields++;
//         });

//         totalFields += 1;
//         if (profile.skills.length > 0) filledFields++;

//         totalFields += 1;
//         if (profile.resume) filledFields++;

//         const percentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

//         if (percentage < 50) {
//           navigate('/student/profile');
//         } else {
//           navigate('/student/dashboard');
//         }
//       } else if (user.role === 'employer') {
//         try {
//           await axios.get('https://jobmatch-ixrz.onrender.com/api/employer/profile');
//           navigate('/employer/dashboard');
//         } catch (error) {
//           // Profile not found, redirect to create profile
//           navigate('/employer/profile');
//         }
//       }
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
//           <Button type="submit" className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
//              Login
//           </Button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on profile completion after login
    if (user) {
      if (user.role === 'student') {
        const checkProfile = async () => {
          try {
            const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/student/profile', {
              withCredentials: true,
            });
            const profile = res.data;
            let filledFields = 0;
            let totalFields = 0;

            const basicFields = ['firstName', 'lastName', 'address'];
            totalFields += basicFields.length;
            filledFields += basicFields.filter(field => profile[field] && profile[field].trim() !== '').length;

            totalFields += profile.education.length * 4;
            profile.education.forEach(edu => {
              if (edu.institution) filledFields++;
              if (edu.degree) filledFields++;
              if (edu.startDate) filledFields++;
              if (edu.endDate) filledFields++;
            });

            totalFields += profile.experience.length * 5;
            profile.experience.forEach(exp => {
              if (exp.company) filledFields++;
              if (exp.role) filledFields++;
              if (exp.startDate) filledFields++;
              if (exp.endDate) filledFields++;
              if (exp.description) filledFields++;
            });

            totalFields += 1;
            if (profile.skills.length > 0) filledFields++;

            totalFields += 1;
            if (profile.resume) filledFields++;

            const percentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

            if (percentage < 50) {
              navigate('/student/profile');
            } else {
              navigate('/student/dashboard');
            }
          } catch (error) {
            // Profile not found, redirect to create profile
            navigate('/student/profile');
          }
        };
        checkProfile();
      } else if (user.role === 'employer') {
        const checkEmployerProfile = async () => {
          try {
            // await axios.get('https://jobmatch-ixrz.onrender.com/api/employer/profile', {
            //   withCredentials: true,
            // });
            navigate('/employer/profile');
          } catch (error) {
            // Profile not found, redirect to create profile
            navigate('/employer/profile');
          }
        };
        checkEmployerProfile();
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Redirect happens via useEffect
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Invalid credentials');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;