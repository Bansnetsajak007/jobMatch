// import { useNavigate } from 'react-router-dom';
// import Button from '../components/Button';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex-grow bg-primary text-white flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-5xl font-bold mb-4">
//             FIND YOUR PERFECT JOB MATCH GLOBALLY
//           </h1>
//           <p className="text-lg mb-6">
//             Powered by AI, tailored for international students
//           </p>
//           <div className="space-x-4">
//             <Button onClick={() => navigate('/register?role=student')}>
//               Get Started as Student
//             </Button>
//             <Button onClick={() => navigate('/register?role=employer')}>
//               Get Started as Employer
//             </Button>
//           </div>
//         </div>
//       </div>
//       <footer className="text-center py-4 text-gray-600">
//         © 2024 JobMatch Platform. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// import { useNavigate } from 'react-router-dom';
// import Button from '../components/Button';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
//         <h1 className="text-xl font-bold text-primary">JobMatch</h1>
//         <nav className="space-x-6">
//           <a href="#" className="text-gray-700 hover:text-primary">Home</a>
//           <a href="#" className="text-gray-700 hover:text-primary">About</a>
//           <a href="#" className="text-gray-700 hover:text-primary">Login</a>
//           <Button className="!bg-primary !text-white !px-4 !py-1 !text-sm">Register</Button>
//         </nav>
//       </header>

//       {/* Main Section */}
// <main className="flex-grow bg-gray-900 text-white flex items-center justify-center px-4">
//   <div className="text-center max-w-2xl">
//     <h2 className="text-4xl font-bold mb-4">
//       Find Your Perfect Job Match Globally
//     </h2>
//     <p className="text-lg mb-6 text-gray-300">
//       Powered by AI, tailored for international students
//     </p>
//     <div className="flex flex-col sm:flex-row justify-center gap-4">
//       <Button
//         onClick={() => navigate('/register?role=student')}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow"
//       >
//         Get Started as Student
//       </Button>
//       <Button
//         onClick={() => navigate('/register?role=employer')}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow"
//       >
//         Get Started as Employer
//       </Button>
//     </div>
//   </div>
// </main>

//       {/* Footer */}
//       <footer className="text-center py-4 text-gray-600 text-sm">
//         © 2024 JobMatch Platform. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;




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

