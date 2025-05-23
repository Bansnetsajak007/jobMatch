import { Link } from 'react-router-dom';
import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About JobMatch
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Empowering International Students to Find Their Dream Jobs Globally
          </p>
          <Link to="/register">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    Get Started
  </Button>
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-white text-lg text-center max-w-3xl mx-auto">
            JobMatch is dedicated to helping international students who are struggling to find jobs by connecting them with employers worldwide. We understand the challenges of navigating the job market as a student, especially in a foreign country. Our platform uses AI to match you with opportunities that fit your skills, education, and experience, making the job search easier and more effective.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Why Choose JobMatch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl text-secondary mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Job Matching</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze your profile and recommend jobs that align with your skills and aspirations, giving you a higher chance of success.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-secondary mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Global Opportunities</h3>
              <p className="text-gray-600">
                Access job postings from employers around the world, tailored specifically for international students seeking opportunities abroad.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-secondary mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Chat directly with employers after applying, allowing you to follow up on your application and build connections effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Job?
          </h2>
          <p className="text-lg mb-6">
            Join thousands of international students who have found their dream jobs with JobMatch.
          </p>
          <Link to="/register?role=student">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300">Sign Up as a Student</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600">
        © 2024 JobMatch Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutPage;