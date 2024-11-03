import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    profile_picture: null,
    contact_number: '',
    place: '',
    company: '',
    salary: '',
    job_title: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // State to control success message visibility
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('http://localhost:8000/api/profile/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else if (response.status === 403) {
          setError('Access forbidden. Please log in to access your profile.');
        } else {
          setError('Failed to fetch profile data.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', profile.bio);
    if (profile.profile_picture) {
      formData.append('profile_picture', profile.profile_picture);
    }
    formData.append('contact_number', profile.contact_number);
    formData.append('place', profile.place);
    formData.append('company', profile.company);
    formData.append('salary', profile.salary);
    formData.append('job_title', profile.job_title);

    try {
      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setShowSuccess(true); // Show success message
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while updating. Please try again.');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            {showSuccess ? ( // Show alert if update was successful, hide form
              <div className="alert alert-success" role="alert">
                Profile updated successfully!
                <button 
                  className="btn btn-link mt-2" 
                  onClick={() => navigate('/')}
                >
                  Go to Home
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex flex-column gap-3">
                  <input
                    className="form-control"
                    type="text"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Bio"
                  />
                  <label htmlFor="ProfilePicture" className="form-label">Profile Picture</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => setProfile({ ...profile, profile_picture: e.target.files[0] })}
                    placeholder="Profile Picture"
                  />
                  <input
                    className="form-control"
                    type="text"
                    value={profile.contact_number}
                    onChange={(e) => setProfile({ ...profile, contact_number: e.target.value })}
                    placeholder="Contact Number"
                  />
                  <input
                    className="form-control"
                    type="text"
                    value={profile.place}
                    onChange={(e) => setProfile({ ...profile, place: e.target.value })}
                    placeholder="Place"
                  />
                  <input
                    className="form-control"
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    placeholder="Company"
                  />
                  <input
                    className="form-control"
                    type="text"
                    value={profile.job_title}
                    onChange={(e) => setProfile({ ...profile, job_title: e.target.value })}
                    placeholder="Job Title"
                  />
                  <input
                    className="form-control"
                    type="number"
                    value={profile.salary}
                    onChange={(e) => setProfile({ ...profile, salary: e.target.value })}
                    placeholder="Salary"
                  />
                  <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-primary w-100' type="submit">Update Profile</button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
