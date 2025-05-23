// className="mt-2 w-full w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"


import { Link } from 'react-router-dom';
import Button from './Button';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.company} — {job.location}</p>
      <p className="text-gray-600">Match Score: {job.matchScore}%</p>
      <Link to={`/job/${job.id}/apply`}>
        <Button className="mt-2 w-full w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">Apply Now</Button>
      </Link>
    </div>
  );
};

export default JobCard;