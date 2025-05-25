import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-indigo-800 via-purple-900 to-gray-900">
        <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative max-w-4xl mx-auto text-center z-10"
        >
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            About <span className="text-purple-400">JobMatch</span>
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Empowering International Students to Find Their Dream Jobs Globally
          </p>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            JobMatch is dedicated to helping international students struggling to find jobs by connecting them with employers worldwide. We use AI to match you with opportunities that fit your skills and education, making your job search easier and more effective.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose JobMatch?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Job Matching",
                desc: "Our smart AI recommends jobs based on your skills and profile to boost your chances of success.",
              },
              {
                icon: "🌍",
                title: "Global Opportunities",
                desc: "Access curated job listings from around the world, tailored for international students.",
              },
              {
                icon: "💬",
                title: "Direct Communication",
                desc: "Chat with employers directly to follow up on your application and build your network.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center border border-gray-200"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-gray-800 text-white py-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Job?</h2>
          <p className="text-lg mb-6 text-gray-300">
            Join thousands of students who have landed their dream jobs with JobMatch.
          </p>
          <Link to="/register?role=student">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              Sign Up as a Student
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 bg-gray-950 border-t border-gray-800">
        © 2024 JobMatch Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
