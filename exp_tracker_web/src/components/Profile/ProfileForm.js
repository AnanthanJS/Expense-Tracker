import React from 'react';

export const ProfileForm = ({ profile, imagePreview, setProfile, handleSubmit, setIsEditing }) => {
  return (
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
          required
        />
        {imagePreview && <img src={imagePreview} alt="Profile" className="img-thumbnail mb-3" width="150" />}
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
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary w-100" type="submit">Update Profile</button>
          <button className="btn btn-secondary w-100 mt-2" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    </form>
  );
};
