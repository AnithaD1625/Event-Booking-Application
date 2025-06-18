import React from 'react';
import { Calendar, Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onAuthModalOpen: () => void;
  onProfileModalOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onViewChange, 
  onAuthModalOpen, 
  onProfileModalOpen 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventHub
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onViewChange('events')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'events'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Browse Events
            </button>
            <button
              onClick={() => onViewChange('categories')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'categories'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Categories
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={onProfileModalOpen}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <User className="h-4 w-4" />
                <span>{user.user_metadata?.full_name || user.email}</span>
              </button>
            ) : (
              <button
                onClick={onAuthModalOpen}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <button
              onClick={() => {
                onViewChange('events');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'events'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Browse Events
            </button>
            <button
              onClick={() => {
                onViewChange('categories');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'categories'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Categories
            </button>
            
            <div className="pt-2 border-t">
              {user ? (
                <button
                  onClick={() => {
                    onProfileModalOpen();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <User className="h-4 w-4" />
                  <span>{user.user_metadata?.full_name || user.email}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onAuthModalOpen();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;