import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://fake-data-2.onrender.com/users");
      setPost(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`https://fake-data-2.onrender.com/users/${id}`);
      toast.success("User deleted successfully!");
      setPost((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  // 🔵 YOUR LOADING SPINNER
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-start">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-5 text-center">User Details</h1>

        <Link to="/create">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md">
            Create
          </button>
        </Link>

        <table className="min-w-full border-collapse mt-4 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {post.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 text-lg font-medium"
                >
                  ❌ No User Found
                </td>
              </tr>
            ) : (
              post.map((data) => (
                <tr key={data.id} className="border-b hover:bg-gray-100 transition-all">
                  <td className="py-3 px-4 font-medium">{data.name}</td>
                  <td className="py-3 px-4">{data.email}</td>
                  <td className="py-3 px-4 space-x-2">
                    <Link
                      to={`/update/${data.id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(data.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
