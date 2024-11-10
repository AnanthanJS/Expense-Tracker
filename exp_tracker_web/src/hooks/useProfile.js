import { useState, useEffect } from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    profile_picture: '',
    contact_number: '',
    place: '',
    company: '',
    salary: '',
    job_title: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to access your profile.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          if (data.profile_picture) {
            setImagePreview(data.profile_picture);  // Ensure the preview is set
          }
        } else if (response.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (response.status === 403) {
          setError('Access forbidden. Please log in to access your profile.');
        } else if (response.status === 404) {
          setError('Profile not found. Please create a profile.');
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
    
    if (profile.profile_picture && typeof profile.profile_picture !== 'string') {
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
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        // Immediately update the imagePreview with the updated profile picture
        if (updatedProfile.profile_picture) {
          setImagePreview(updatedProfile.profile_picture);
        }
        setShowSuccess(true);
        setIsEditing(false);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while updating. Please try again.');
    }
  };

  // When a user selects a new image, update the preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profile_picture: file });
      setImagePreview(URL.createObjectURL(file)); // Show preview instantly
    }
  };

  return {
    profile,
    loading,
    error,
    showSuccess,
    isEditing,
    imagePreview,
    setProfile,
    setIsEditing,
    handleSubmit,
    setShowSuccess,
    handleImageChange
  };
};

export default useProfile;
