import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const StudentProfilePage = () => {
  // Initial profile state structure
  const initialProfile = {
    firstName: '',
    lastName: '',
    address: '',
    education: [{ institution: '', degree: '', startDate: '', endDate: '' }],
    experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    resume: '',
    skills: [],
  };

  const [profile, setProfile] = useState(initialProfile);
  const [newSkill, setNewSkill] = useState('');
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/student/profile');
        if (res.data && res.data.firstName) {
          setProfile(res.data);
          setIsProfileCreated(true);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle changes in inputs, including nested sections like education & experience
  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    if (section) {
      const updatedSection = [...profile[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      setProfile(prev => ({ ...prev, [section]: updatedSection }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add new empty education block
  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', startDate: '', endDate: '' }],
    }));
  };

  // Add new empty experience block
  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', startDate: '', endDate: '', description: '' }],
    }));
  };

  // Add skill to skills array if not empty or duplicate
  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  // Remove skill by index
  const removeSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://jobmatch-ixrz.onrender.com/api/student/profile', profile);
      alert('Profile saved successfully!');
      setIsProfileCreated(true);
      setEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">
        {isProfileCreated ? 'Your Profile' : 'Create Your Profile'}
      </h1>

      {/* Profile Preview */}
      {isProfileCreated && !editing && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Address:</strong> {profile.address}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Education</h2>
          <ul className="list-disc pl-5 space-y-1">
            {profile.education.map((edu, i) => (
              <li key={i}>
                {edu.degree} at {edu.institution} ({edu.startDate} - {edu.endDate})
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Experience</h2>
          <ul className="list-disc pl-5 space-y-1">
            {profile.experience.map((exp, i) => (
              <li key={i}>
                {exp.role} at {exp.company} ({exp.startDate} - {exp.endDate})
                {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span key={i} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Resume</h2>
          {profile.resume ? (
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View Resume
            </a>
          ) : (
            <p>No resume provided</p>
          )}

          <Button onClick={() => setEditing(true)} className="mt-8 bg-gray-900 text-white w-full">
            Edit Profile
          </Button>
        </div>
      )}

      {/* Profile Form */}
      {(!isProfileCreated || editing) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="p-2 border rounded"
              required
            />
            <input
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="p-2 border rounded"
              required
            />
            <input
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="md:col-span-2 p-2 border rounded"
              required
            />
          </div>

          {/* Education */}
          <h2 className="font-semibold mb-3 text-xl">Education</h2>
          {profile.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="institution"
                value={edu.institution}
                onChange={(e) => handleInputChange(e, 'education', index)}
                placeholder="Institution"
                className="p-2 border rounded"
                required
              />
              <input
                name="degree"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, 'education', index)}
                placeholder="Degree"
                className="p-2 border rounded"
                required
              />
              <input
                type="date"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="p-2 border rounded"
                required
              />
              <input
                type="date"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="p-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="text-blue-600 hover:underline mb-6"
          >
            + Add Education
          </button>

          {/* Experience */}
          <h2 className="font-semibold mb-3 text-xl">Experience</h2>
          {profile.experience.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                name="company"
                value={exp.company}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                placeholder="Company"
                className="p-2 border rounded"
                required
              />
              <input
                name="role"
                value={exp.role}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                placeholder="Role"
                className="p-2 border rounded"
                required
              />
              <input
                type="date"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="p-2 border rounded"
                required
              />
              <input
                type="date"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="p-2 border rounded"
                required
              />
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                placeholder="Description"
                className="md:col-span-2 p-2 border rounded"
                rows={3}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="text-blue-600 hover:underline mb-6"
          >
            + Add Experience
          </button>

          {/* Skills */}
          <h2 className="font-semibold mb-3 text-xl">Skills</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill"
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.skills.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(i)}
                  className="text-red-600 font-bold"
                  title="Remove skill"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {/* Resume URL */}
          <h2 className="font-semibold mb-2 text-xl">Resume URL</h2>
          <input
            type="url"
            name="resume"
            value={profile.resume}
            onChange={handleInputChange}
            placeholder="https://example.com/resume.pdf"
            className="w-full p-2 border rounded mb-6"
          />

          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-700 transition">
            Save Profile
          </Button>
        </form>
      )}
    </div>
  );
};

export default StudentProfilePage;
