import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-travel-dark text-nav-light shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold whitespace-nowrap">
            <span className="text-nav-accent">Travel</span>Agency
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-nav-accent transition-colors">
              Home
            </Link>
            <Link to="/packages" className="hover:text-nav-accent transition-colors">
              Packages
            </Link>
            <Link to="/bookings" className="hover:text-nav-accent transition-colors">
              Bookings
            </Link>
            <Link to="/packages/create" className="hover:text-nav-accent transition-colors">
              Add Package
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <Link 
              to="/" 
              className="hover:text-nav-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/packages" 
              className="hover:text-nav-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
            <Link 
              to="/bookings" 
              className="hover:text-nav-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookings
            </Link>
            <Link 
              to="/packages/create" 
              className="hover:text-nav-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Package
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;