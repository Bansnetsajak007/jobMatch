// className="mt-2 w-full w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaBuilding, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Button from './Button';

const JobCard = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
        <p className="text-gray-600 text-sm flex items-center gap-1">
          <FaBuilding /> {job.company}
        </p>
        <p className="text-gray-600 text-sm flex items-center gap-1">
          <FaMapMarkerAlt /> {job.location || 'Location not specified'}
        </p>
        <p className="text-green-600 font-medium mt-1">🎯 Match Score: {job.matchScore}%</p>
      </div>



      {/* Apply Button */}
      <Link to={`/job/${job.id}/apply`} className="mt-4">
        <Button className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
          Apply Now
        </Button>
      </Link>
    </div>
  );
};

export default JobCard;
