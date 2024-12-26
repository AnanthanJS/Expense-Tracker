import React from "react";
import Card from "../common/Card/Card";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";

export const ProfileDetails = ({ profile, imagePreview, setIsEditing }) => {
  return (
    <div className="profile-details-container flex justify-center items-start">
      <Card width="w-full md:w-2/3 lg:w-1/2 mx-auto" padding="p-6" shadow="shadow-lg">
        <div className="flex flex-col items-center text-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="rounded-full mb-4 shadow-md"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="rounded-full bg-gray-200 mb-4 flex items-center justify-center"
              style={{ width: "120px", height: "120px" }}
            >
              <FaUser className="text-gray-500 text-4xl" />
            </div>
          )}
          <h3 className="text-2xl font-bold text-primary dark:text-primary-light mb-2">
            Profile Information
          </h3>
        </div>
        <div className="mt-4">
          <ProfileInfo label="Bio" value={profile.bio} icon={<FaUser />} />
          <ProfileInfo
            label="Contact Number"
            value={profile.contact_number}
            icon={<FaPhone />}
          />
          <ProfileInfo label="Place" value={profile.place} icon={<FaMapMarkerAlt />} />
          <ProfileInfo label="Company" value={profile.company} icon={<FaBuilding />} />
          <ProfileInfo
            label="Job Title"
            value={profile.job_title}
            icon={<FaBriefcase />}
          />
          <ProfileInfo
            label="Salary"
            value={`$${profile.salary}`}
            icon={<FaMoneyBillWave />}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="btn bg-primary text-white hover:bg-primary-dark px-6 py-2 rounded shadow-md transition-all duration-200"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      </Card>
    </div>
  );
};

const ProfileInfo = ({ label, value, icon }) => (
  <div className="flex items-center justify gap-4 py-1 border-b border-gray-300 dark:border-gray-700">
    <div className="flex text-primary dark:text-primary-light text-lg md:text-xl">
      {icon}
    </div>
    <div className="flex-1 pt-3">
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
        <strong>{label}:</strong> {value || "N/A"}
      </p>
    </div>
  </div>
);
