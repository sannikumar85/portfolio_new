import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sanni-kumar-gupta-a2a84625a/', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiGithub, href: 'https://github.com/sanniGupta8579', label: 'GitHub' },
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiMail, href: 'mailto:sannikumargupta8759@gmail.com', label: 'Email' },
  ];

  const platformLinks = [
    { label: 'Fiverr', href: 'https://www.fiverr.com' },
    { label: 'Upwork', href: 'https://www.upwork.com' },
    { label: 'Freelancer', href: 'https://www.freelancer.com' },
    { label: 'GitHub', href: 'https://github.com/sanniGupta8579' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanni-kumar-gupta-a2a84625a/' },
    { label: 'Portfolio', href: '#' },
  ];

  return (
    <footer className="relative overflow-hidden py-12"
      style={{
        background: isDark 
          ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(5, 10, 20, 0.98) 100%)' 
          : 'linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)',
        borderTop: isDark ? '1px solid rgba(0, 255, 136, 0.15)' : '1px solid rgba(251, 146, 60, 0.15)'
      }}>
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(0, 255, 136, 0.4), transparent)' 
              : 'radial-gradient(circle, rgba(251, 146, 60, 0.3), transparent)',
            animation: 'pulse-glow 6s ease-in-out infinite'
          }}></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)' 
              : 'radial-gradient(circle, rgba(234, 179, 8, 0.25), transparent)',
            animation: 'pulse-glow 8s ease-in-out infinite reverse'
          }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.label}
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1"
                  style={{
                    background: isDark 
                      ? 'rgba(0, 255, 136, 0.08)' 
                      : 'rgba(251, 146, 60, 0.08)',
                    border: isDark ? '2px solid rgba(0, 255, 136, 0.25)' : '2px solid rgba(251, 146, 60, 0.25)',
                    boxShadow: isDark 
                      ? '0 4px 20px rgba(0, 255, 136, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
                      : '0 4px 20px rgba(251, 146, 60, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}>
                  <Icon className={`${isDark ? 'text-neon-green' : 'text-orange-500'} transition-all duration-300`} size={18} />
                  
                  {/* Hover glow effect - hidden on mobile */}
                  <div className="hidden sm:block absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: isDark 
                        ? 'radial-gradient(circle at center, rgba(2, 157, 87, 0.3), transparent 70%)' 
                        : 'radial-gradient(circle at center, rgba(251, 146, 60, 0.25), transparent 70%)',
                      filter: 'blur(8px)',
                      transform: 'scale(1.5)'
                    }}></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Platform Links */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-10">
          {platformLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: isDark 
                  ? 'rgba(0, 255, 136, 0.05)' 
                  : 'rgba(251, 146, 60, 0.05)',
                border: isDark ? '1px solid rgba(0, 255, 136, 0.2)' : '1px solid rgba(251, 146, 60, 0.2)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium text-xs sm:text-sm transition-colors duration-300`}>
                {link.label}
              </span>
              
              {/* Animated border on hover - hidden on mobile */}
              <div className="hidden sm:block absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(34, 211, 238, 0.05))' 
                    : 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(234, 179, 8, 0.05))',
                  boxShadow: isDark 
                    ? '0 0 20px rgba(0, 255, 136, 0.2)' 
                    : '0 0 15px rgba(251, 146, 60, 0.15)'
                }}></div>
            </a>
          ))}
        </div>

        {/* Decorative line */}
        <div className="relative mb-8">
          <div className="h-px w-full"
            style={{
              background: isDark 
                ? 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.3) 50%, transparent)' 
                : 'linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.25) 50%, transparent)'
            }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 rounded-full"
              style={{
                background: isDark ? '#00ff88' : '#fb923c',
                boxShadow: isDark 
                  ? '0 0 15px rgba(0, 255, 136, 0.8), 0 0 30px rgba(0, 255, 136, 0.4)' 
                  : '0 0 12px rgba(251, 146, 60, 0.7), 0 0 25px rgba(251, 146, 60, 0.3)'
              }}></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className={`flex items-center justify-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'} font-medium`}
            style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full"
              style={{
                background: isDark ? '#00ff88' : '#fb923c',
                boxShadow: isDark ? '0 0 10px rgba(0, 255, 136, 0.6)' : '0 0 8px rgba(251, 146, 60, 0.5)'
              }}></span>
            Copyright ALL Rights Reserved {currentYear}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}>
            Developed by: <span className={isDark ? 'text-neon-green' : 'text-orange-500'}>Sanni Kumar Gupta</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
