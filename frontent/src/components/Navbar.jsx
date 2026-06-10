import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = userAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">

        <Link to="/dashboard" className="text-white text-xl font-bold tracking-wide no-underline">
          Task Manager
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-indigo-100 text-sm font-medium hidden sm:block">
               Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg text-sm font-medium hover:bg-opacity-30 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;