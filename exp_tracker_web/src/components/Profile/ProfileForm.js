import React from "react";
import InputField from "../common/InputField/InputField";
import Card from "../common/Card/Card";
import Button from "../common/Button/Button";

export const ProfileForm = ({
  profile,
  imagePreview,
  setProfile,
  handleSubmit,
  setIsEditing,
  setImagePreview,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Bio
            </label>
            <InputField
              id="bio"
              type="text"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Bio"
              required
              className="w-full"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Picture
            </label>
            <InputField
              id="profilePicture"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setProfile({ ...profile, profile_picture: file });
                  setImagePreview(URL.createObjectURL(file)); // Update preview
                }
              }}
              className="w-full"
              accept="image/*"
            />
            {/* {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile"
                className="rounded-md mt-3 shadow-md"
                width="120"
                height="120"
              />
            )} */}
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNumber"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Contact Number
            </label>
            <InputField
              id="contactNumber"
              type="text"
              value={profile.contact_number}
              onChange={(e) =>
                setProfile({ ...profile, contact_number: e.target.value })
              }
              placeholder="Contact Number"
              required
              className="w-full"
            />
          </div>

          {/* Place */}
          <div>
            <label
              htmlFor="place"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Place
            </label>
            <InputField
              id="place"
              type="text"
              value={profile.place}
              onChange={(e) => setProfile({ ...profile, place: e.target.value })}
              placeholder="Place"
              required
              className="w-full"
            />
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Company
            </label>
            <InputField
              id="company"
              type="text"
              value={profile.company}
              onChange={(e) =>
                setProfile({ ...profile, company: e.target.value })
              }
              placeholder="Company"
              required
              className="w-full"
            />
          </div>

          {/* Job Title */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Job Title
            </label>
            <InputField
              id="jobTitle"
              type="text"
              value={profile.job_title}
              onChange={(e) =>
                setProfile({ ...profile, job_title: e.target.value })
              }
              placeholder="Job Title"
              required
              className="w-full"
            />
          </div>

          {/* Salary */}
          <div className="md:col-span-2">
            <label
              htmlFor="salary"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Salary
            </label>
            <InputField
              id="salary"
              type="number"
              value={profile.salary}
              onChange={(e) =>
                setProfile({ ...profile, salary: e.target.value })
              }
              placeholder="Salary"
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="primary"
            type="submit"
            className="w-full px-6 py-2 text-lg"
          >
            Update Profile
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
            className="w-full px-6 py-2 text-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
