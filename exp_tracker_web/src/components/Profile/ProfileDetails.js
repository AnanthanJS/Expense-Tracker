import React from 'react';

export const ProfileDetails = ({ profile, imagePreview, setIsEditing }) => {
  return (
    <div>
      <h3>Profile Information</h3>
      {imagePreview && <img src={imagePreview} alt="Profile" className="img-thumbnail mb-3" width="150" />}
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Contact Number:</strong> {profile.contact_number}</p>
      <p><strong>Place:</strong> {profile.place}</p>
      <p><strong>Company:</strong> {profile.company}</p>
      <p><strong>Job Title:</strong> {profile.job_title}</p>
      <p><strong>Salary:</strong> {profile.salary}</p>
      <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};

