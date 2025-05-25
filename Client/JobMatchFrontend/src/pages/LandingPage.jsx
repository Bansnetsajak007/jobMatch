import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import Button from '../components/Button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://img.freepik.com/premium-photo/business-finance-employment-female-successful-entrepreneurs-concept-smiling-pleased-businesswoman-praise-coworker-who-made-good-point-pointing-finger-camera-satisfied-hold-laptop_1258-59127.jpg?semt=ais_hybrid&w=740',
  'https://img.freepik.com/premium-vector/online-recruitment-with-businessman-searching-new-employees-smartphone-illustration_138260-1114.jpg?semt=ais_hybrid&w=740',
  'https://img.freepik.com/premium-vector/online-recruitment-with-businessman-searching-new-employees-smartphone-illustration_138260-1114.jpg?semt=ais_hybrid&w=740',
];

const LandingPage = () => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Hero Section */}
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12">
        {/* Left Text Section */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-xl space-y-6 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Your Perfect Job Match Globally
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Powered by AI, tailored for international students.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
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
        </motion.div>

        {/* Right Image Slider */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <Slider {...sliderSettings}>
            {images.map((src, idx) => (
              <img key={idx} src={src} alt={`Slide ${idx}`} className="w-full h-[400px] object-cover" />
            ))}
          </Slider>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-400 text-sm border-t border-gray-800">
        © 2024 JobMatch Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
