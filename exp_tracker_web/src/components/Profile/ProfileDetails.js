import React from "react";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";
import Button from "../common/Button/Button";
import Card from "../common/Card/Card";

export const ProfileDetails = ({ profile, imagePreview, setIsEditing }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto space-y-4" padding="p-6">
      {/* Profile Picture and Title */}
      <div className="flex flex-col items-center text-center mb-6">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="rounded-full mb-4 shadow-md"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-full bg-gray-200 mb-4 flex items-center justify-center shadow-md"
            style={{ width: "120px", height: "120px" }}
          >
            <FaUser className="text-gray-500 text-4xl" />
          </div>
        )}
        <h3 className="text-2xl font-bold text-primary dark:text-primary-light">
          Profile Information
        </h3>
      </div>

      {/* Profile Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ProfileInfo value={profile.bio} icon={<FaUser />} />
        <ProfileInfo
          value={profile.contact_number}
          icon={<FaPhone />}
        />
        <ProfileInfo value={profile.place} icon={<FaMapMarkerAlt />} />
        <ProfileInfo value={profile.company} icon={<FaBuilding />} />
        <ProfileInfo
          value={profile.job_title}
          icon={<FaBriefcase />}
        />
        <ProfileInfo
          value={`$${profile.salary}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* Edit Button */}
      <div className="flex justify-center pt-3">
        <Button
          variant="primary"
          onClick={() => setIsEditing(true)}
          className="w-full px-6 py-2 text-lg"
        >
          Edit Profile
        </Button>
      </div>
    </Card>
  );
};

const ProfileInfo = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 px-4 p-2 shadow-md rounded-md border dark:border-gray-700">
    <div className="text-primary dark:text-primary-light text-xl">{icon}</div>
    <div className="flex-1">
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
        <strong className="text-gray-800 dark:text-gray-200">{label}:</strong>{" "}
        {value || "N/A"}
      </p>
    </div>
  </div>
);
