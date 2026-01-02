import { useState, useEffect, useRef } from 'react';
import { FiDownload, FiCode, FiCpu, FiMail, FiPhone, FiMapPin, FiUser, FiArrowRight, FiStar, FiZap, FiAward, FiBookOpen } from 'react-icons/fi';
import { SiPython, SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiExpress, SiNodedotjs, SiBootstrap, SiMongodb, SiGit, SiGithub, SiAdobephotoshop } from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 360 rotating gallery images
  const galleryImages = [
    '/images/sanni1.jpg',
    '/images/sanni2.jpg',
    '/images/sanni3.jpg',
    '/images/sanni4.jpg',
    '/images/sanni5.jpg',
    '/images/sanni6.jpg',
    '/images/sanni7.jpg',
    '/images/sanni8.jpg',
  ];

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [galleryRadius, setGalleryRadius] = useState(200);
  const containerRef = useRef(null);

  // Handle responsive gallery radius
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) {
          setGalleryRadius(120);
        } else if (window.innerWidth < 640) {
          setGalleryRadius(140);
        } else if (window.innerWidth < 768) {
          setGalleryRadius(160);
        } else {
          setGalleryRadius(200);
        }
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Auto rotation
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.3);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  // Mouse/Touch handlers for manual rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const diff = currentX - startX;
    setRotation(prev => prev + diff * 0.5);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const languages = [
    { icon: DiJava, name: 'Java', color: '#f89820' },
    { icon: SiPython, name: 'Python', color: '#3776ab' },
    { icon: SiHtml5, name: 'HTML5', color: '#e34f26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572b6' },
    { icon: SiJavascript, name: 'JavaScript', color: '#f7df1e' },
  ];

  const frameworks = [
    { icon: SiReact, name: 'React', color: '#61dafb' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06b6d4' },
    { icon: SiExpress, name: 'Express', color: isDark ? '#ffffff' : '#333333' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiBootstrap, name: 'Bootstrap', color: '#7952b3' },
  ];

  const tools = [
    { icon: SiMongodb, name: 'MongoDB', color: '#47a248' },
    { icon: SiGit, name: 'Git', color: '#f05032' },
    { icon: SiGithub, name: 'GitHub', color: isDark ? '#ffffff' : '#333333' },
    { icon: VscVscode, name: 'VS Code', color: '#007acc' },
    { icon: SiAdobephotoshop, name: 'Photoshop', color: '#31a8ff' },
  ];

  const qualifications = [
    {
      image: '/images/rss-logo.png',
      title: 'RSS Saraswati Shishu Mandir',
      description: 'I completed my schooling from RSS Saraswati Shishu Mandir, studying from class 1 to 10. The school provided me with a strong foundation in academics, discipline, and moral values.',
      position: 'left',
      type: 'education'
    },
    {
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=150',
      title: '10th Grade - Bihar Board',
      description: 'I completed my 10th from Bihar Board with 88%. I worked hard to achieve a strong academic score. This milestone helped build my educational foundation.',
      position: 'right',
      type: 'education'
    },
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150',
      title: '12th Grade - Bihar Board (ISC)',
      description: 'I completed my 12th from Bihar Board (ISC) with 80%. I focused on academics and worked hard to achieve this score. This helped me build a strong base for my higher studies.',
      position: 'left',
      type: 'education'
    },
    {
      image: '/images/jiet-logo.png',
      title: 'B.Tech - JIET Group of Institutions',
      description: 'I am pursuing B.Tech in Computer Science and Engineering from JIET Group of Institutions. This institution provides excellent technical education and practical exposure in modern technologies.',
      position: 'right',
      type: 'education'
    },
    {
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=150',
      title: 'MERN Stack Developer',
      description: 'I am a passionate MERN Stack Developer with experience in building full-stack web applications using MongoDB, Express.js, React, and Node.js. I create scalable and efficient solutions.',
      position: 'left',
      type: 'skill',
      icon: '🚀'
    },
    {
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150',
      title: 'App Developer',
      description: 'I have experience in mobile app development using Flutter and React Native, creating cross-platform applications. I build intuitive and performant mobile experiences.',
      position: 'right',
      type: 'skill',
      icon: '📱'
    },
    {
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150',
      title: 'Full Stack Development',
      description: 'As a Full Stack Developer, I work on both frontend and backend technologies, delivering complete web solutions. I handle everything from database design to UI/UX implementation.',
      position: 'left',
      type: 'skill',
      icon: '💻'
    },
    {
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150',
      title: 'Sports Enthusiast',
      description: 'I am passionate about sports and actively play cricket, kabaddi, kho-kho, football, volleyball, and badminton. Engaging in multiple sports keeps me physically fit and enhances my teamwork and strategy skills.',
      position: 'right',
      type: 'sports',
      icon: '⚽'
    },
  ];

  const contactInfo = [
    { 
      icon: FiUser, 
      label: 'NAME', 
      value: 'Sanni Kumar Gupta',
      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.1))',
      borderColor: 'rgba(139, 92, 246, 0.4)',
      iconBg: 'rgba(139, 92, 246, 0.2)',
      textColor: '#a78bfa'
    },
    { 
      icon: FiPhone, 
      label: 'PHONE', 
      value: '+91 8579037260',
      gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.1))',
      borderColor: 'rgba(236, 72, 153, 0.4)',
      iconBg: 'rgba(236, 72, 153, 0.2)',
      textColor: '#f472b6'
    },
    { 
      icon: FiMail, 
      label: 'EMAIL', 
      value: 'sannikumargupta43@gmail.com',
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
      borderColor: 'rgba(59, 130, 246, 0.4)',
      iconBg: 'rgba(59, 130, 246, 0.2)',
      textColor: '#60a5fa'
    },
    { 
      icon: FiMapPin, 
      label: 'ADDRESS', 
      value: 'Muzaffarpur, Bihar, India',
      gradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(180, 83, 9, 0.1))',
      borderColor: 'rgba(217, 119, 6, 0.4)',
      iconBg: 'rgba(217, 119, 6, 0.2)',
      textColor: '#fb923c'
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-12 sm:py-16 md:py-24 overflow-x-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0a0a1a 0%, #0d1b1e 50%, #0a1412 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-morph ${isDark ? 'bg-neon-green/10' : 'bg-green-400/20'}`}></div>
        <div className={`absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl animate-morph ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-300/20'}`} style={{ animationDelay: '-4s' }}></div>
        <div className={`absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl animate-morph ${isDark ? 'bg-lime-400/10' : 'bg-lime-300/20'}`} style={{ animationDelay: '-8s' }}></div>
        
        {/* Floating particles */}
        <div className={`absolute top-40 left-40 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-neon-green/60' : 'bg-green-500/60'}`}></div>
        <div className={`absolute bottom-40 right-40 w-3 h-3 rounded-full animate-float-delayed ${isDark ? 'bg-emerald-400/60' : 'bg-emerald-500/60'}`}></div>
        <div className={`absolute top-1/3 right-1/3 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-lime-400/60' : 'bg-lime-500/60'}`} style={{ animationDelay: '-2s' }}></div>
        
        {/* Grid pattern */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-[0.03]'}`}
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#00ff88' : '#10b981'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold mb-8 backdrop-blur-xl shadow-2xl transform hover:scale-105 transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 border-2 border-purple-400/30' 
              : 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-2 border-purple-300'
          }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isDark ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}></span>
            </span>
            <span className={isDark ? 'text-purple-300' : 'text-purple-600'} style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>Get to Know Me</span>
            <FiStar className={isDark ? 'text-orange-400' : 'text-orange-500'} />
          </span>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 px-4"
            style={{
              fontFamily: "'Montserrat', 'Bebas Neue', sans-serif",
              letterSpacing: '6px',
              lineHeight: '1.1',
              background: isDark
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #667eea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: isDark 
                ? 'drop-shadow(0 0 40px rgba(102, 126, 234, 0.3)) drop-shadow(0 0 80px rgba(118, 75, 162, 0.2))' 
                : 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.2))',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 8s ease infinite'
            }}
          >
            About Me
          </h2>
          
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            style={{
              fontFamily: "'Open Sans', 'Inter', sans-serif",
              fontWeight: '500',
              lineHeight: '1.8'
            }}
          >
            Get to know more about my journey, skills, and qualifications ✨
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className={`w-16 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent via-purple-500 to-pink-500' : 'bg-gradient-to-r from-transparent via-purple-400 to-pink-400'}`}></div>
            <div className={`w-5 h-5 rounded-full animate-pulse ${isDark ? 'bg-gradient-to-br from-purple-400 to-pink-500' : 'bg-gradient-to-br from-purple-500 to-pink-600'}`} style={{ boxShadow: isDark ? '0 0 20px rgba(168, 85, 247, 0.5)' : '0 0 20px rgba(147, 51, 234, 0.4)' }}></div>
            <div className={`w-40 h-1.5 rounded-full ${isDark ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500' : 'bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400'}`}></div>
            <div className={`w-5 h-5 rounded-full animate-pulse ${isDark ? 'bg-gradient-to-br from-pink-400 to-orange-500' : 'bg-gradient-to-br from-pink-500 to-orange-600'}`} style={{ animationDelay: '0.5s', boxShadow: isDark ? '0 0 20px rgba(236, 72, 153, 0.5)' : '0 0 20px rgba(219, 39, 119, 0.4)' }}></div>
            <div className={`w-16 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-transparent' : 'bg-gradient-to-r from-orange-400 via-pink-400 to-transparent'}`}></div>
          </div>
        </div>

        {/* About Content - Profile and Info */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start mb-24 px-4 sm:px-0 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left Side - Profile Image with Oval Shape and 3D Animation */}
          <div className="flex justify-center items-center px-4 sm:px-0">
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]" style={{ perspective: '1000px' }}>
              {/* Main container - responsive sizes */}
              <div 
                className="relative w-full aspect-[4/5] mx-auto transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(0deg) rotateY(0deg)',
                  maxWidth: '300px'
                }}
                onMouseMove={(e) => {
                  if (window.innerWidth >= 768) { // Only on desktop
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 25;
                    const rotateY = (centerX - x) / 25;
                    e.currentTarget.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                }}
              >
                
                {/* Blue glowing oval aura - behind image */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] pointer-events-none"
                  style={{
                    borderRadius: '50%',
                    background: 'transparent',
                    border: '3px solid rgba(0, 200, 255, 0.8)',
                    boxShadow: `
                      0 0 25px rgba(0, 200, 255, 0.7),
                      0 0 50px rgba(0, 180, 255, 0.5),
                      0 0 75px rgba(0, 160, 255, 0.35),
                      0 0 100px rgba(0, 140, 255, 0.25),
                      inset 0 0 30px rgba(0, 200, 255, 0.15)
                    `,
                    animation: 'pulse 3s ease-in-out infinite',
                    transform: 'translateZ(-20px)',
                  }}
                ></div>

                {/* Secondary inner glow oval */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[84%] h-[84%] pointer-events-none"
                  style={{
                    borderRadius: '50%',
                    background: 'transparent',
                    border: '1.5px solid rgba(0, 255, 255, 0.4)',
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 200, 255, 0.1)',
                    transform: 'translateZ(-15px)',
                  }}
                ></div>

                {/* Outer subtle oval */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] pointer-events-none"
                  style={{
                    borderRadius: '50%',
                    background: 'transparent',
                    border: '1px solid rgba(0, 180, 255, 0.25)',
                    boxShadow: '0 0 40px rgba(0, 150, 255, 0.15)',
                    transform: 'translateZ(-25px)',
                  }}
                ></div>

                {/* Profile Image Container - Oval shape */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                  style={{
                    borderRadius: '50%',
                    boxShadow: isDark 
                      ? '0 0 40px rgba(0, 200, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.5)'
                      : '0 0 30px rgba(0, 150, 255, 0.25), 0 20px 40px rgba(0, 0, 0, 0.3)',
                    border: '3px solid rgba(0, 180, 255, 0.3)',
                    transform: 'translateZ(10px)',
                  }}
                >
                  <img
                    src="/images/sanni-pro.jpg"
                    alt="Sanni Kumar Gupta"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.src = 'https://sanniportfolio8579.netlify.app/assets/sanni3-mWkZ6tBl.jpg';
                    }}
                  />
                  
                  {/* Rim light glow effect overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: '50%',
                      background: `
                        linear-gradient(90deg, rgba(0, 180, 255, 0.2) 0%, transparent 20%, transparent 80%, rgba(0, 180, 255, 0.2) 100%),
                        linear-gradient(180deg, rgba(0, 150, 255, 0.15) 0%, transparent 25%, transparent 100%)
                      `,
                    }}
                  ></div>
                </div>

                {/* Floating particles */}
                <div className="absolute top-[5%] right-[10%] w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse opacity-60"></div>
                <div className="absolute top-[15%] left-[5%] w-1 h-1 rounded-full bg-blue-400 animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-[20%] right-[5%] w-1 h-1 rounded-full bg-cyan-300 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-[30%] left-[8%] w-0.5 h-0.5 rounded-full bg-white animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-black"
              style={{
                fontFamily: "'Raleway', 'Montserrat', sans-serif",
                letterSpacing: '3px',
                background: isDark
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isDark 
                  ? 'drop-shadow(0 0 30px rgba(102, 126, 234, 0.3))'
                  : 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.2))',
              }}
            >
              SANNI KUMAR GUPTA
            </h3>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-105"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.2))' 
                  : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.15))',
                border: `2px solid ${isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.4)'}`,
                boxShadow: isDark 
                  ? '0 8px 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)' 
                  : '0 8px 25px rgba(139, 92, 246, 0.2)'
              }}>
              <FiZap className={isDark ? 'text-purple-300' : 'text-purple-600'} size={20} />
              <p className={`text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-purple-900'}`}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '2px'
                }}
              >
                MERN-STACK DEVELOPER
              </p>
              <FiCode className={isDark ? 'text-purple-300' : 'text-purple-600'} size={20} />
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              My name is Sanni Kumar Gupta. I am pursuing a B.Tech in Computer Science and Engineering. 
              I am a passionate full-stack MERN developer. I have experience in building web applications 
              using React, Node.js, Express, and MongoDB. I am currently learning Data Structures and 
              Algorithms in Java. I enjoy solving coding problems and optimizing performance. I have a 
              strong interest in backend development and database management. I am also skilled in 
              front-end technologies like HTML, CSS, and JavaScript. 🚀
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div 
                    key={index}
                    className="group relative flex items-center gap-4 p-5 rounded-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden"
                    style={{
                      background: isDark ? info.gradient : info.gradient.replace('0.2', '0.3').replace('0.1', '0.2'),
                      border: `2px solid ${info.borderColor}`,
                      boxShadow: isDark 
                        ? `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 40px ${info.borderColor.replace('0.4', '0.15')}` 
                        : `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 30px ${info.borderColor.replace('0.4', '0.1')}`
                    }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${info.borderColor}, transparent)`,
                        filter: 'blur(20px)'
                      }}></div>
                    
                    {/* Icon container */}
                    <div className="relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: info.iconBg,
                        border: `2px solid ${info.borderColor}`,
                        boxShadow: `0 8px 20px ${info.borderColor.replace('0.4', '0.3')}`
                      }}>
                      <IconComponent className="w-7 h-7" style={{ color: info.textColor }} />
                    </div>
                    
                    {/* Info text */}
                    <div className="relative flex-1">
                      <span className={`text-xs font-bold uppercase tracking-wider block mb-1`}
                        style={{ 
                          fontFamily: 'Roboto, sans-serif',
                          color: isDark ? '#9ca3af' : '#6b7280'
                        }}>
                        {info.label}
                      </span>
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`} 
                        style={{ fontFamily: 'Inter, sans-serif' }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download Resume Button */}
            <a
              href="https://drive.google.com/file/d/1JJhZf4gy3hqgKWs_6X5lmLZsh3AN-VvW/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl overflow-hidden backdrop-blur-xl border-2"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '2px',
                background: isDark
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                borderColor: isDark ? '#764ba2' : '#667eea',
                boxShadow: isDark
                  ? '0 20px 60px rgba(102, 126, 234, 0.5), 0 0 40px rgba(118, 75, 162, 0.3)'
                  : '0 20px 60px rgba(102, 126, 234, 0.4), 0 0 40px rgba(118, 75, 162, 0.2)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <FiDownload className="relative z-10 w-6 h-6 text-white group-hover:animate-bounce" />
              <span className="relative z-10 text-white">DOWNLOAD RESUME</span>
              <FiArrowRight className="relative z-10 w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-500" />
            </a>
          </div>
        </div>

        {/* Skills Section with 360 Gallery */}
        <div className={`mb-24 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 px-4"
              style={{
                fontFamily: "'Montserrat', 'Bebas Neue', sans-serif",
                letterSpacing: '6px',
                lineHeight: '1.1',
                background: isDark
                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)'
                  : 'linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isDark 
                  ? 'drop-shadow(0 0 40px rgba(240, 147, 251, 0.3)) drop-shadow(0 0 80px rgba(79, 172, 254, 0.2))' 
                  : 'drop-shadow(0 0 30px rgba(240, 147, 251, 0.2))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 8s ease infinite'
              }}
            >
              My Skills 💪
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent to-white/80' : 'bg-gradient-to-r from-transparent to-gray-400'}`}></div>
              <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-white/80' : 'bg-gray-400'}`}></div>
              <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-white/80' : 'bg-gray-400'}`}></div>
              <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-white/80' : 'bg-gray-400'}`} style={{ animationDelay: '0.5s' }}></div>
              <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-white/80 to-transparent' : 'bg-gradient-to-r from-gray-400 to-transparent'}`}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Skills Left Side */}
            <div className="space-y-10">
              {/* Languages */}
              <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] backdrop-blur-2xl border-2 overflow-hidden group ${isDark ? 'bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 border-purple-500/30' : 'bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-blue-50/80 border-purple-300 shadow-2xl'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="relative text-2xl font-black mb-8 flex items-center gap-3"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '2px',
                    background: isDark ? 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)' : 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  <FiCode className={`w-7 h-7 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-4">
                  {languages.map((lang, index) => {
                    const IconComponent = lang.icon;
                    return (
                      <div
                        key={index}
                        className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 cursor-pointer ${
                          isDark 
                            ? 'bg-gray-900/50 hover:bg-gray-900 border border-gray-700/50 hover:border-neon-green/50' 
                            : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-green-400 hover:shadow-lg'
                        }`}
                        onMouseEnter={() => setHoveredSkill(lang.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        {/* Glow effect on hover */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                          style={{ boxShadow: `0 0 30px ${lang.color}30` }}
                        />
                        <IconComponent 
                          className="w-10 h-10 transition-all duration-300 group-hover:scale-110" 
                          style={{ color: lang.color }}
                        />
                        {/* Tooltip */}
                        <span className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap z-20 ${
                          isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                        }`}>
                          {lang.name}
                          <span className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-gray-800' : 'bg-gray-900'}`}></span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Frameworks */}
              <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] backdrop-blur-2xl border-2 overflow-hidden group ${isDark ? 'bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-teal-900/30 border-blue-500/30' : 'bg-gradient-to-br from-blue-50/80 via-cyan-50/80 to-teal-50/80 border-blue-300 shadow-2xl'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="relative text-2xl font-black mb-8 flex items-center gap-3"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '2px',
                    background: isDark ? 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  <FiCpu className={`w-7 h-7 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  Frameworks
                </h3>
                <div className="flex flex-wrap gap-4">
                  {frameworks.map((fw, index) => {
                    const IconComponent = fw.icon;
                    return (
                      <div
                        key={index}
                        className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 cursor-pointer ${
                          isDark 
                            ? 'bg-gray-900/50 hover:bg-gray-900 border border-gray-700/50 hover:border-emerald-500/50' 
                            : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-lg'
                        }`}
                        onMouseEnter={() => setHoveredSkill(fw.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                          style={{ boxShadow: `0 0 30px ${fw.color}30` }}
                        />
                        <IconComponent 
                          className="w-10 h-10 transition-all duration-300 group-hover:scale-110" 
                          style={{ color: fw.color }}
                        />
                        <span className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap z-20 ${
                          isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                        }`}>
                          {fw.name}
                          <span className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-gray-800' : 'bg-gray-900'}`}></span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tools */}
              <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] backdrop-blur-2xl border-2 overflow-hidden group ${isDark ? 'bg-gradient-to-br from-orange-900/30 via-amber-900/20 to-yellow-900/30 border-orange-500/30' : 'bg-gradient-to-br from-orange-50/80 via-amber-50/80 to-yellow-50/80 border-orange-300 shadow-2xl'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="relative text-2xl font-black mb-8 flex items-center gap-3"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    letterSpacing: '2px',
                    background: isDark ? 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)' : 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  <FiZap className={`w-7 h-7 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                  Tools
                </h3>
                <div className="flex flex-wrap gap-4">
                  {tools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                      <div
                        key={index}
                        className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 cursor-pointer ${
                          isDark 
                            ? 'bg-gray-900/50 hover:bg-gray-900 border border-gray-700/50 hover:border-lime-500/50' 
                            : 'bg-gray-50 hover:bg-white border border-gray-200 hover:border-lime-400 hover:shadow-lg'
                        }`}
                        onMouseEnter={() => setHoveredSkill(tool.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                          style={{ boxShadow: `0 0 30px ${tool.color}30` }}
                        />
                        <IconComponent 
                          className="w-10 h-10 transition-all duration-300 group-hover:scale-110" 
                          style={{ color: tool.color }}
                        />
                        <span className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 whitespace-nowrap z-20 ${
                          isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                        }`}>
                          {tool.name}
                          <span className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-gray-800' : 'bg-gray-900'}`}></span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 360 Rotating Gallery Right Side */}
            <div className="flex flex-col items-center justify-center mt-8 lg:mt-0">
              <div 
                ref={containerRef}
                className="relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                style={{ perspective: '1000px', cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                {/* Glow effect behind gallery */}
                <div className={`absolute inset-0 rounded-full blur-3xl animate-morph ${isDark ? 'bg-neon-green/20' : 'bg-green-400/30'}`} style={{ transform: 'scale(1.5)' }} />
                
                <div 
                  className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${rotation}deg)`,
                  }}
                >
                  {galleryImages.map((img, index) => {
                    const angle = (360 / galleryImages.length) * index;
                    return (
                      <div
                        key={index}
                        className={`absolute w-28 h-36 sm:w-32 sm:h-44 md:w-40 md:h-52 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${isDark ? 'border-2 border-neon-green/30' : 'border-2 border-green-400/30'}`}
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(${galleryRadius}px)`,
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        {/* Overlay gradient */}
                        <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ${isDark ? 'bg-gradient-to-t from-neon-green/50 to-transparent' : 'bg-gradient-to-t from-green-900/30 to-transparent'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Instruction text */}
              <p className={`mt-8 text-sm flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className="animate-pulse">👆</span>
                Drag to rotate the gallery
              </p>
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 px-4"
              style={{
                fontFamily: "'Montserrat', 'Bebas Neue', sans-serif",
                letterSpacing: '6px',
                lineHeight: '1.1',
                background: isDark
                  ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)'
                  : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 25%, #667eea 50%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: isDark 
                  ? 'drop-shadow(0 0 40px rgba(67, 233, 123, 0.3)) drop-shadow(0 0 80px rgba(102, 126, 234, 0.2))' 
                  : 'drop-shadow(0 0 30px rgba(67, 233, 123, 0.2))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 8s ease infinite'
              }}
            >
              My Qualification 🎓
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent to-white/80' : 'bg-gradient-to-r from-transparent to-gray-400'}`}></div>
              <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-white/80' : 'bg-gray-400'}`}></div>
              <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-white/80' : 'bg-gray-400'}`}></div>
              <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-white/80' : 'bg-gray-400'}`} style={{ animationDelay: '0.5s' }}></div>
              <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-white/80 to-transparent' : 'bg-gradient-to-r from-gray-400 to-transparent'}`}></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line with gradient animation */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full hidden md:block rounded-full ${isDark ? 'bg-gradient-to-b from-neon-green via-emerald-500 to-lime-400' : 'bg-gradient-to-b from-green-400 via-emerald-400 to-green-500'}`}>
              <div className="absolute inset-0 animate-gradientMove bg-gradient-to-b from-transparent via-white/30 to-transparent" style={{ backgroundSize: '100% 200%' }} />
            </div>

            {qualifications.map((qual, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                {/* Timeline dot with pulse effect */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10" style={{ top: '50%', marginTop: '-16px' }}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-neon-green' : 'bg-green-500'}`}>
                      <div className={`w-full h-full rounded-full animate-ping ${isDark ? 'bg-neon-green' : 'bg-green-500'}`} style={{ animationDuration: '2s' }} />
                    </div>
                  </div>
                </div>

                <div className={`flex flex-col md:flex-row items-center gap-8 ${qual.position === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content Card */}
                  <div 
                    className={`group w-full md:w-5/12 p-8 rounded-3xl transition-all duration-700 hover:scale-[1.08] hover:-translate-y-3 relative overflow-hidden backdrop-blur-2xl border-2 ${qual.position === 'left' ? 'md:mr-auto' : 'md:ml-auto'} ${
                      isDark 
                        ? 'bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-blue-900/40 border-purple-500/40' 
                        : 'bg-gradient-to-br from-white/90 via-purple-50/90 to-pink-50/90 border-purple-300 shadow-2xl'
                    }`}
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d'
                    }}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 20;
                      const rotateY = (centerX - x) / 20;
                      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
                    }}
                  >
                    {/* Animated gradient border on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                      style={{
                        background: isDark 
                          ? 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #667eea)' 
                          : 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient-rotate 4s linear infinite',
                        padding: '3px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor'
                      }}
                    />
                    
                    {/* Glowing shadow effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-3xl"
                      style={{
                        background: isDark 
                          ? 'linear-gradient(45deg, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6), rgba(240, 147, 251, 0.6))' 
                          : 'linear-gradient(45deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))',
                      }}
                    />

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float-particle ${3 + i}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                            filter: 'blur(1px)'
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col gap-6 relative z-10">
                      {/* Header with Image and Title */}
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Image with hover effect */}
                        <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 p-1.5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl"
                          style={{
                            background: isDark
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                              : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                            boxShadow: isDark
                              ? '0 10px 40px rgba(102, 126, 234, 0.4)'
                              : '0 10px 40px rgba(102, 126, 234, 0.3)',
                            transform: 'translateZ(20px)'
                          }}>
                          <div className={`w-full h-full rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center`}>
                            <img
                              src={qual.image}
                              alt={qual.title || "Qualification"}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-3"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 text-white text-2xl font-bold">${qual.icon || (index + 1)}</div>`;
                              }}
                            />
                          </div>
                          {/* Type badge with icon */}
                          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                            style={{
                              background: qual.type === 'education' 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                : qual.type === 'skill'
                                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                              boxShadow: isDark 
                                ? '0 0 25px rgba(102, 126, 234, 0.8), 0 0 40px rgba(118, 75, 162, 0.5)' 
                                : '0 0 25px rgba(102, 126, 234, 0.6)',
                            }}
                          >
                            {qual.icon || (index + 1)}
                          </div>
                          <FiBookOpen className={`absolute -bottom-2 -left-2 w-7 h-7 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} 
                            style={{ 
                              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
                              transform: 'translateZ(10px)'
                            }} 
                          />
                        </div>

                        {/* Title - visible on larger screens */}
                        {qual.title && (
                          <div className="flex-1 hidden sm:block">
                            <h3 className={`text-xl font-bold mb-2 transition-all duration-500 group-hover:scale-105 ${isDark ? 'text-white' : 'text-gray-900'}`}
                              style={{ 
                                fontFamily: "'Rajdhani', sans-serif",
                                background: isDark ? 'linear-gradient(135deg, #667eea, #f093fb)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: isDark ? '0 0 30px rgba(102, 126, 234, 0.5)' : 'none',
                                transform: 'translateZ(15px)'
                              }}>
                              {qual.title}
                            </h3>
                            {/* Type badge */}
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-500 group-hover:scale-110 ${
                              qual.type === 'education' ? 'bg-purple-500/20 text-purple-300' :
                              qual.type === 'skill' ? 'bg-pink-500/20 text-pink-300' :
                              'bg-cyan-500/20 text-cyan-300'
                            }`} style={{ transform: 'translateZ(10px)' }}>
                              {qual.type === 'education' ? '🎓 Education' : qual.type === 'skill' ? '⚡ Skill' : '🏆 Achievement'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title - visible on mobile */}
                      {qual.title && (
                        <h3 className={`sm:hidden text-xl font-bold text-center transition-all duration-500 group-hover:scale-105 ${isDark ? 'text-white' : 'text-gray-900'}`}
                          style={{ 
                            fontFamily: "'Rajdhani', sans-serif",
                            background: isDark ? 'linear-gradient(135deg, #667eea, #f093fb)' : 'linear-gradient(135deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}>
                          {qual.title}
                        </h3>
                      )}
                      
                      {/* Description */}
                      <p className={`text-sm leading-relaxed transition-all duration-500 ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}
                        style={{ 
                          fontFamily: "'Open Sans', sans-serif",
                          transform: 'translateZ(5px)'
                        }}>
                        {qual.description}
                      </p>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block transition-all duration-500 group-hover:scale-150 ${qual.position === 'left' ? 'right-0 translate-x-full group-hover:translate-x-[120%]' : 'left-0 -translate-x-full group-hover:-translate-x-[120%]'}`}>
                      <FiArrowRight className={`w-5 h-5 ${qual.position === 'left' ? '' : 'rotate-180'} ${isDark ? 'text-neon-green' : 'text-green-500'}`} 
                        style={{
                          filter: isDark ? 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.8))' : 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))'
                        }}
                      />
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
