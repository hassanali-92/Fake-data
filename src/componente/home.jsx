import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 function Home() {
  const [post, setPost] = useState([]);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://fake-data-2.onrender.com/users");
      setPost(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching users");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      toast.success("User deleted successfully!");
      // Remove deleted user from state without reloading
      setPost(post.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-start">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-5 text-center">User Details</h1>

        <Link to="/create">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md">
            Create
          </button>
        </Link>

        <table className="min-w-full border-collapse mt-2 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {post.map((data) => (
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
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




export default Home
