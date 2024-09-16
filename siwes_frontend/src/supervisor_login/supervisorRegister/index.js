import React, { useState } from "react";

export const Register = () => {
   const [formData, setFormData] = useState({
      matricNumber: "",
      phoneNumber: "",
      fullName: "",
      password: "",
      course: "",
      department: "",
      email: "",
   });
   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
         ...formData,
         [name]: value
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      // Handle registration logic here
      console.log("Form Data:", formData);
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit}>
               <div className="mb-4">
                  <label htmlFor="matricNumber" className="block text-gray-700 mb-2">Matric Number</label>
                  <input
                     id="matricNumber"
                     name="matricNumber"
                     type="text"
                     placeholder="Enter matric number"
                     value={formData.matricNumber}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                     id="phoneNumber"
                     name="phoneNumber"
                     type="text"
                     placeholder="Enter phone number"
                     value={formData.phoneNumber}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                  <input
                     id="fullName"
                     name="fullName"
                     type="text"
                     placeholder="Enter full name"
                     value={formData.fullName}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     placeholder="Enter password"
                     value={formData.password}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="course" className="block text-gray-700 mb-2">Course</label>
                  <input
                     id="course"
                     name="course"
                     type="text"
                     placeholder="Enter course"
                     value={formData.course}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="department" className="block text-gray-700 mb-2">Department</label>
                  <input
                     id="department"
                     name="department"
                     type="text"
                     placeholder="Enter department"
                     value={formData.department}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                     id="email"
                     name="email"
                     type="email"
                     placeholder="Enter email"
                     value={formData.email}
                     onChange={handleChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Register
               </button>
            </form>
         </div>
      </div>
   );
};
