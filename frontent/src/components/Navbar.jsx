import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = userAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link 
          to="/dashboard" 
          className="flex items-center gap-3 group no-underline"
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl font-black group-hover:rotate-12 group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300 shadow-sm">
            ✓
          </div>
          <span className="text-white text-xl font-bold tracking-wide group-hover:tracking-widest transition-all duration-300">
            Task Manager
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3 group cursor-default">
              <div className="text-right">
                <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wider m-0 leading-tight group-hover:text-indigo-100 transition-colors">
                  Welcome back
                </p>
                <p className="text-white font-bold m-0 leading-tight flex items-center justify-end gap-1">
                  {user.name.split(" ")[0]}
                  <span className="origin-bottom-right group-hover:rotate-12 transition-transform duration-300 text-lg">👋</span>
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-white font-bold text-lg shadow-inner group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300 group-hover:scale-105">
                {getInitials(user.name)}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl text-sm font-semibold hover:bg-white hover:text-indigo-600 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              <span>Logout</span>
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;