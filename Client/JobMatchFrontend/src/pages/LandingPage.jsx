
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Find Your Perfect Job Match Globally
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            Powered by AI, tailored for international students
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate('/register?role=student')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Get Started as Student
            </Button>
            <Button
              onClick={() => navigate('/register?role=employer')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Get Started as Employer
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-400 text-sm border-t border-gray-700">
        © 2024 JobMatch Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

