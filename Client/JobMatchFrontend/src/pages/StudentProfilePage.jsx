import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const StudentProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    address: '',
    education: [{ institution: '', degree: '', startDate: '', endDate: '' }],
    experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    resume: '',
    skills: [],
  });
  const [newSkill, setNewSkill] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/student/profile');
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...profile[section]];
      updatedSection[index][name] = value;
      setProfile({ ...profile, [section]: updatedSection });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [...profile.education, { institution: '', degree: '', startDate: '', endDate: '' }],
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { company: '', role: '', startDate: '', endDate: '', description: '' }],
    });
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/student/profile', profile);
      alert('Profile updated successfully!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Basic Details */}
        <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Education */}
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        {profile.education.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Institution</label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Degree</label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEducation}
          className="text-secondary hover:underline mb-6"
        >
          + Add Education
        </button>

        {/* Experience */}
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        {profile.experience.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={exp.role}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="text-secondary hover:underline mb-6"
        >
          + Add Experience
        </button>

        {/* Skills */}
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-2 border rounded mr-2"
            placeholder="Add a skill (e.g., React)"
          />
          <button
            type="button"
            onClick={addSkill}
            className="text-white bg-gray-900 px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Resume */}
        <h2 className="text-xl font-semibold mb-4">Resume</h2>
        <div className="mb-6">
          <label className="block text-gray-700">Resume URL</label>
          <input
            type="text"
            name="resume"
            value={profile.resume}
            onChange={(e) => handleInputChange(e)}
            className="w-full p-2 border rounded"
            placeholder="e.g., https://example.com/resume.pdf"
          />
        </div>

        <Button type="submit" className="w-full bg-gray-900">Save Profile</Button>
      </form>
    </div>
  );
};

export default StudentProfilePage;