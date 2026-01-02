import { useState, useEffect, useRef } from 'react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiMongodb, SiExpress, SiMysql,
  SiAdobephotoshop, SiAdobelightroom, SiCanva, SiAdobepremierepro, SiFigma
} from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Services = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const services = [
    {
      title: 'Front End Development',
      techStack: [
        { Icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
        { Icon: SiCss3, name: 'CSS3', color: '#1572B6' },
        { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
        { Icon: SiReact, name: 'React', color: '#61DAFB' },
        { Icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
        { Icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
      ],
      description: 'Building responsive and modern web applications using latest frontend technologies.',
      features: ['Responsive Design', 'Modern UI/UX', 'Performance Optimized', 'Cross-Browser Compatible'],
      color: isDark ? '#00ff88' : '#10b981',
      borderGlow: isDark ? 'rgba(0, 255, 136, 0.3)' : 'rgba(16, 185, 129, 0.2)',
      number: '01',
    },
    {
      title: 'Mobile Development',
      techStack: [
        { Icon: SiReact, name: 'React Native', color: '#61DAFB' },
        { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
        { Icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
      ],
      description: 'Creating native and cross-platform mobile applications for iOS and Android.',
      features: ['Cross-Platform', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
      color: isDark ? '#39ff14' : '#84cc16',
      borderGlow: isDark ? 'rgba(57, 255, 20, 0.3)' : 'rgba(132, 204, 22, 0.2)',
      number: '02',
    },
    {
      title: 'UI/UX Design',
      techStack: [
        { Icon: SiFigma, name: 'Figma', color: '#F24E1E' },
        { Icon: SiAdobephotoshop, name: 'Photoshop', color: '#31A8FF' },
        { Icon: SiCanva, name: 'Canva', color: '#00C4CC' },
      ],
      description: 'Designing intuitive and beautiful user interfaces with focus on user experience.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: isDark ? '#50C878' : '#22c55e',
      borderGlow: isDark ? 'rgba(80, 200, 120, 0.3)' : 'rgba(34, 197, 94, 0.2)',
      number: '03',
    },
    {
      title: 'Backend Development',
      techStack: [
        { Icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
        { Icon: SiExpress, name: 'Express', color: '#000000' },
        { Icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
        { Icon: SiMysql, name: 'MySQL', color: '#4479A1' },
      ],
      description: 'Developing robust backend systems with RESTful APIs and secure database architecture.',
      features: ['RESTful APIs', 'Database Design', 'Authentication', 'Cloud Integration'],
      color: isDark ? '#00ff88' : '#10b981',
      borderGlow: isDark ? 'rgba(0, 255, 136, 0.3)' : 'rgba(16, 185, 129, 0.2)',
      number: '04',
    },
    {
      title: 'Full Stack Development',
      techStack: [
        { Icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
        { Icon: SiExpress, name: 'Express', color: '#000000' },
        { Icon: SiReact, name: 'React', color: '#61DAFB' },
        { Icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
      ],
      description: 'End-to-end development of complete applications from database to frontend.',
      features: ['Full MERN Stack', 'API Development', 'State Management', 'Deployment'],
      color: isDark ? '#39ff14' : '#84cc16',
      borderGlow: isDark ? 'rgba(57, 255, 20, 0.3)' : 'rgba(132, 204, 22, 0.2)',
      number: '05',
    },
    {
      title: 'Video & Photo Editing',
      techStack: [
        { Icon: SiAdobephotoshop, name: 'Photoshop', color: '#31A8FF' },
        { Icon: SiAdobelightroom, name: 'Lightroom', color: '#31A8FF' },
        { Icon: SiCanva, name: 'Canva', color: '#00C4CC' },
        { Icon: SiAdobepremierepro, name: 'Premiere', color: '#9999FF' },
      ],
      description: 'Professional photo and video editing services for creative content.',
      features: ['Color Grading', 'Photo Retouching', 'Video Editing', 'Motion Graphics'],
      color: isDark ? '#50C878' : '#22c55e',
      borderGlow: isDark ? 'rgba(80, 200, 120, 0.3)' : 'rgba(34, 197, 94, 0.2)',
      number: '06',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #0a0a1a 0%, #0f1419 50%, #0a1a14 100%)' 
          : 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)'
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 px-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 ${
            isDark 
              ? 'bg-gradient-to-r from-neon-green/20 to-emerald-500/20 text-neon-green border border-neon-green/30' 
              : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 border border-green-200'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-neon-green' : 'bg-green-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-neon-green' : 'bg-green-500'}`}></span>
            </span>
            What I Offer
          </span>
          
          <h2 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 px-4 ${isDark ? 'text-white' : 'text-gray-800'}`}
            style={{
              fontFamily: 'Bebas Neue, Rock 3D, sans-serif',
              letterSpacing: '4px',
              lineHeight: '1.1',
              textShadow: isDark 
                ? `0 0 60px rgba(0, 255, 136, 0.15),
                   0 0 100px rgba(0, 255, 136, 0.12),
                   0 0 140px rgba(0, 255, 136, 0.1),
                   0 0 180px rgba(0, 255, 136, 0.08),
                   4px 4px 8px rgba(0, 0, 0, 0.9)`
                : `0 0 50px rgba(34, 197, 94, 0.15),
                   0 0 80px rgba(34, 197, 94, 0.12),
                   0 0 110px rgba(34, 197, 94, 0.1),
                   3px 3px 6px rgba(0, 0, 0, 0.15)`,
              filter: isDark 
                ? 'drop-shadow(0 0 40px rgba(0, 255, 136, 0.12)) drop-shadow(0 0 70px rgba(0, 255, 136, 0.1))' 
                : 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.12))'
            }}
          >
            My Services
          </h2>
          
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              lineHeight: '1.6'
            }}
          >
            Providing comprehensive development solutions tailored to your needs
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent to-white/80' : 'bg-gradient-to-r from-transparent to-gray-400'}`}></div>
            <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-white/80' : 'bg-gray-400'}`}></div>
            <div className={`w-32 h-1 rounded-full ${isDark ? 'bg-white/80' : 'bg-gray-400'}`}></div>
            <div className={`w-4 h-4 rounded-full animate-pulse ${isDark ? 'bg-white/80' : 'bg-gray-400'}`} style={{ animationDelay: '0.5s' }}></div>
            <div className={`w-12 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-white/80 to-transparent' : 'bg-gradient-to-r from-gray-400 to-transparent'}`}></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative h-[420px] transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                perspective: '1500px'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* 3D Flip Container */}
              <div 
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: hoveredIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* FRONT SIDE */}
                <div 
                  className={`absolute inset-0 rounded-3xl p-6 cursor-pointer overflow-hidden border-2 backdrop-blur-xl ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-900/98 via-gray-800/95 to-gray-900/98 border-gray-700/60' 
                      : 'bg-gradient-to-br from-white/98 via-gray-50/95 to-white/98 border-gray-200/70 shadow-2xl'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    boxShadow: isDark 
                      ? '0 15px 40px rgba(0,0,0,0.5)' 
                      : '0 15px 40px rgba(0,0,0,0.12)'
                  }}
                >
                {/* Animated Border Glow */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `conic-gradient(from 0deg at 50% 50%, ${service.color}, transparent, ${service.color}, transparent, ${service.color})`,
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    animation: 'spin 8s linear infinite'
                  }}
                />

                {/* Number Badge */}
                <div className="absolute top-5 right-5 z-0">
                  <div 
                    className="text-8xl font-black transition-all duration-700"
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      color: service.color,
                      opacity: hoveredIndex === index ? '0.2' : '0.08',
                      WebkitTextStroke: `2px ${service.color}60`,
                      textShadow: hoveredIndex === index ? `0 0 50px ${service.borderGlow}, 0 0 100px ${service.borderGlow}` : 'none',
                      transform: hoveredIndex === index ? 'scale(1.15) rotate(-5deg)' : 'scale(1)'
                    }}
                  >
                    {service.number}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Service Title Section */}
                  <div className="mb-5">
                    <div 
                      className="inline-block px-4 py-1.5 rounded-full text-xs font-black mb-4 transition-all duration-500"
                      style={{
                        background: hoveredIndex === index 
                          ? `${service.color}25` 
                          : `${service.color}15`,
                        color: service.color,
                        border: `2px solid ${hoveredIndex === index ? service.color : `${service.color}40`}`,
                        fontFamily: 'Rajdhani, sans-serif',
                        letterSpacing: '2px',
                        boxShadow: hoveredIndex === index ? `0 0 20px ${service.borderGlow}` : 'none'
                      }}
                    >
                      {service.number}
                    </div>

                    <h3 
                      className={`text-3xl lg:text-4xl font-black uppercase leading-tight mb-1 transition-all duration-500`}
                      style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        letterSpacing: '3px',
                        color: hoveredIndex === index ? service.color : (isDark ? '#ffffff' : '#1f2937'),
                        textShadow: hoveredIndex === index
                          ? isDark 
                            ? `0 0 40px ${service.borderGlow}, 0 0 80px ${service.borderGlow}, 4px 4px 8px rgba(0,0,0,0.9)` 
                            : `0 0 30px ${service.borderGlow}, 0 0 60px ${service.borderGlow}40, 3px 3px 6px rgba(0,0,0,0.15)`
                          : isDark 
                            ? '2px 2px 4px rgba(0,0,0,0.8)' 
                            : '1px 1px 2px rgba(0,0,0,0.1)',
                        transform: hoveredIndex === index ? 'translateX(6px) scale(1.02)' : 'translateX(0) scale(1)',
                        WebkitTextStroke: hoveredIndex === index ? `0.5px ${service.color}20` : '0px transparent'
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Animated Decorative Line */}
                    <div 
                      className="h-1.5 rounded-full mt-4 transition-all duration-700"
                      style={{
                        width: hoveredIndex === index ? '100px' : '50px',
                        background: hoveredIndex === index 
                          ? `linear-gradient(90deg, ${service.color}, ${service.color}80, transparent)` 
                          : `linear-gradient(90deg, ${service.color}, transparent)`,
                        boxShadow: hoveredIndex === index ? `0 0 20px ${service.borderGlow}, 0 4px 15px ${service.borderGlow}` : 'none'
                      }}
                    />
                  </div>

                  {/* Technology Stack - Enhanced Icons */}
                  <div className="flex-1 flex items-center justify-center py-5">
                    <div className={`grid gap-4 ${service.techStack.length > 4 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {service.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="group/icon relative flex flex-col items-center justify-center"
                        >
                          {/* Icon Glow Background - Enhanced */}
                          <div 
                            className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover/icon:opacity-80 transition-all duration-500"
                            style={{
                              background: `radial-gradient(circle, ${tech.color}, ${tech.color}60, transparent)`,
                              transform: 'scale(1.8)'
                            }}
                          />
                          
                          {/* Icon Container - Enhanced */}
                          <div 
                            className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/icon:scale-125 group-hover/icon:-translate-y-3 group-hover/icon:rotate-3 ${
                              isDark ? 'bg-gray-800/80' : 'bg-white'
                            }`}
                            style={{
                              border: `2px solid ${hoveredIndex === index ? tech.color : `${tech.color}30`}`,
                              boxShadow: hoveredIndex === index
                                ? isDark 
                                  ? `0 8px 30px rgba(0,0,0,0.5), inset 0 0 25px ${tech.color}20, 0 0 40px ${tech.color}40` 
                                  : `0 8px 30px rgba(0,0,0,0.15), inset 0 0 25px ${tech.color}15, 0 0 30px ${tech.color}30`
                                : isDark 
                                  ? `0 4px 20px rgba(0,0,0,0.4), inset 0 0 15px ${tech.color}10` 
                                  : `0 4px 20px rgba(0,0,0,0.12), inset 0 0 15px ${tech.color}08`,
                              animation: `float 3.5s ease-in-out infinite`,
                              animationDelay: `${idx * 0.25}s`
                            }}
                          >
                            <tech.Icon 
                              className="w-8 h-8 transition-all duration-500 group-hover/icon:scale-115"
                              style={{ 
                                color: tech.color,
                                filter: hoveredIndex === index 
                                  ? `drop-shadow(0 0 15px ${tech.color}) drop-shadow(0 0 25px ${tech.color}80)` 
                                  : `drop-shadow(0 0 8px ${tech.color}80)`
                              }}
                            />

                            {/* Shine Effect */}
                            <div 
                              className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700"
                              style={{
                                transform: 'translateX(-100%)',
                                animation: hoveredIndex === index ? 'shine 2.5s infinite' : 'none'
                              }}
                            />
                          </div>

                          {/* Tech Name Label - Enhanced */}
                          <div 
                            className={`mt-2.5 px-2.5 py-1 rounded-lg text-xs font-bold text-center transition-all duration-500 ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '10px',
                              background: hoveredIndex === index 
                                ? `${tech.color}15` 
                                : isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.8)',
                              border: `1px solid ${hoveredIndex === index ? `${tech.color}40` : 'transparent'}`,
                              color: hoveredIndex === index ? tech.color : undefined
                            }}
                          >
                            {tech.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK SIDE - Details */}
                <div 
                  className={`absolute inset-0 rounded-3xl p-6 cursor-pointer overflow-hidden border-2 backdrop-blur-xl ${
                    isDark 
                      ? 'bg-gradient-to-br from-gray-900/98 via-gray-800/95 to-gray-900/98 border-gray-700/60' 
                      : 'bg-gradient-to-br from-white/98 via-gray-50/95 to-white/98 border-gray-200/70 shadow-2xl'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow: isDark 
                      ? '0 15px 40px rgba(0,0,0,0.5)' 
                      : '0 15px 40px rgba(0,0,0,0.12)'
                  }}
                >
                  {/* Back Side Animated Border */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-100 transition-opacity duration-700"
                    style={{
                      background: `conic-gradient(from 0deg at 50% 50%, ${service.color}, transparent, ${service.color}, transparent, ${service.color})`,
                      padding: '2px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      animation: 'spin 8s linear infinite'
                    }}
                  />

                  {/* Back Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-5">
                      <div 
                        className="inline-block px-4 py-1.5 rounded-full text-xs font-black mb-3"
                        style={{
                          background: `${service.color}25`,
                          color: service.color,
                          border: `2px solid ${service.color}`,
                          fontFamily: 'Rajdhani, sans-serif',
                          letterSpacing: '2px',
                          boxShadow: `0 0 20px ${service.borderGlow}`
                        }}
                      >
                        {service.number}
                      </div>

                      <h3 
                        className="text-3xl font-black uppercase leading-tight mb-3"
                        style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          letterSpacing: '2px',
                          color: service.color,
                          textShadow: isDark
                            ? `0 0 30px ${service.borderGlow}, 3px 3px 6px rgba(0,0,0,0.9)` 
                            : `0 0 20px ${service.borderGlow}, 2px 2px 4px rgba(0,0,0,0.15)`
                        }}
                      >
                        {service.title}
                      </h3>

                      <div 
                        className="h-1.5 w-20 rounded-full"
                        style={{
                          background: service.color,
                          boxShadow: `0 0 15px ${service.borderGlow}`
                        }}
                      />
                    </div>

                    {/* Description */}
                    <div className="flex-1 space-y-4 overflow-y-auto">
                      <p 
                        className={`text-sm leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500'
                        }}
                      >
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div>
                        <h4 
                          className={`text-xs font-bold uppercase mb-3 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            letterSpacing: '2px'
                          }}
                        >
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li 
                              key={idx}
                              className={`flex items-center gap-2 text-sm ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                              }`}
                              style={{
                                fontFamily: 'Inter, sans-serif'
                              }}
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: service.color }}
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 
                          className={`text-xs font-bold uppercase mb-3 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            letterSpacing: '2px'
                          }}
                        >
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.techStack.map((tech, idx) => (
                            <div
                              key={idx}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                isDark ? 'bg-gray-800/80' : 'bg-gray-100'
                              }`}
                              style={{
                                color: tech.color,
                                border: `1.5px solid ${tech.color}40`,
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '10px'
                              }}
                            >
                              {tech.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hover to flip back indicator */}
                    <div className="mt-4 text-center">
                      <div 
                        className={`inline-block px-4 py-2 rounded-lg text-xs font-bold ${
                          isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}
                        style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          letterSpacing: '1px'
                        }}
                      >
                        Hover to flip back
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Glow Shadow */}
              <div 
                className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${service.borderGlow}, transparent 70%)`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
