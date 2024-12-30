import { useState, useEffect } from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    profile_picture: '',
    contact_number: '',
    place: '',
    company: '',
    salary: '',
    job_title: '',
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
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          if (data.profile_picture) {
            setImagePreview(data.profile_picture);
          }
        } else {
          const errorMessage = {
            401: 'Authentication failed. Please log in again.',
            403: 'Access forbidden. Please log in to access your profile.',
            404: 'Profile not found. Please create a profile.',
          }[response.status] || 'Failed to fetch profile data.';
          setError(errorMessage);
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
    formData.append('contact_number', profile.contact_number);
    formData.append('place', profile.place);
    formData.append('company', profile.company);
    formData.append('salary', profile.salary);
    formData.append('job_title', profile.job_title);
    
    // Only append profile picture if it's set (user has chosen a new file)
    if (profile.profile_picture instanceof File) {
      formData.append('profile_picture', profile.profile_picture);
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        if (updatedProfile.profile_picture) {
          setImagePreview(updatedProfile.profile_picture);
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Reset success message
        setIsEditing(false); // Redirect to ProfileDetails
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while updating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profile_picture: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // Cleanup object URLs to prevent memory leaks
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
    handleImageChange,
    setImagePreview,
  };
};

export default useProfile;
