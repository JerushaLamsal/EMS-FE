import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b" style={{ borderBottomColor: '#f9fafb' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold transition" style={{ color: '#1f2937' }}>
            
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              HamroEvents
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent" style={{ color: '#6b7280' }}>
              Home
            </Link>
            <Link to="/events" className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent" style={{ color: '#6b7280' }}>
              Events
            </Link>

            {isAuthenticated && user.role === 'organizer' && (
              <Link to="/create" className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent" style={{ color: '#6b7280' }}>
                Create Event
              </Link>
            )}

            {isAuthenticated && user.role === 'admin' && (
              <>
                <Link to="/dashboard" className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent" style={{ color: '#6b7280' }}>
                  Dashboard
                </Link>
                <Link to="/attendees" className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent" style={{ color: '#6b7280' }}>
                  Attendees
                </Link>
              </>
            )}

            {isAuthenticated && user.role === 'organizer' && (
              <Link to="/attendees" className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent" style={{ color: '#6b7280' }}>
                My Attendees
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm" style={{ color: '#6b7280' }}>
                  {user.name} <span className="text-xs bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent font-semibold">({user.role})</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{ backgroundColor: '#2563eb', color: 'white' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="transition hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:bg-clip-text hover:text-transparent"
                  style={{ color: '#6b7280' }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-105 shadow-md"
                  style={{ background: 'linear-gradient(90deg, #9b5de5, #f15bb5, #ff6f3c)' }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
