import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function EditUser() { // Renamed for clarity
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user data once when component mounts
  useEffect(() => {
    axios
      .get(`https://fake-data-2.onrender.com/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching user data");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`https://fake-data-2.onrender.com/users/${id}`, user);

      if (res.status !== 200) {
        throw new Error("Network response was not ok");
      }

      toast.success("User updated successfully!");

      setTimeout(() => {
        navigate("/"); // redirect after 2 seconds
      }, 2000);

    } catch (err) {
      console.error(err);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

