import React from 'react';
import { CustomNavbar } from '../Navbar/CustomNavbar';
import useProfile from '../hooks/useProfile';
import { ProfileForm } from '../Profile/ProfileForm';
import { ProfileDetails } from '../Profile/ProfileDetails';

const Profile = () => {
  const {
    profile,
    loading,
    error,
    showSuccess,
    isEditing,
    imagePreview,
    setProfile,
    setIsEditing,
    handleSubmit,
  } = useProfile();

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <CustomNavbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {showSuccess && (
              <div className="alert alert-success" role="alert">
                Profile updated successfully!
              </div>
            )}

            {isEditing ? (
              <ProfileForm 
                profile={profile} 
                imagePreview={imagePreview} 
                setProfile={setProfile} 
                handleSubmit={handleSubmit} 
                setIsEditing={setIsEditing}
              />
            ) : (
              <ProfileDetails 
                profile={profile} 
                imagePreview={imagePreview} 
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
