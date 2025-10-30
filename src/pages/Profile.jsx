import React from "react";

const Profile = () => {
  const user = {
    name: "khushi kushwah",
    email: "khushi.kushwah361356@gmail.com",
    role: "Student",
    phone: "+91 9876543210",
    profileImage: "https://via.placeholder.com/120"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 transition-colors">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600 mb-1">{user.role}</p>
          <div className="w-full mt-6 text-left">
            <p className="text-sm text-gray-800"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm text-gray-800"><strong>Phone:</strong> {user.phone}</p>
          </div>
          <div className="flex gap-3 w-full mt-6">
            <button className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Edit Profile
            </button>
            <button className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
