import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <nav className="border-b border-clerk-border bg-clerk-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-white to-gray-400 flex items-center justify-center shadow-glow">
                <span className="text-black font-bold text-lg leading-none">P</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight ml-1">PrimeTrade</span>
            </Link>
            
            {/* Desktop Menu - Simulated */}
            {!isAuthPage && (
              <div className="hidden md:flex ml-10 space-x-8">
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Products</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Docs</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Changelog</a>
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <span className="text-xs text-clerk-muted">{user.role}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-transparent hover:bg-white/5 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-white/10"
                >
                  Sign out
                </button>
              </div>
            ) : (
              !isAuthPage && (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Sign in
                  </Link>
                  <Link to="/register" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Start building <span className="text-gray-500 ml-1">▶</span>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
