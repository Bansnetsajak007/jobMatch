import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'student') {
        const checkProfile = async () => {
          try {
            const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/student/profile', {
              withCredentials: true,
            });

            const profile = res.data;
            let filled = 0;
            let total = ['firstName', 'lastName', 'address'].length;

            filled += ['firstName', 'lastName', 'address'].filter(k => profile[k]?.trim()).length;

            profile.education.forEach(e => {
              total += 4;
              filled += ['institution', 'degree', 'startDate', 'endDate'].filter(k => e[k]?.trim()).length;
            });

            profile.experience.forEach(e => {
              total += 5;
              filled += ['company', 'role', 'startDate', 'endDate', 'description'].filter(k => e[k]?.trim()).length;
            });

            total += 1;
            if (profile.skills.length) filled++;

            total += 1;
            if (profile.resume) filled++;

            const percent = Math.round((filled / total) * 100);
            navigate(percent < 50 ? '/student/profile' : '/student/dashboard');
          } catch {
            navigate('/student/profile');
          }
        };
        checkProfile();
      } else if (user.role === 'employer') {
        navigate('/employer/profile');
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password, role); // pass role to login function
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

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
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
