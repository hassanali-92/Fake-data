import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // <-- import axios

export default function Create() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/users", user);

      if (res.status !== 201 && res.status !== 200) {
        throw new Error("Network response was not ok");
      }

      toast.success("User created successfully!");

      setTimeout(() => {
        navigate("/"); // page change after 2 seconds
      }, 1000);

      setUser({ name: "", email: "" }); // reset form
    } catch (err) {
      console.error(err);
      toast.error("Error creating user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <ToastContainer position="top-right" autoClose={500} />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
