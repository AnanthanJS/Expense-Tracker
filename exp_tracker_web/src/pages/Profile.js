import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';

const Profile = () => {
  const [profile, setProfile] = useState({ bio: '', profile_picture: null });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:8000/api/profile/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setProfile(data);
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

    await fetch('http://localhost:8000/api/profile/', {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
  };

  return (
    <>
        <Navbar />
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Bio"
            />
            <input
                type="file"
                onChange={(e) => setProfile({ ...profile, profile_picture: e.target.files[0] })}
            />
            <button type="submit">Update Profile</button>
    </form>    
    </>
  );
};

export default Profile;
