import { useState, useRef, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiCode, FiLayout, FiMonitor, FiUsers, FiChevronLeft, FiChevronRight, FiServer, FiDatabase, FiMessageCircle, FiCalendar, FiHome, FiX, FiLayers, FiCpu, FiSmartphone, FiWifi, FiDollarSign, FiCamera, FiEye, FiRefreshCw, FiChevronDown, FiChevronUp, FiStar, FiMousePointer, FiCheck, FiAward } from 'react-icons/fi';
import { FaGamepad, FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPlay, FaPause, FaPython, FaJava, FaAndroid, FaBus, FaTree, FaUniversity } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiSocketdotio, SiOpencv, SiFlutter, SiDart } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

// Image Gallery Modal Component
const ImageGalleryModal = ({ images, title, startIndex = 0, onClose, isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-neon-green/20 border-2 border-neon-green/30 hover:border-neon-green flex items-center justify-center transition-all duration-300"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}
      >
        <FiX className="w-6 h-6 text-neon-green" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/70 border-2 border-neon-green/50 text-neon-green text-sm font-medium"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-black/70 border-2 border-neon-green text-neon-green font-bold"
        style={{ boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)', textShadow: '0 0 10px rgba(0, 255, 136, 0.8)' }}>
        {title}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
        className="absolute left-4 z-50 w-14 h-14 rounded-full bg-black/70 border-2 border-neon-green/50 hover:border-neon-green hover:bg-neon-green/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}
      >
        <FiChevronLeft className="w-8 h-8 text-neon-green" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
        className="absolute right-4 z-50 w-14 h-14 rounded-full bg-black/70 border-2 border-neon-green/50 hover:border-neon-green hover:bg-neon-green/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }}
      >
        <FiChevronRight className="w-8 h-8 text-neon-green" />
      </button>

      {/* Main Image */}
      <div className="w-full max-w-6xl mx-4 aspect-video relative">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg border-2 border-neon-green/30"
          style={{ boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)' }}
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/70 border-2 border-neon-green/30 backdrop-blur-sm max-w-full overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-10 rounded-md overflow-hidden transition-all duration-300 flex-shrink-0 border-2 ${
              index === currentIndex ? 'border-neon-green scale-110' : 'border-neon-green/20 opacity-60 hover:opacity-100'
            }`}
            style={index === currentIndex ? { boxShadow: '0 0 15px rgba(0, 255, 136, 0.5)' } : {}}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Project Details Modal
const ProjectDetailsModal = ({ isOpen, onClose, project, isDark }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md">
      <div className="min-h-screen px-4 py-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-black/80 hover:bg-neon-green/20 border-2 border-neon-green/50 hover:border-neon-green flex items-center justify-center transition-all duration-300"
          style={{ boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)' }}
        >
          <FiX className="w-7 h-7 text-neon-green" />
        </button>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-neon-green to-cyan-400 text-black border-2 border-neon-green/50"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)', fontFamily: 'Exo 2, sans-serif' }}>
                {project.type}
              </span>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full border-2 ${
                isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/50' : 'bg-blue-50 text-blue-600 border-blue-300'
              }`}>
                MERN Stack
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ 
                textShadow: '0 0 30px rgba(0, 255, 136, 0.5), 2px 2px 8px rgba(0, 0, 0, 0.8)',
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '1px'
              }}>
              {project.title}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {project.description}
            </p>
          </div>

          {/* Video Section */}
          {project.video && (
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden border-2 border-neon-green/40"
                style={{ boxShadow: '0 0 40px rgba(0, 255, 136, 0.3)' }}>
                <video
                  ref={videoRef}
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video object-contain bg-black"
                />
                <button
                  onClick={toggleVideo}
                  className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black/70 border-2 border-cyan-400/50 hover:border-cyan-400 backdrop-blur-sm flex items-center justify-center hover:bg-cyan-400/20 transition-all duration-300"
                  style={{ boxShadow: '0 0 25px rgba(34, 211, 238, 0.5)' }}
                >
                  {isPlaying ? (
                    <FaPause className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <FaPlay className="w-5 h-5 text-cyan-400 ml-1" />
                  )}
                </button>
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 text-black text-sm font-bold flex items-center gap-2"
                  style={{ boxShadow: '0 0 30px rgba(0, 255, 136, 0.8)', fontFamily: 'Rajdhani, sans-serif' }}>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE DEMO
                </div>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Features */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border-2 border-cyan-500/30"
              style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)' }}>
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2"
                style={{ textShadow: '0 0 15px rgba(34, 211, 238, 0.6)', fontFamily: 'Rajdhani, sans-serif' }}>
                ✨ Key Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border-2 border-purple-500/30"
              style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}>
              <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2"
                style={{ textShadow: '0 0 15px rgba(168, 85, 247, 0.6)', fontFamily: 'Rajdhani, sans-serif' }}>
                🛠️ Technologies
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {project.techIcons.map((TechIcon, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 hover:scale-110 transition-transform"
                    style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}
                  >
                    <TechIcon className="w-8 h-8 text-purple-300" />
                    <span className="text-xs text-purple-300 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {project.technologies[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 15px rgba(0, 255, 136, 0.5)', fontFamily: 'Rajdhani, sans-serif' }}>
              📸 Project Gallery ({project.images.length} Images)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.images.map((img, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-xl overflow-hidden border-2 border-neon-green/30 hover:border-neon-green transition-all cursor-pointer hover:scale-105"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' }}
                >
                  <img src={img} alt={`${project.title} - ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 text-black rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-neon-green"
                style={{ 
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.6), 0 0 50px rgba(34, 211, 238, 0.4)',
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '1px'
                }}
              >
                <FiExternalLink className="w-6 h-6" />
                <span>Visit Live Demo</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-purple-500/50 hover:border-purple-400"
                style={{ 
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '1px'
                }}
              >
                <FiGithub className="w-6 h-6" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Accordion Component for Project Details
const ProjectAccordion = ({ title, children, defaultOpen = false, isDark }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border-cyan-500/30 hover:border-cyan-400/50' 
        : 'bg-gradient-to-r from-cyan-50/50 to-purple-50/50 border-cyan-200 hover:border-cyan-400'
    }`}
      style={isOpen && isDark ? { boxShadow: '0 0 20px rgba(34, 211, 238, 0.15), inset 0 0 20px rgba(34, 211, 238, 0.05)' } : {}}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 flex items-center justify-between transition-all duration-300 ${
          isDark ? 'bg-cyan-500/10 hover:bg-cyan-500/20' : 'bg-cyan-50 hover:bg-cyan-100'
        }`}
      >
        <span className={`font-bold text-xs ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}
          style={{ 
            textShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.5px'
          }}>
          {title}
        </span>
        {isOpen ? (
          <FiChevronUp className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
        ) : (
          <FiChevronDown className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
        )}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

// Simple Project Card for Java Swing and Android Apps
const SimpleProjectCard = ({ project, isDark, onOpenDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Icon = project.icon || FiCode;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(25, 25, 50, 0.9) 100%)' 
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 252, 255, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        border: isDark ? '2px solid rgba(0, 255, 136, 0.3)' : '2px solid rgba(0, 255, 136, 0.25)',
        boxShadow: isDark 
          ? '0 4px 20px rgba(0, 255, 136, 0.15), 0 10px 40px rgba(0, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 255, 136, 0.12), 0 10px 40px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Auto-rotating Image Carousel */}
        <div className="md:w-64 relative bg-gradient-to-br from-black/10 to-black/5 flex-shrink-0">
          <div className="relative h-full min-h-[280px]">
            {/* Image Display */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-40 h-64 rounded-lg overflow-hidden shadow-2xl"
                style={{
                  boxShadow: isDark 
                    ? '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                    : '0 20px 40px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                }}>
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                
                {/* Image Counter */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/90 backdrop-blur-sm border border-neon-green/60"
                  style={{ boxShadow: '0 0 15px rgba(0, 255, 136, 0.5)' }}>
                  <span className="text-neon-green text-xs font-bold" style={{ fontFamily: 'Exo 2, sans-serif' }}>
                    {currentImageIndex + 1}/{project.images.length}
                  </span>
                </div>

                {/* Auto-play Indicator */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/90 backdrop-blur-sm border border-cyan-500/50">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-cyan-400 text-xs font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      AUTO
                    </span>
                  </div>
                </div>

                {/* Click to View Details */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-center gap-1.5 text-neon-green">
                    <FiEye className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-4">
              {project.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'w-6 bg-neon-green' 
                      : 'w-1.5 bg-gray-400 opacity-50'
                  }`}
                  style={index === currentImageIndex ? { boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)' } : {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Project Information */}
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green/20 to-cyan-500/20 flex items-center justify-center border border-neon-green/40 flex-shrink-0"
              style={{ boxShadow: '0 0 15px rgba(0, 255, 136, 0.25)' }}>
              <Icon className="w-5 h-5 text-neon-green" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3px' }}>
                  {project.title}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isDark ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-green/30 text-neon-green'
                } border border-neon-green/40`} 
                  style={{ fontFamily: 'Exo 2, sans-serif' }}>
                  {project.type}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}>
                {project.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => {
                const TechIcon = project.techIcons?.[index];
                return (
                  <span
                    key={index}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg ${
                      isDark 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                        : 'bg-purple-500/15 text-purple-700 border border-purple-500/30'
                    }`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {TechIcon && <TechIcon className="w-3.5 h-3.5" />}
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
              Key Features
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {project.features.slice(0, 6).map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
                    isDark ? 'bg-cyan-500/10 border border-cyan-500/25' : 'bg-cyan-500/10 border border-cyan-500/20'
                  }`}
                >
                  <FiCheck className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className={`${isDark ? 'text-cyan-300' : 'text-cyan-700'} truncate`}
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            {project.features.length > 6 && (
              <p className={`mt-2 text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                +{project.features.length - 6} more features • Click to view all
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// MERN Project Card with Video and Gallery
const MernProjectCard = ({ project, isDark, onOpenGallery, onOpenDetails }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project.images.length]);

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgba(10, 10, 30, 0.95) 0%, rgba(20, 20, 40, 0.9) 100%)' 
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 255, 250, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: isDark ? '2px solid rgba(0, 255, 136, 0.4)' : '2px solid rgba(0, 255, 136, 0.3)',
        boxShadow: isDark 
          ? '0 8px 32px rgba(0, 255, 136, 0.2), 0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
          : '0 8px 32px rgba(0, 255, 136, 0.15), 0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        transform: 'perspective(1000px) rotateX(0deg)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Video Card */}
        <div className="relative h-64 lg:h-auto overflow-hidden">
          {project.video ? (
            <div className="relative w-full h-full min-h-[256px]">
              <video
                ref={videoRef}
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain bg-black"
              />
              {/* Video Control */}
              <button
                onClick={toggleVideo}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/70 border-2 border-cyan-400/50 hover:border-cyan-400 backdrop-blur-sm flex items-center justify-center hover:bg-cyan-400/20 transition-all duration-300 z-10"
                style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
              >
                {isPlaying ? (
                  <FaPause className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <FaPlay className="w-3.5 h-3.5 text-cyan-400 ml-0.5" />
                )}
              </button>
              {/* Video Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 text-black text-xs font-bold flex items-center gap-1"
                style={{ boxShadow: '0 0 25px rgba(0, 255, 136, 0.7)', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.5px' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                LIVE
              </div>
              {/* Click to View Badge */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-neon-green/50 text-neon-green text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Click to view details →
              </div>
            </div>
          ) : (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full min-h-[256px] object-cover"
            />
          )}
          {/* Gradient Overlay with 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Right Side - Content & Gallery */}
        <div className="p-5 lg:p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-neon-green to-cyan-400 text-black border-2 border-neon-green/50"
                  style={{ boxShadow: '0 0 15px rgba(0, 255, 136, 0.5)', fontFamily: 'Exo 2, sans-serif' }}>
                  {project.type}
                </span>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                  isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/50' : 'bg-blue-50 text-blue-600 border-blue-300'
                }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  MERN
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ 
                  textShadow: isDark ? '0 0 20px rgba(0, 255, 136, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.5px'
                }}>
                {project.title}
              </h3>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 ${
              isDark 
                ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50' 
                : 'bg-gradient-to-br from-cyan-50 to-purple-50 border-cyan-300'
            }`}
              style={isDark ? { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)' } : {}}>
              <project.icon className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </div>
          </div>

          {/* Description */}
          <p className={`mb-3 leading-relaxed text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}>
            {project.description}
          </p>

          {/* Features Accordion */}
          <div className="mb-3">
            <ProjectAccordion title="✨ Key Features" defaultOpen={true} isDark={isDark}>
              <div className="flex flex-wrap gap-1.5">
                {project.features.map((feature, index) => (
                  <span
                    key={index}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 border-cyan-500/30 hover:border-cyan-400' 
                        : 'bg-gradient-to-r from-cyan-50 to-purple-50 text-gray-700 border-cyan-200 hover:border-cyan-400'
                    }`}
                    style={{ 
                      fontFamily: 'Space Grotesk, sans-serif',
                      boxShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.1)' : 'none'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </ProjectAccordion>
          </div>

          {/* Tech Stack Accordion */}
          <div className="mb-3">
            <ProjectAccordion title="🛠️ Tech Stack" defaultOpen={true} isDark={isDark}>
              <div className="flex gap-2 flex-wrap">
                {project.techIcons.map((TechIcon, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110 border-2 ${
                      isDark 
                        ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 hover:border-cyan-400' 
                        : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400'
                    }`}
                    title={project.technologies[index]}
                    style={isDark ? { boxShadow: '0 0 15px rgba(34, 211, 238, 0.15), inset 0 0 10px rgba(34, 211, 238, 0.05)' } : {}}
                  >
                    <TechIcon className={`w-4 h-4 ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`} />
                  </div>
                ))}
              </div>
            </ProjectAccordion>
          </div>

          {/* Image Gallery Preview */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className={`text-xs font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}
                style={{ 
                  textShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.5)' : 'none',
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.5px'
                }}>
                📸 Gallery ({project.images.length})
              </h4>
              <button
                onClick={() => onOpenGallery(project)}
                className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all hover:scale-105 border ${
                  isDark 
                    ? 'bg-gradient-to-r from-neon-green/20 to-cyan-400/20 text-neon-green border-neon-green/50 hover:border-neon-green' 
                    : 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border-cyan-300 hover:border-cyan-500'
                }`}
                style={{ fontFamily: 'Exo 2, sans-serif' }}
              >
                View All →
              </button>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {project.images.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => onOpenGallery(project, index)}
                  className={`flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 border-2 ${
                    index === currentImageIndex 
                      ? 'border-cyan-400 ring-2 ring-cyan-400/50' 
                      : isDark ? 'border-cyan-500/20 opacity-70 hover:opacity-100' : 'border-cyan-200 opacity-70 hover:opacity-100'
                  }`}
                  style={index === currentImageIndex ? { boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)' } : {}}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              {project.images.length > 5 && (
                <button
                  onClick={() => onOpenGallery(project)}
                  className={`flex-shrink-0 w-16 h-11 rounded-lg flex items-center justify-center border-2 ${
                    isDark ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200'
                  }`}
                >
                  <span className={`text-xs font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    +{project.images.length - 5}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 text-black rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 border-2 border-neon-green hover:border-cyan-400"
                style={{ 
                  boxShadow: '0 0 25px rgba(0, 255, 136, 0.5), 0 0 40px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.5px'
                }}
              >
                <FiExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${project.liveDemo ? '' : 'flex-1'} flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 border-2 ${
                  isDark
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30 hover:border-purple-400'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-300 hover:border-purple-500'
                }`}
                style={isDark ? { 
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  fontFamily: 'Space Grotesk, sans-serif'
                } : { fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <FiGithub className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('simple'); // 'simple', 'mern', 'aiml', 'javaswing', 'android'
  const [galleryModal, setGalleryModal] = useState({ isOpen: false, images: [], title: '', startIndex: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Achievement images
  const achievementImages = [
    '/images/achievmet/image.png',
    '/images/achievmet/image copy.png',
    '/images/achievmet/image copy 2.png',
    '/images/achievmet/image copy 3.png',
    '/images/achievmet/image copy 4.png',
    '/images/achievmet/image copy 5.png',
    '/images/achievmet/image copy 6.png',
    '/images/achievmet/image copy 7.png',
    '/images/achievmet/image copy 8.png',
    '/images/achievmet/image copy 9.png',
    '/images/achievmet/image copy 10.png',
    '/images/achievmet/download.png',
    '/images/achievmet/download (1).png',
    '/images/achievmet/download (2).png',
    '/images/achievmet/download (3).png',
    '/images/achievmet/2024-100-lg.png',
    '/images/achievmet/reckon cerficate.jpg',
  ];

  // Auto-slide achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % achievementImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [achievementImages.length]);

  // Project Categories for Simple Projects
  const categories = [
    { id: 'all', name: 'All Projects', icon: FiLayout },
    { id: 'web', name: 'Web Projects', icon: FiMonitor },
    { id: 'internship', name: 'Internship Projects', icon: FiUsers },
    { id: 'games', name: 'Games', icon: FaGamepad },
    { id: 'fullstack', name: 'Full-Stack', icon: FiCode },
  ];

  // Simple Web Projects Data
  const simpleProjects = [
    {
      id: 1,
      title: 'Amazon Clone',
      category: 'web',
      type: 'Simple Web Project',
      description: 'A fully responsive Amazon clone featuring product listings, navigation, and shopping cart UI.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      techIcons: [FaHtml5, FaCss3Alt, FaJs],
      image: '/images/amazon1.png',
      liveDemo: 'https://amazon-clone-kappa-one.vercel.app',
      github: 'https://github.com/sannikumar85/amazon_clone',
      featured: true,
      color: 'from-orange-500 to-yellow-500',
    },
    {
      id: 2,
      title: 'Launchtern',
      category: 'internship',
      type: 'Internship Platform',
      description: 'An internship portal helping students find opportunities and kickstart their professional journey.',
      technologies: ['React', 'Tailwind CSS', 'JavaScript'],
      techIcons: [FaReact, SiTailwindcss, FaJs],
      image: '/images/lunchtern1.png',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/ByIntern',
      featured: true,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 3,
      title: 'GigFloww',
      category: 'internship',
      type: 'Freelance Platform',
      description: 'A creative gig platform connecting freelancers with clients for amazing projects.',
      technologies: ['React', 'CSS3', 'JavaScript'],
      techIcons: [FaReact, FaCss3Alt, FaJs],
      image: '/images/Gigflow1.png',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/GigFloww',
      featured: true,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 4,
      title: 'Tic Tac Toe',
      category: 'games',
      type: 'Interactive Game',
      description: 'A beautiful neon-themed Tic Tac Toe game with smooth animations and win detection.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      techIcons: [FaHtml5, FaCss3Alt, FaJs],
      image: '/images/tictac1.png',
      liveDemo: 'https://tic-tac-toe-game-ivory-one.vercel.app',
      github: 'https://github.com/sannikumar85/tic-tac-toe-game',
      featured: false,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 5,
      title: 'Rock Paper Scissors',
      category: 'games',
      type: 'Interactive Game',
      description: 'Classic Rock Paper Scissors game against the computer with score tracking.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      techIcons: [FaHtml5, FaCss3Alt, FaJs],
      image: '/images/rock1.png',
      liveDemo: 'https://rock-paper-game-sepia.vercel.app/',
      github: 'https://github.com/sannikumar85/rock_paper_game',
      featured: false,
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 6,
      title: 'Music Player Website',
      category: 'fullstack',
      type: 'Full-Stack Application',
      description: 'A feature-rich music streaming website with playlist management and audio visualizer.',
      technologies: ['React', 'Tailwind CSS', 'JavaScript'],
      techIcons: [FaReact, SiTailwindcss, FaJs],
      image: '/images/music1.png',
      liveDemo: 'https://music-project-wesite.vercel.app',
      github: 'https://github.com/sannikumar85/music_project_wesite',
      featured: true,
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 7,
      title: 'Personal Blog',
      category: 'web',
      type: 'Blog Website',
      description: 'A clean and modern personal blog website featuring responsive navigation.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      techIcons: [FaHtml5, FaCss3Alt, FaJs],
      image: '/images/blog1.png',
      liveDemo: null,
      github: 'https://github.com/sannikumar85',
      featured: false,
      color: 'from-slate-500 to-gray-600',
    },
    {
      id: 8,
      title: 'SKG E-Commerce',
      category: 'fullstack',
      type: 'E-Commerce Platform',
      description: 'A complete e-commerce fashion store with product categories and testimonials.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      techIcons: [FaReact, SiTailwindcss, FaJs],
      image: '/images/ecomc1.png',
      liveDemo: 'https://e-commece-by-react.vercel.app/',
      github: 'https://github.com/sannikumar85/e-commece_by_react',
      featured: true,
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  // MERN Stack Projects Data
  const mernProjects = [
    {
      id: 1,
      title: 'Easy Property Solution',
      type: 'Real Estate Platform',
      icon: FiHome,
      description: 'A comprehensive real estate platform for property listings, buying, selling, and renting. Features beautiful property showcases, advanced search, and contact forms for inquiries.',
      features: ['Property Listings', 'Search & Filter', 'Image Gallery', 'Contact Forms', 'Responsive Design', 'Admin Panel'],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      techIcons: [FaReact, FaNodeJs, SiExpress, SiMongodb, SiTailwindcss],
      images: [
        '/images/easy/easy1.png',
        '/images/easy/easy2.png',
        '/images/easy/easy3.png',
        '/images/easy/easy4.png',
        '/images/easy/easy5.png',
        '/images/easy/easy6.png',
        '/images/easy/easy7.png',
        '/images/easy/easy8.png',
        '/images/easy/image9.png',
        '/images/easy/easy10.png',
        '/images/easy/easy11.png',
        '/images/easy/easy12.png',
        '/images/easy/easy13.png',
        '/images/easy/easy14.png',
        '/images/easy/easy15.png',
        '/images/easy/easy16.png',
        '/images/easy/easy17.png',
        '/images/easy/easy18.png',
        '/images/easy/easy19.png',
        '/images/easy/easy20.png',
        '/images/easy/easy21.png',
        '/images/easy/easy22.png',
      ],
      video: '/images/easy/easy_propert_website_video.mp4',
      liveDemo: 'https://eazy-property-solution.vercel.app/',
      github: null,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 2,
      title: 'Consultant Connect',
      type: 'Education Platform',
      icon: FiUsers,
      description: 'A platform where students and teachers connect based on their interests. Features real-time chat, video calling, and voice calling capabilities for seamless communication.',
      features: ['Real-time Chat', 'Video Calling', 'Voice Calling', 'User Matching', 'Profile Management', 'Socket.io Integration'],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      techIcons: [FaReact, FaNodeJs, SiExpress, SiMongodb, SiSocketdotio],
      images: [
        '/images/consultant_app/image.png',
        '/images/consultant_app/image copy.png',
        '/images/consultant_app/image copy 2.png',
        '/images/consultant_app/image copy 3.png',
        '/images/consultant_app/image copy 4.png',
        '/images/consultant_app/image copy 5.png',
        '/images/consultant_app/image copy 6.png',
        '/images/consultant_app/image copy 7.png',
        '/images/consultant_app/image copy 8.png',
        '/images/consultant_app/image copy 9.png',
        '/images/consultant_app/image copy 10.png',
        '/images/consultant_app/image copy 11.png',
        '/images/consultant_app/image copy 12.png',
        '/images/consultant_app/image copy 13.png',
      ],
      video: '/images/consultant_app/consilatnt_company_video.mp4',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/consultant-company',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 3,
      title: 'Chat Application',
      type: 'Real-time Messaging',
      icon: FiMessageCircle,
      description: 'A WhatsApp-style real-time chat application with user authentication, message history, online status, and multimedia sharing capabilities.',
      features: ['Real-time Messaging', 'User Authentication', 'Message History', 'Online Status', 'File Sharing', 'Responsive UI'],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      techIcons: [FaReact, FaNodeJs, SiExpress, SiMongodb, SiSocketdotio],
      images: [
        '/images/chat/image.png',
        '/images/chat/image copy.png',
        '/images/chat/image copy 2.png',
        '/images/chat/image copy 3.png',
        '/images/chat/image copy 4.png',
        '/images/chat/image copy 5.png',
        '/images/chat/image copy 6.png',
        '/images/chat/image copy 7.png',
      ],
      video: '/images/chat/whatshapp_clone_video.mp4',
      liveDemo: 'https://my-chat-website-phi.vercel.app/user-login',
      github: null,
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 4,
      title: 'College Timetable Maker',
      type: 'Academic Tool',
      icon: FiCalendar,
      description: 'An intelligent timetable generator for colleges. Helps in creating conflict-free schedules for classes, teachers, and rooms with an intuitive drag-and-drop interface.',
      features: ['Auto Schedule', 'Conflict Detection', 'Drag & Drop', 'Export Options', 'Teacher Management', 'Room Allocation'],
      technologies: ['React', 'Node.js', 'Tailwind CSS', 'JavaScript'],
      techIcons: [FaReact, FaNodeJs, SiTailwindcss, FaJs],
      images: [
        '/images/timetable/image.png',
        '/images/timetable/image copy.png',
        '/images/timetable/image copy 2.png',
        '/images/timetable/image copy 3.png',
        '/images/timetable/image copy 4.png',
        '/images/timetable/image copy 5.png',
        '/images/timetable/image copy 6.png',
      ],
      video: null,
      liveDemo: null,
      github: 'https://github.com/sannikumar85/colllge_timetable',
      color: 'from-orange-500 to-red-500',
    },
  ];

  // AI/ML Projects Data
  const aimlProjects = [
    {
      id: 1,
      title: 'Camera Capture App',
      type: 'Computer Vision',
      icon: FiCamera,
      description: 'A Python-based camera capture application that allows users to capture images from their webcam. Built with OpenCV for real-time image processing and capture functionality.',
      features: ['Webcam Access', 'Image Capture', 'Real-time Preview', 'Save to File', 'Cross-platform'],
      technologies: ['Python', 'OpenCV', 'NumPy'],
      techIcons: [FaPython, SiOpencv, FaPython],
      images: [
        '/images/ai_ml/capture1.png',
        '/images/ai_ml/image copy.png',
      ],
      video: '/images/ai_ml/capture_video.mp4',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/Ai_related',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Hand & Face Detection',
      type: 'AI Detection',
      icon: FiEye,
      description: 'Real-time hand and face detection system using MediaPipe and OpenCV. Features distance measurement between hand landmarks, FPS counter, and accurate face detection with bounding boxes.',
      features: ['Hand Tracking', 'Face Detection', 'Distance Measurement', 'FPS Counter', 'Real-time Processing', 'Multi-hand Support'],
      technologies: ['Python', 'MediaPipe', 'OpenCV'],
      techIcons: [FaPython, SiOpencv, FaPython],
      images: [
        '/images/ai_ml/distance2.png',
        '/images/ai_ml/image copy.png',
      ],
      video: '/images/ai_ml/distance detectg.mp4',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/Ai_related',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  // Java Swing Projects Data
  const javaSwingProjects = [
    {
      id: 1,
      title: 'B+ Tree Visualizer',
      type: 'Data Structure Visualization',
      icon: FaTree,
      description: 'An interactive B+ Tree visualization tool built with Java Swing. Allows users to insert, delete, and search nodes while visualizing the tree structure in real-time.',
      features: ['Insert Nodes', 'Delete Nodes', 'Search Operation', 'Visual Animation', 'Tree Traversal', 'Step-by-step View'],
      technologies: ['Java', 'Java Swing', 'AWT'],
      techIcons: [FaJava, FaJava, FaJava],
      images: [
        '/images/javaswing/B1.png',
        '/images/javaswing/B2.png',
      ],
      video: '/images/javaswing/B_Video.mp4',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/B-_tree_by_javaSwing',
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 2,
      title: 'SecureBank - Digital Banking',
      type: 'Banking Application',
      icon: FaUniversity,
      description: 'A complete digital banking application with dashboard, transaction history, deposits, withdrawals, and transfers. Features secure user authentication and real-time balance updates.',
      features: ['User Dashboard', 'Transaction History', 'Deposit & Withdraw', 'Fund Transfer', 'Account Settings', 'Secure Login'],
      technologies: ['Java', 'Java Swing', 'AWT'],
      techIcons: [FaJava, FaJava, FaJava],
      images: [
        '/images/javaswing/bank1.png',
        '/images/javaswing/bank2.png',
        '/images/javaswing/bank3.png',
        '/images/javaswing/bank4.png',
      ],
      video: '/images/javaswing/bank_video.mp4',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/Banking_app_by_JavaSwig',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 3,
      title: 'Real-time WiFi Monitor',
      type: 'Network Utility',
      icon: FiWifi,
      description: 'A real-time WiFi speed monitoring application that shows download/upload speeds and connected devices. Features live graphs and network statistics.',
      features: ['Download Speed', 'Upload Speed', 'Connected Devices', 'Live Graphs', 'Network Stats', 'Auto Refresh'],
      technologies: ['Java', 'Java Swing', 'AWT'],
      techIcons: [FaJava, FaJava, FaJava],
      images: [
        '/images/javaswing/wifi1.png',
        '/images/javaswing/wifi2.png',
        '/images/javaswing/wifi3.png',
      ],
      video: '/images/javaswing/wifi_viodeo.mp4',
      liveDemo: null,
      github: 'https://github.com/sannikumar85/realtime_wifispeed_by_javaSwing',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 4,
      title: 'Unit Converter App',
      type: 'Utility Application',
      icon: FiRefreshCw,
      description: 'A comprehensive unit converter application supporting multiple measurement types including length, weight, temperature, and more. Features a clean mobile-like interface.',
      features: ['Length Conversion', 'Weight Conversion', 'Temperature', 'Volume', 'Area', 'Speed'],
      technologies: ['Java', 'Java Swing', 'AWT'],
      techIcons: [FaJava, FaJava, FaJava],
      images: [
        '/images/javaswing/unit1.png',
        '/images/javaswing/unit2.png',
        '/images/javaswing/unit3.png',
        '/images/javaswing/unit4.png',
      ],
      video: null,
      liveDemo: null,
      github: 'https://github.com/sannikumar85/unit_converter_app_using_javaSwing',
      color: 'from-orange-500 to-amber-500',
    },
  ];

  // Android App Projects Data
  const androidProjects = [
    {
      id: 1,
      title: 'Easy Property Solution',
      type: 'Real Estate App',
      icon: FiHome,
      description: 'A mobile application for property solutions built with Flutter and Dart. Features property listings, search functionality, favorites, and contact options for buyers and sellers.',
      features: ['Property Listings', 'Advanced Search', 'Favorites', 'Contact Agents', 'Image Gallery', 'Location Maps'],
      technologies: ['Flutter', 'Dart', 'Firebase'],
      techIcons: [SiFlutter, SiDart, FaAndroid],
      images: [
        '/images/android/easy1.jpeg',
        '/images/android/easy2.jpeg',
        '/images/android/easy3.jpeg',
        '/images/android/easy4.jpeg',
        '/images/android/easy5.jpeg',
        '/images/android/easy6.jpeg',
        '/images/android/easy7.jpeg',
        '/images/android/easy8.jpeg',
        '/images/android/easy9.jpeg',
        '/images/android/easy10.jpeg',
        '/images/android/easy11.jpeg',
        '/images/android/easy12.jpeg',
        '/images/android/easy13.jpeg',
      ],
      video: null,
      liveDemo: null,
      github: null,
      color: 'from-teal-500 to-green-500',
    },
    {
      id: 2,
      title: 'Bus Tracking & Booking',
      type: 'Transportation App',
      icon: FaBus,
      description: 'A comprehensive bus tracking and booking application. Features real-time bus tracking, seat booking, route information, and payment integration for seamless travel experience.',
      features: ['Real-time Tracking', 'Seat Booking', 'Route Info', 'Payment Gateway', 'Trip History', 'Notifications'],
      technologies: ['Flutter', 'Dart', 'Firebase'],
      techIcons: [SiFlutter, SiDart, FaAndroid],
      images: [
        '/images/android/bus1.jpeg',
        '/images/android/bus2.jpeg',
        '/images/android/bus3.jpeg',
        '/images/android/bus4.jpeg',
        '/images/android/bus5.jpeg',
        '/images/android/bus6.jpeg',
        '/images/android/bus7.jpeg',
        '/images/android/bus8.jpeg',
        '/images/android/bus9.jpeg',
        '/images/android/bus10.jpeg',
        '/images/android/bus11.jpeg',
        '/images/android/bus12.jpeg',
      ],
      video: null,
      liveDemo: null,
      github: null,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  // Filter simple projects by category
  const filteredProjects = activeCategory === 'all'
    ? simpleProjects
    : simpleProjects.filter(project => project.category === activeCategory);

  // Open gallery modal
  const openGallery = (project, startIndex = 0) => {
    setGalleryModal({
      isOpen: true,
      images: project.images,
      title: project.title,
      startIndex
    });
  };

  // Open project details modal
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  // Close project details modal
  const closeProjectDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 26, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-4 h-4 rounded-full animate-float opacity-60 ${isDark ? 'bg-neon-green' : 'bg-neon-green/50'}`}
          style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' }}></div>
        <div className={`absolute bottom-40 right-20 w-3 h-3 rounded-full animate-float-delayed opacity-60 ${isDark ? 'bg-neon-green' : 'bg-neon-green/50'}`}
          style={{ boxShadow: '0 0 15px rgba(0, 255, 136, 0.6)' }}></div>
        <div className={`absolute top-1/2 left-1/3 w-2 h-2 rounded-full animate-float opacity-60 ${isDark ? 'bg-neon-green' : 'bg-neon-green/50'}`}
          style={{ boxShadow: '0 0 10px rgba(0, 255, 136, 0.6)' }}></div>
        <div className={`absolute top-1/3 right-1/4 w-3 h-3 rounded-full animate-float-delayed opacity-40 ${isDark ? 'bg-neon-green' : 'bg-neon-green/50'}`}
          style={{ boxShadow: '0 0 12px rgba(0, 255, 136, 0.6)' }}></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(${isDark ? 'rgba(0, 255, 136, 0.5)' : 'rgba(0, 255, 136, 0.3)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 border-2 ${
            isDark ? 'bg-neon-green/10 text-neon-green border-neon-green/50' : 'bg-white text-gray-700 border-neon-green/30'
          }`}
            style={isDark ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' } : {}}>
            🚀 Portfolio Showcase
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? 'from-neon-green via-white to-neon-green' : 'from-gray-800 via-neon-green to-gray-800'
            }`}
              style={isDark ? { textShadow: '0 0 40px rgba(0, 255, 136, 0.5)' } : {}}>
              MY PROJECTS
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore my collection of web applications, MERN stack projects, and more
          </p>
          <div className="w-32 h-1 bg-neon-green mx-auto rounded-full mt-6"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' }}></div>
        </div>

        {/* Section Toggle */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className={`inline-flex flex-wrap justify-center gap-2 p-2 rounded-2xl border-2 ${
            isDark ? 'bg-black/40 border-neon-green/30' : 'bg-white/80 border-gray-300'
          }`}
            style={isDark ? { boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)' } : {}}>
            <button
              onClick={() => setActiveSection('simple')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${
                activeSection === 'simple'
                  ? isDark
                    ? 'bg-neon-green text-black border-neon-green shadow-lg'
                    : 'bg-neon-green text-black border-neon-green shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-neon-green border-transparent hover:border-neon-green/30'
                    : 'text-gray-600 hover:text-neon-green border-transparent hover:border-neon-green/30'
              }`}
              style={activeSection === 'simple' ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)' } : {}}>
              <FiMonitor className="w-4 h-4" />
              <span className="hidden sm:inline">Simple Projects</span>
              <span className="sm:hidden">Web</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeSection === 'simple'
                  ? 'bg-black/20 text-black'
                  : isDark ? 'bg-neon-green/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {simpleProjects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection('mern')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${
                activeSection === 'mern'
                  ? isDark
                    ? 'bg-neon-green text-black border-neon-green shadow-lg'
                    : 'bg-neon-green text-black border-neon-green shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-neon-green border-transparent hover:border-neon-green/30'
                    : 'text-gray-600 hover:text-neon-green border-transparent hover:border-neon-green/30'
              }`}
              style={activeSection === 'mern' ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)' } : {}}>
              <FiLayers className="w-4 h-4" />
              <span className="hidden sm:inline">MERN Stack</span>
              <span className="sm:hidden">MERN</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeSection === 'mern'
                  ? 'bg-black/20 text-black'
                  : isDark ? 'bg-neon-green/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {mernProjects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection('aiml')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${
                activeSection === 'aiml'
                  ? isDark
                    ? 'bg-neon-green text-black border-neon-green shadow-lg'
                    : 'bg-neon-green text-black border-neon-green shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-neon-green border-transparent hover:border-neon-green/30'
                    : 'text-gray-600 hover:text-neon-green border-transparent hover:border-neon-green/30'
              }`}
              style={activeSection === 'aiml' ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)' } : {}}>
              <FiCpu className="w-4 h-4" />
              <span className="hidden sm:inline">AI/ML Projects</span>
              <span className="sm:hidden">AI/ML</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeSection === 'aiml'
                  ? 'bg-black/20 text-black'
                  : isDark ? 'bg-neon-green/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {aimlProjects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection('javaswing')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${
                activeSection === 'javaswing'
                  ? isDark
                    ? 'bg-neon-green text-black border-neon-green shadow-lg'
                    : 'bg-neon-green text-black border-neon-green shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-neon-green border-transparent hover:border-neon-green/30'
                    : 'text-gray-600 hover:text-neon-green border-transparent hover:border-neon-green/30'
              }`}
              style={activeSection === 'javaswing' ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)' } : {}}>
              <FaJava className="w-4 h-4" />
              <span className="hidden sm:inline">Java Swing</span>
              <span className="sm:hidden">Java</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeSection === 'javaswing'
                  ? 'bg-black/20 text-black'
                  : isDark ? 'bg-neon-green/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {javaSwingProjects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection('android')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${
                activeSection === 'android'
                  ? isDark
                    ? 'bg-neon-green text-black border-neon-green shadow-lg'
                    : 'bg-neon-green text-black border-neon-green shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-neon-green border-transparent hover:border-neon-green/30'
                    : 'text-gray-600 hover:text-neon-green border-transparent hover:border-neon-green/30'
              }`}
              style={activeSection === 'android' ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)' } : {}}>
              <FiSmartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Android Apps</span>
              <span className="sm:hidden">Apps</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeSection === 'android'
                  ? 'bg-black/20 text-black'
                  : isDark ? 'bg-neon-green/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {androidProjects.length}
              </span>
            </button>
          </div>
        </div>

        {/* Simple Projects Section */}
        {activeSection === 'simple' && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 border-2 ${
                      activeCategory === category.id
                        ? isDark
                          ? 'bg-neon-green text-black border-neon-green shadow-lg'
                          : 'bg-neon-green text-black border-neon-green shadow-lg'
                        : isDark
                          ? 'bg-black/40 text-gray-300 hover:text-neon-green border-neon-green/30 hover:border-neon-green/50'
                          : 'bg-white text-gray-600 hover:text-neon-green border-gray-300 hover:border-neon-green/50 shadow-sm'
                    }`}
                    style={activeCategory === category.id ? { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' } : {}}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03]"
                  style={{
                    background: isDark 
                      ? 'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(25, 25, 45, 0.85) 100%)' 
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 250, 255, 0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: isDark ? '2px solid rgba(0, 255, 136, 0.35)' : '2px solid rgba(0, 255, 136, 0.25)',
                    boxShadow: isDark 
                      ? '0 8px 32px rgba(0, 255, 136, 0.15), 0 15px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                      : '0 8px 32px rgba(0, 255, 136, 0.1), 0 15px 45px rgba(0, 0, 0, 0.08)',
                    transform: 'perspective(1000px) rotateX(0deg)',
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 text-black text-xs font-bold rounded-full border-2 border-neon-green/50"
                        style={{ 
                          boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), 0 0 30px rgba(34, 211, 238, 0.4)',
                          fontFamily: 'Exo 2, sans-serif',
                          letterSpacing: '0.5px'
                        }}>
                        {project.type}
                      </span>
                    </div>

                    {/* Project Number */}
                    <div className="absolute top-3 right-3">
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold border-2 ${
                        isDark 
                          ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-purple-300 border-purple-400/50' 
                          : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 border-purple-300'
                      }`}
                        style={{ 
                          boxShadow: isDark ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none',
                          fontFamily: 'Rajdhani, sans-serif'
                        }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-green to-cyan-400 border-2 border-white/50 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110"
                          style={{ transitionDelay: '100ms', boxShadow: '0 0 25px rgba(0, 255, 136, 0.7)' }}
                        >
                          <FiExternalLink className="w-4 h-4 text-black" />
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white/50 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:scale-110"
                        style={{ transitionDelay: '150ms', boxShadow: '0 0 25px rgba(168, 85, 247, 0.7)' }}
                      >
                        <FiGithub className="w-4 h-4 text-white" />
                      </a>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}></div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                      style={{ 
                        textShadow: isDark ? '0 0 15px rgba(0, 255, 136, 0.25), 2px 2px 4px rgba(0, 0, 0, 0.4)' : '1px 1px 2px rgba(0, 0, 0, 0.1)',
                        fontFamily: 'Rajdhani, sans-serif',
                        letterSpacing: '0.3px'
                      }}>
                      {project.title}
                    </h3>

                    <p className={`mb-3 text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 text-xs font-medium rounded-md border ${
                            isDark 
                              ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 border-cyan-500/30' 
                              : 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border-cyan-200'
                          }`}
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {project.liveDemo ? (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 text-black text-xs rounded-lg font-bold transition-all duration-300 transform hover:scale-105 border-2 border-neon-green/50"
                          style={{ 
                            boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 30px rgba(34, 211, 238, 0.2)',
                            fontFamily: 'Rajdhani, sans-serif',
                            letterSpacing: '0.3px'
                          }}
                        >
                          <span>Live Demo</span>
                          <FiExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border ${
                          isDark ? 'bg-black/30 text-gray-500 border-gray-700' : 'bg-gray-100 text-gray-400 border-gray-200'
                        }`}
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          No Demo
                        </span>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 border-2 ${
                          isDark
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30 hover:border-purple-400'
                            : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-300 hover:border-purple-500 shadow-sm'
                        }`}
                        style={isDark ? { 
                          boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
                          fontFamily: 'Space Grotesk, sans-serif'
                        } : { fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MERN Stack Projects Section */}
        {activeSection === 'mern' && (
          <>
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-10 rounded-full bg-neon-green"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' }}></div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}
                    style={isDark ? { textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' } : {}}>
                    🚀 Full Stack MERN Projects
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Complete applications built with MongoDB, Express, React, and Node.js
                  </p>
                </div>
              </div>

              {/* MERN Stack Icons */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <SiMongodb className="w-5 h-5 text-green-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>MongoDB</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <SiExpress className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-800'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Express</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaReact className="w-5 h-5 text-cyan-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>React</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaNodeJs className="w-5 h-5 text-green-600" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Node.js</span>
                </div>
              </div>
            </div>

            {/* MERN Projects List */}
            <div className="space-y-8">
              {mernProjects.map((project) => (
                <MernProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  onOpenGallery={openGallery}
                  onOpenDetails={openProjectDetails}
                />
              ))}
            </div>
          </>
        )}

        {/* AI/ML Projects Section */}
        {activeSection === 'aiml' && (
          <>
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-10 rounded-full bg-neon-green"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' }}></div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}
                    style={isDark ? { textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' } : {}}>
                    🤖 AI/ML Projects
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Computer Vision and Machine Learning projects built with Python
                  </p>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaPython className="w-5 h-5 text-yellow-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Python</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <SiOpencv className="w-5 h-5 text-green-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>OpenCV</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FiCpu className="w-5 h-5 text-purple-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>MediaPipe</span>
                </div>
              </div>
            </div>

            {/* AI/ML Projects List */}
            <div className="space-y-8">
              {aimlProjects.map((project) => (
                <MernProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  onOpenGallery={openGallery}
                  onOpenDetails={openProjectDetails}
                />
              ))}
            </div>
          </>
        )}

        {/* Java Swing Projects Section */}
        {activeSection === 'javaswing' && (
          <>
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-10 rounded-full bg-neon-green"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' }}></div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}
                    style={isDark ? { textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' } : {}}>
                    ☕ Java Swing Applications
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Desktop applications built with Java Swing and AWT
                  </p>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaJava className="w-5 h-5 text-red-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Java</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaJava className="w-5 h-5 text-orange-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Swing</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaJava className="w-5 h-5 text-blue-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>AWT</span>
                </div>
              </div>
            </div>

            {/* Java Swing Projects List */}
            <div className="space-y-5">
              {javaSwingProjects.map((project) => (
                <SimpleProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  onOpenDetails={openProjectDetails}
                />
              ))}
            </div>
          </>
        )}

        {/* Android App Projects Section */}
        {activeSection === 'android' && (
          <>
            {/* Section Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-10 rounded-full bg-neon-green"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.6)' }}></div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}
                    style={isDark ? { textShadow: '0 0 20px rgba(0, 255, 136, 0.3)' } : {}}>
                    📱 Android Applications
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Mobile applications built with Flutter and Dart
                  </p>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <SiFlutter className="w-5 h-5 text-cyan-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Flutter</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <SiDart className="w-5 h-5 text-blue-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Dart</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
                  isDark ? 'bg-neon-green/10 border-neon-green/30' : 'bg-white border-gray-300'
                }`}>
                  <FaAndroid className="w-5 h-5 text-green-500" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Android</span>
                </div>
              </div>
            </div>

            {/* Android Projects List */}
            <div className="space-y-5">
              {androidProjects.map((project) => (
                <SimpleProjectCard
                  key={project.id}
                  project={project}
                  isDark={isDark}
                  onOpenDetails={openProjectDetails}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {/* Achievements Section - Auto Sliding Gallery */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiStar className={isDark ? 'text-neon-green' : 'text-orange-500'} size={32} />
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ 
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '2px'
              }}>
              MY ACHIEVEMENTS
            </h2>
            <FiAward className={isDark ? 'text-neon-green' : 'text-orange-500'} size={32} />
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}>
            Recognition & Certificates
          </p>
        </div>

        {/* Auto-sliding Image Gallery */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main display area */}
          <div className="relative overflow-hidden rounded-2xl"
            style={{
              height: '500px',
              background: isDark 
                ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(34, 211, 238, 0.05))' 
                : 'linear-gradient(135deg, rgba(251, 146, 60, 0.05), rgba(234, 179, 8, 0.05))',
              border: isDark ? '2px solid rgba(0, 255, 136, 0.2)' : '2px solid rgba(251, 146, 60, 0.2)',
              boxShadow: isDark 
                ? '0 20px 60px rgba(0, 255, 136, 0.15), inset 0 0 40px rgba(0, 255, 136, 0.05)' 
                : '0 20px 60px rgba(251, 146, 60, 0.12), inset 0 0 30px rgba(251, 146, 60, 0.04)'
            }}>
            
            {/* Animated Background Glow */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(0, 255, 136, 0.4), transparent)' 
                    : 'radial-gradient(circle, rgba(251, 146, 60, 0.3), transparent)',
                  animation: 'pulse-glow 4s ease-in-out infinite'
                }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)' 
                    : 'radial-gradient(circle, rgba(234, 179, 8, 0.25), transparent)',
                  animation: 'pulse-glow 5s ease-in-out infinite reverse'
                }}></div>
            </div>

            {/* Images Container */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              {achievementImages.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-1000"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    transform: index === currentImageIndex 
                      ? 'scale(1) translateX(0)' 
                      : index < currentImageIndex 
                        ? 'scale(0.8) translateX(-100px)' 
                        : 'scale(0.8) translateX(100px)',
                    pointerEvents: index === currentImageIndex ? 'auto' : 'none'
                  }}
                >
                  <img
                    src={image}
                    alt={`Achievement ${index + 1}`}
                    className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-500 hover:scale-105"
                    style={{
                      filter: isDark ? 'brightness(1.05)' : 'brightness(1)',
                      boxShadow: isDark 
                        ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
                        : '0 10px 40px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                prev === 0 ? achievementImages.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              style={{
                background: isDark 
                  ? 'rgba(0, 255, 136, 0.15)' 
                  : 'rgba(251, 146, 60, 0.15)',
                border: isDark ? '2px solid rgba(0, 255, 136, 0.4)' : '2px solid rgba(251, 146, 60, 0.4)',
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0, 255, 136, 0.2)' 
                  : '0 4px 20px rgba(251, 146, 60, 0.15)'
              }}
            >
              <span className={`text-2xl font-bold ${isDark ? 'text-neon-green' : 'text-orange-500'}`}>‹</span>
            </button>
            
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                (prev + 1) % achievementImages.length
              )}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
              style={{
                background: isDark 
                  ? 'rgba(0, 255, 136, 0.15)' 
                  : 'rgba(251, 146, 60, 0.15)',
                border: isDark ? '2px solid rgba(0, 255, 136, 0.4)' : '2px solid rgba(251, 146, 60, 0.4)',
                boxShadow: isDark 
                  ? '0 4px 20px rgba(0, 255, 136, 0.2)' 
                  : '0 4px 20px rgba(251, 146, 60, 0.15)'
              }}
            >
              <span className={`text-2xl font-bold ${isDark ? 'text-neon-green' : 'text-orange-500'}`}>›</span>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {achievementImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="transition-all duration-300"
                style={{
                  width: index === currentImageIndex ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: index === currentImageIndex
                    ? isDark 
                      ? 'linear-gradient(90deg, #00ff88, #22d3ee)' 
                      : 'linear-gradient(90deg, #fb923c, #fbbf24)'
                    : isDark 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.2)',
                  boxShadow: index === currentImageIndex
                    ? isDark 
                      ? '0 0 15px rgba(0, 255, 136, 0.6)' 
                      : '0 0 12px rgba(251, 146, 60, 0.5)'
                    : 'none'
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <div className={`text-center mt-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className={isDark ? 'text-neon-green' : 'text-orange-500'}>{currentImageIndex + 1}</span> / {achievementImages.length}
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {galleryModal.isOpen && (
        <ImageGalleryModal
          images={galleryModal.images}
          title={galleryModal.title}
          startIndex={galleryModal.startIndex}
          onClose={() => setGalleryModal({ ...galleryModal, isOpen: false })}
          isDark={isDark}
        />
      )}

      {/* Project Details Modal */}
      {isDetailsModalOpen && selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={closeProjectDetails}
          isDark={isDark}
        />
      )}
    </section>
  );
};

export default Projects;
