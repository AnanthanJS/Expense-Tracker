import React from 'react';
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
    <div className="profile-container p-4 flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        {showSuccess && (
          <div className="alert alert-success text-center mb-4">
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
  );
};

export default Profile;
