import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiMoon, FiZap } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/service', label: 'SERVICES' },
    { path: '/project', label: 'PROJECTS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark-strong shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - 3D Design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Animated glow */}
              <div className="absolute -inset-2 bg-neon-green rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300 animate-glow-pulse"></div>
              
              {/* Logo shape */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-black border-2 border-neon-green rounded-lg transform rotate-45 group-hover:rotate-[405deg] transition-transform duration-500"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), inset 0 0 20px rgba(0, 255, 136, 0.2)'
                  }}>
                </div>
                <FiZap className="relative z-10 w-6 h-6 text-neon-green group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Brand name with 3D font */}
            <div className="hidden sm:block">
              <span className="text-2xl font-bold tracking-wider text-white" style={{
                fontFamily: 'Bebas Neue, Rajdhana, sans-serif',
                textShadow: '0 0 20px rgba(0, 255, 136, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 0px rgba(0, 255, 136, 0.3), 6px 6px 0px rgba(0, 255, 136, 0.2)'
              }}>
                PORTFOLIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-6 py-2.5 group"
              >
                <span
                  className={`relative z-10 text-base font-bold tracking-wide transition-all duration-500 ${
                    location.pathname === link.path
                      ? 'text-neon-green'
                      : 'text-gray-400 group-hover:text-neon-green group-hover:scale-110'
                  }`}
                  style={{
                    fontFamily: 'Rock 3D, sans-serif',
                    letterSpacing: '0px',
                    textShadow: location.pathname === link.path 
                      ? '0 0 15px rgba(0, 255, 136, 1), 0 0 30px rgba(0, 255, 136, 0.8), 0 0 45px rgba(0, 255, 136, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.9), 4px 4px 0px rgba(0, 255, 136, 0.4), 6px 6px 0px rgba(0, 255, 136, 0.2)'
                      : '0 0 10px rgba(0, 255, 136, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.5)',
                    transform: location.pathname === link.path ? 'translateZ(20px)' : 'translateZ(0)',
                    animation: location.pathname === link.path ? 'float 3s ease-in-out infinite' : 'none',
                    display: 'inline-block'
                  }}
                >
                  <span className="inline-block group-hover:animate-text3dFloat transition-all duration-500">
                    {link.label}
                  </span>
                </span>
                
                {/* Active indicator - glowing line */}
                {location.pathname === link.path && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-neon-green rounded-full animate-glow-pulse"
                    style={{
                      boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88'
                    }}>
                  </div>
                )}
                
                {/* Hover glow effect (not on active) */}
                {location.pathname !== link.path && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-12 h-1 bg-neon-green rounded-full transition-all duration-500"
                    style={{
                      boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88'
                    }}>
                  </div>
                )}
              </Link>
            ))}
            
            {/* Theme Toggle with Glowing Effect */}
            <button
              onClick={toggleTheme}
              className="ml-4 relative p-3 rounded-xl glass-dark border-2 border-neon-green/50 hover:border-neon-green transition-all duration-300 group"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2), inset 0 0 15px rgba(0, 255, 136, 0.1)'
              }}
            >
              <div className="absolute -inset-1 bg-neon-green rounded-xl opacity-0 group-hover:opacity-40 blur-md transition duration-300"></div>
              {isDark ? (
                <FiSun className="relative w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform duration-300" 
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))'
                  }} />
              ) : (
                <FiMoon className="relative w-5 h-5 text-neon-green group-hover:-rotate-12 transition-transform duration-300" 
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 136, 0.5))'
                  }} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg glass-dark border-2 border-neon-green/50 transition-all duration-300"
              style={{
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)'
              }}
            >
              {isDark ? (
                <FiSun className="w-5 h-5 text-yellow-400" style={{
                  filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))'
                }} />
              ) : (
                <FiMoon className="w-5 h-5 text-neon-green" style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.8))'
                }} />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 glass-dark border-2 border-neon-green/50 rounded-lg transition-all duration-300"
              style={{
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)'
              }}
            >
              {isOpen ? (
                <FiX className="w-6 h-6 text-neon-green" style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.8))'
                }} />
              ) : (
                <FiMenu className="w-6 h-6 text-neon-green" style={{
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.8))'
                }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 glass-dark-strong border-t border-neon-green/20">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-neon-green'
                  : 'text-gray-300 hover:text-neon-green'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                fontFamily: 'Rock 3D, sans-serif',
                fontWeight: '400',
                fontSize: '1.1rem',
                letterSpacing: '0px',
                textShadow: location.pathname === link.path 
                  ? '0 0 15px rgba(0, 255, 136, 1), 0 0 30px rgba(0, 255, 136, 0.8), 0 0 45px rgba(0, 255, 136, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.9), 4px 4px 0px rgba(0, 255, 136, 0.4)'
                  : '0 0 8px rgba(0, 255, 136, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
