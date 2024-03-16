import React from "react";
import { useAuth } from "../../context/AuthContext";

function Visitor() {
  const { userData } = useAuth();
  // console.log(userData);
  console.log(userData.user);
  // console.log(userData.user.staff.position)
    console.log(userData.user.user_classcode.classcode)
  // console.log(userData.user.first_name);
  // console.log(userData.user.last_name);
  // const isAdmin = userData?.user?.staff?.position === "Office";
  const classCode = userData?.user?.user_classcode?.[0]?.classcode;
  const timeStart = userData?.user?.user_classcode?.[0]?.time_start;
  const timeEnd = userData?.user?.user_classcode?.[0]?.time_end;
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <div>
        <img
          src="profile.jpg"
          alt="Profile"
          // Significantly reduce the image size for a more compact look
          className="w-24 md:w-32 h-auto object-cover rounded-full mx-auto mb-4"
        />
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">
          {userData.user.first_name} {userData.user.last_name}
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-bold mb-2 text-gray-800">User Details</h2>
          <hr className="my-2" />
          <div className="mb-2">
            <h3 className="text-md font-semibold text-gray-700">
              Email Address
            </h3>
            <p className="text-gray-800 text-sm">{userData.user.email}</p>
          </div>
          <hr className="my-2" />
          <div>
            <h3 className="text-md font-semibold text-gray-700">Class Code</h3>
            <p className="text-gray-800 text-sm">
            {classCode ? `${classCode} ${timeStart} - ${timeEnd}` : 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-blue-700 border-blue-700 text-white btn btn-xs sm:btn-sm md:btn-sm lg:btn-sm">
            BORROW
          </button>
          <button className="bg-blue-700 border-blue-700 text-white btn btn-xs sm:btn-sm md:btn-sm lg:btn-sm">
            RETURN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Visitor;
