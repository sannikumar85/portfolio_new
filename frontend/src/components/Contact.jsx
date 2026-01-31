import { useState, useEffect, useRef } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSend, FiArrowUpRight, FiCheckCircle, FiZap, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// API Base URL - change this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const formRef = useRef(null);

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

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format
  const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-+()]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit input length for security
    const maxLengths = { name: 100, email: 100, mobile: 15, message: 1000 };
    const sanitizedValue = value.slice(0, maxLengths[name] || 500);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all inputs
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      alert('Please enter a valid name (at least 2 characters)');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (formData.mobile && !isValidPhone(formData.mobile)) {
      alert('Please enter a valid phone number');
      return;
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      alert('Please enter a message (at least 10 characters)');
      return;
    }
    
    setIsSubmitting(true);
    
    // Sanitize data before submission
    const sanitizedData = {
      name: sanitizeInput(formData.name.trim()),
      email: sanitizeInput(formData.email.trim().toLowerCase()),
      mobile: sanitizeInput(formData.mobile.trim()),
      message: sanitizeInput(formData.message.trim()),
    };
    
    try {
      // Send to backend API
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(sanitizedData)
      });
      
      if (response.ok) {
        setFormData({ name: '', email: '', mobile: '', message: '' });
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Network error. Please try again later.');
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    { 
      icon: FiUser, 
      label: 'Name', 
      value: 'SANNI KUMAR GUPTA', 
      color: '#00ff88',
      gradient: 'from-[#00ff88] to-[#39ff14]'
    },
    { 
      icon: FiPhone, 
      label: 'Phone', 
      value: '+91 8579037260', 
      color: '#39ff14',
      gradient: 'from-[#39ff14] to-[#00ff88]'
    },
    { 
      icon: FiMail, 
      label: 'Email', 
      value: 'sannikumargupta43@gmail.com', 
      color: '#00ff88',
      gradient: 'from-[#00ff88] to-[#39ff14]'
    },
    { 
      icon: FiMapPin, 
      label: 'Location', 
      value: 'Muzaffarpur, Bihar', 
      color: '#39ff14',
      gradient: 'from-[#39ff14] to-[#00ff88]'
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/30'
      }`}
    >
      {/* Animated Matrix-style background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neon grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? '#00ff88' : '#10b981'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? '#00ff88' : '#10b981'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Glowing orbs with 3D effect */}
        <div 
          className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
          style={{ 
            background: isDark 
              ? 'radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, rgba(57, 255, 20, 0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(34, 197, 94, 0.15) 50%, transparent 70%)',
            boxShadow: isDark 
              ? '0 0 100px rgba(0, 255, 136, 0.5), inset 0 0 100px rgba(0, 255, 136, 0.3)'
              : '0 0 100px rgba(16, 185, 129, 0.4), inset 0 0 100px rgba(16, 185, 129, 0.2)',
            animation: 'float 8s ease-in-out infinite, glow-pulse 3s ease-in-out infinite',
            transform: 'translateZ(100px)'
          }}
        />
        <div 
          className={`absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
          style={{ 
            background: isDark 
              ? 'radial-gradient(circle, rgba(57, 255, 20, 0.4) 0%, rgba(0, 255, 136, 0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)',
            boxShadow: isDark 
              ? '0 0 100px rgba(57, 255, 20, 0.5), inset 0 0 100px rgba(57, 255, 20, 0.3)'
              : '0 0 100px rgba(34, 197, 94, 0.4), inset 0 0 100px rgba(34, 197, 94, 0.2)',
            animation: 'float 10s ease-in-out infinite, glow-pulse 3s ease-in-out infinite',
            animationDelay: '1s, 0.5s',
            transform: 'translateZ(50px)'
          }}
        />
        
        {/* Floating particles - simplified */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-[#00ff88]' : 'bg-emerald-500'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.2 + Math.random() * 0.3
            }}
          />
        ))}

      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with 3D text */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold mb-8 border-2 relative overflow-hidden group transition-colors duration-300 ${
            isDark 
              ? 'bg-black border-[#00ff88] text-[#00ff88]'
              : 'bg-white border-emerald-500 text-emerald-600'
          }`}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-[#00ff88]/20 to-[#39ff14]/20'
                : 'bg-gradient-to-r from-emerald-500/20 to-green-500/20'
            }`} />
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDark ? 'bg-[#00ff88]' : 'bg-emerald-500'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isDark ? 'bg-[#00ff88]' : 'bg-emerald-500'
              }`}></span>
            </span>
            <FiZap className="w-4 h-4" />
            <span className="relative">AVAILABLE FOR PROJECTS</span>
          </span>
          
          <h2 
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              textShadow: isDark 
                ? `
                  0 0 20px rgba(0, 255, 136, 1),
                  0 0 40px rgba(0, 255, 136, 0.8),
                  0 0 60px rgba(0, 255, 136, 0.6),
                  4px 4px 8px rgba(0, 0, 0, 0.9),
                  8px 8px 0px rgba(0, 255, 136, 0.4),
                  12px 12px 0px rgba(0, 255, 136, 0.2),
                  16px 16px 0px rgba(0, 255, 136, 0.1)
                `
                : `
                  0 0 15px rgba(16, 185, 129, 0.8),
                  0 0 30px rgba(16, 185, 129, 0.6),
                  0 0 45px rgba(16, 185, 129, 0.4),
                  2px 2px 4px rgba(0, 0, 0, 0.3),
                  4px 4px 0px rgba(16, 185, 129, 0.3),
                  6px 6px 0px rgba(16, 185, 129, 0.15),
                  8px 8px 0px rgba(16, 185, 129, 0.08)
                `,
              transform: 'translateZ(50px)',
              letterSpacing: '0.05em'
            }}
          >
            <span className={isDark ? 'text-white' : 'text-gray-900'}>LET'S </span>
            <span className={`animate-text3dFloat inline-block ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-600'
            }`}>CONNECT</span>
          </h2>
          
          <p className={`max-w-2xl mx-auto text-lg font-medium transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Ready to work together? Send me a message and let's discuss your project.
          </p>
          
          {/* Decorative 3D divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className={`w-32 h-1 rounded-full ${
              isDark 
                ? 'bg-gradient-to-r from-[#00ff88] to-[#39ff14]'
                : 'bg-gradient-to-r from-emerald-500 to-green-500'
            }`} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Form - 3D Card */}
          <div 
            ref={formRef}
            className={`lg:col-span-7 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
              transform: isVisible 
                ? `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg) translateZ(20px)`
                : 'none',
              transition: 'transform 0.1s ease-out, opacity 0.7s, translate 0.7s'
            }}
          >
            <div 
              className={`relative rounded-2xl p-8 md:p-10 overflow-hidden border-2 backdrop-blur-xl group hover:border-[#00ff88] transition-all duration-500 ${
                isDark 
                  ? 'bg-black/95 border-[#00ff88]/30'
                  : 'bg-gradient-to-br from-white via-emerald-50/20 to-white border-emerald-500/30 hover:border-emerald-500'
              }`}
              style={{
                boxShadow: isDark 
                  ? `
                    0 0 30px rgba(0, 255, 136, 0.3),
                    0 0 60px rgba(0, 255, 136, 0.1),
                    inset 0 0 30px rgba(0, 255, 136, 0.05)
                  `
                  : `
                    0 8px 32px rgba(0, 0, 0, 0.08),
                    0 4px 16px rgba(0, 0, 0, 0.04),
                    inset 0 0 0 1px rgba(255, 255, 255, 0.8)
                  `,
              }}
            >
              {/* 3D corner accents */}
              <div className={`absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 rounded-tl-2xl ${
                isDark ? 'border-[#00ff88]' : 'border-emerald-500'
              }`}
                style={{ 
                  boxShadow: isDark 
                    ? '-5px -5px 15px rgba(0, 255, 136, 0.5)' 
                    : '-5px -5px 15px rgba(16, 185, 129, 0.4)'
                }} />
              <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 rounded-br-2xl ${
                isDark ? 'border-[#39ff14]' : 'border-green-500'
              }`}
                style={{ 
                  boxShadow: isDark 
                    ? '5px 5px 15px rgba(57, 255, 20, 0.5)' 
                    : '5px 5px 15px rgba(34, 197, 94, 0.4)'
                }} />

              {/* Success Message - 3D */}
              {isSubmitted && (
                <div className={`absolute inset-0 flex items-center justify-center z-20 rounded-2xl backdrop-blur-sm ${
                  isDark ? 'bg-black/95' : 'bg-white/95'
                }`}>
                  <div className="text-center" style={{ animation: 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                      style={{
                        background: isDark 
                          ? 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                        boxShadow: isDark 
                          ? '0 0 40px rgba(0, 255, 136, 0.6), inset 0 0 40px rgba(0, 255, 136, 0.2)'
                          : '0 0 40px rgba(16, 185, 129, 0.5), inset 0 0 40px rgba(16, 185, 129, 0.15)'
                      }}>
                      <FiCheckCircle className={`w-12 h-12 ${
                        isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                      }`} 
                        style={{ 
                          filter: isDark 
                            ? 'drop-shadow(0 0 10px #00ff88)' 
                            : 'drop-shadow(0 0 10px #10b981)',
                          animation: 'float 2s ease-in-out infinite'
                        }} />
                    </div>
                    <h3 
                      className={`text-3xl font-black mb-3 ${
                        isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                      }`}
                      style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        textShadow: isDark 
                          ? '0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4)'
                          : '0 0 15px rgba(16, 185, 129, 0.6), 0 0 30px rgba(16, 185, 129, 0.3)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      MESSAGE SENT!
                    </h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>I'll get back to you ASAP!</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input - 3D Style */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-bold mb-3 uppercase tracking-wider transition-colors ${
                      focusedField === 'name' 
                        ? (isDark ? 'text-[#00ff88]' : 'text-emerald-600') 
                        : (isDark ? 'text-gray-500' : 'text-gray-600')
                    }`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      <FiUser className="w-4 h-4" />
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        placeholder="John Doe"
                        className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
                          isDark
                            ? `bg-black/90 border-gray-700 text-white placeholder-gray-500 focus:border-[#00ff88] focus:bg-gray-900/70`
                            : `bg-gray-50/80 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white hover:bg-white`
                        }`}
                        style={{
                          boxShadow: focusedField === 'name' 
                            ? (isDark 
                                ? '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)' 
                                : '0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.08)')
                            : (isDark 
                                ? 'inset 0 2px 4px rgba(0, 0, 0, 0.5)' 
                                : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)')
                        }}
                      />
                      <div className={`absolute -bottom-1 left-0 h-1 rounded-full transition-all duration-300 ${
                        focusedField === 'name' ? 'w-full' : 'w-0'
                      } ${
                        isDark 
                          ? 'bg-gradient-to-r from-[#00ff88] to-[#39ff14]' 
                          : 'bg-gradient-to-r from-emerald-500 to-green-500'
                      }`}
                        style={{ 
                          boxShadow: isDark ? '0 0 10px #00ff88' : '0 0 10px #10b981' 
                        }} />
                    </div>
                  </div>

                  {/* Email Input - 3D Style */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-bold mb-3 uppercase tracking-wider transition-colors ${
                      focusedField === 'email' 
                        ? (isDark ? 'text-[#00ff88]' : 'text-emerald-600') 
                        : (isDark ? 'text-gray-500' : 'text-gray-600')
                    }`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      <FiMail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        maxLength={100}
                        autoComplete="email"
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        placeholder="john@example.com"
                        className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
                          isDark
                            ? `bg-black/90 border-gray-700 text-white placeholder-gray-500 focus:border-[#00ff88] focus:bg-gray-900/70`
                            : `bg-gray-50/80 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white hover:bg-white`
                        }`}
                        style={{
                          boxShadow: focusedField === 'email' 
                            ? (isDark 
                                ? '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)' 
                                : '0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.08)')
                            : (isDark 
                                ? 'inset 0 2px 4px rgba(0, 0, 0, 0.5)' 
                                : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)')
                        }}
                      />
                      <div className={`absolute -bottom-1 left-0 h-1 rounded-full transition-all duration-300 ${
                        focusedField === 'email' ? 'w-full' : 'w-0'
                      } ${
                        isDark 
                          ? 'bg-gradient-to-r from-[#00ff88] to-[#39ff14]' 
                          : 'bg-gradient-to-r from-emerald-500 to-green-500'
                      }`}
                        style={{ 
                          boxShadow: isDark ? '0 0 10px #00ff88' : '0 0 10px #10b981' 
                        }} />
                    </div>
                  </div>
                </div>

                {/* Phone Input - 3D Style */}
                <div className="group">
                  <label className={`flex items-center gap-2 text-sm font-bold mb-3 uppercase tracking-wider transition-colors ${
                    focusedField === 'mobile' 
                      ? (isDark ? 'text-[#00ff88]' : 'text-emerald-600') 
                      : (isDark ? 'text-gray-500' : 'text-gray-600')
                  }`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <FiPhone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('mobile')}
                      onBlur={() => setFocusedField(null)}
                      maxLength={15}
                      autoComplete="tel"
                      pattern="[\d\s\-+()]{10,15}"
                      placeholder="+91 9876543210"
                      className={`w-full px-5 py-4 rounded-xl border-2 outline-none transition-all duration-300 font-medium ${
                        isDark
                          ? `bg-black/90 border-gray-700 text-white placeholder-gray-500 focus:border-[#00ff88] focus:bg-gray-900/70`
                          : `bg-gray-50/80 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white hover:bg-white`
                      }`}
                      style={{
                        boxShadow: focusedField === 'mobile' 
                          ? (isDark 
                              ? '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)' 
                              : '0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.08)')
                          : (isDark 
                              ? 'inset 0 2px 4px rgba(0, 0, 0, 0.5)' 
                              : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)')
                      }}
                    />
                    <div className={`absolute -bottom-1 left-0 h-1 rounded-full transition-all duration-300 ${
                      focusedField === 'mobile' ? 'w-full' : 'w-0'
                    } ${
                      isDark 
                        ? 'bg-gradient-to-r from-[#00ff88] to-[#39ff14]' 
                        : 'bg-gradient-to-r from-emerald-500 to-green-500'
                    }`}
                      style={{ 
                        boxShadow: isDark ? '0 0 10px #00ff88' : '0 0 10px #10b981' 
                      }} />
                  </div>
                </div>

                {/* Message Textarea - 3D Style */}
                <div className="group">
                  <label className={`flex items-center gap-2 text-sm font-bold mb-3 uppercase tracking-wider transition-colors ${
                    focusedField === 'message' 
                      ? (isDark ? 'text-[#00ff88]' : 'text-emerald-600') 
                      : (isDark ? 'text-gray-500' : 'text-gray-600')
                  }`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    <FiSend className="w-4 h-4" />
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      minLength={10}
                      maxLength={1000}
                      rows="5"
                      placeholder="Tell me about your project..."
                      className={`w-full px-5 py-4 rounded-xl border-2 outline-none resize-none transition-all duration-300 font-medium ${
                        isDark
                          ? `bg-black/90 border-gray-700 text-white placeholder-gray-500 focus:border-[#00ff88] focus:bg-gray-900/70`
                          : `bg-gray-50/80 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:bg-white hover:bg-white`
                      }`}
                      style={{
                        boxShadow: focusedField === 'message' 
                          ? (isDark 
                              ? '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.1)' 
                              : '0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.08)')
                          : (isDark 
                              ? 'inset 0 2px 4px rgba(0, 0, 0, 0.5)' 
                              : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)')
                      }}
                    ></textarea>
                    <div className={`absolute -bottom-1 left-0 h-1 rounded-full transition-all duration-300 ${
                      focusedField === 'message' ? 'w-full' : 'w-0'
                    } ${
                      isDark 
                        ? 'bg-gradient-to-r from-[#00ff88] to-[#39ff14]' 
                        : 'bg-gradient-to-r from-emerald-500 to-green-500'
                    }`}
                      style={{ 
                        boxShadow: isDark ? '0 0 10px #00ff88' : '0 0 10px #10b981' 
                      }} />
                  </div>
                </div>

                {/* Submit Button - 3D Neon Style */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full py-5 px-8 rounded-xl font-black text-lg overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDark ? 'text-black' : 'text-white'
                  }`}
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    letterSpacing: '0.1em',
                    background: isDark 
                      ? 'linear-gradient(135deg, #00ff88 0%, #39ff14 100%)'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: isDark 
                      ? `
                        0 0 30px rgba(0, 255, 136, 0.6),
                        0 0 60px rgba(0, 255, 136, 0.3),
                        inset 0 0 20px rgba(255, 255, 255, 0.3),
                        0 10px 30px rgba(0, 0, 0, 0.5)
                      `
                      : `
                        0 0 25px rgba(16, 185, 129, 0.4),
                        0 0 50px rgba(16, 185, 129, 0.2),
                        inset 0 0 15px rgba(255, 255, 255, 0.4),
                        0 8px 25px rgba(0, 0, 0, 0.15)
                      `,
                    transform: 'translateZ(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = isDark 
                      ? `
                        0 0 50px rgba(0, 255, 136, 0.8),
                        0 0 100px rgba(0, 255, 136, 0.4),
                        inset 0 0 30px rgba(255, 255, 255, 0.4),
                        0 15px 40px rgba(0, 0, 0, 0.6)
                      `
                      : `
                        0 0 35px rgba(16, 185, 129, 0.6),
                        0 0 70px rgba(16, 185, 129, 0.3),
                        inset 0 0 25px rgba(255, 255, 255, 0.5),
                        0 12px 35px rgba(0, 0, 0, 0.2)
                      `;
                    e.currentTarget.style.transform = 'translateZ(20px) translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = isDark 
                      ? `
                        0 0 30px rgba(0, 255, 136, 0.6),
                        0 0 60px rgba(0, 255, 136, 0.3),
                        inset 0 0 20px rgba(255, 255, 255, 0.3),
                        0 10px 30px rgba(0, 0, 0, 0.5)
                      `
                      : `
                        0 0 25px rgba(16, 185, 129, 0.4),
                        0 0 50px rgba(16, 185, 129, 0.2),
                        inset 0 0 15px rgba(255, 255, 255, 0.4),
                        0 8px 25px rgba(0, 0, 0, 0.15)
                      `;
                    e.currentTarget.style.transform = 'translateZ(10px)';
                  }}
                >
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <FiZap className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                        <FiSend className="w-5 h-5 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Cards - 3D Floating */}
          <div 
            className={`lg:col-span-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="space-y-5">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="group relative p-6 rounded-xl transition-all duration-500 cursor-pointer overflow-hidden bg-black border-2 border-gray-800 hover:border-[#00ff88]"
                    style={{
                      transitionDelay: `${index * 75}ms`,
                      boxShadow: '0 0 20px rgba(0, 255, 136, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.03)',
                      transform: 'translateZ(0)',
                      animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateZ(30px) translateY(-5px)';
                      e.currentTarget.style.boxShadow = `
                        0 0 40px rgba(0, 255, 136, 0.4),
                        0 0 80px rgba(0, 255, 136, 0.2),
                        inset 0 0 30px rgba(0, 255, 136, 0.1)
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateZ(0)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.03)';
                    }}
                  >
                    {/* Animated scan line */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-horizontal" />

                    <div className="relative flex items-center gap-4">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border-2"
                        style={{
                          background: `linear-gradient(135deg, ${info.color}20 0%, ${info.color}10 100%)`,
                          borderColor: info.color,
                          boxShadow: `0 0 20px ${info.color}40, inset 0 0 20px ${info.color}20`,
                          transform: 'translateZ(20px)'
                        }}
                      >
                        <IconComponent 
                          className="w-7 h-7 transition-transform group-hover:scale-110" 
                          style={{ 
                            color: info.color,
                            filter: `drop-shadow(0 0 8px ${info.color})`
                          }} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1.5 text-gray-500"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {info.label}
                        </p>
                        <p className="font-bold text-white group-hover:text-[#00ff88] transition-colors duration-300 truncate"
                          style={{ 
                            fontFamily: 'Space Grotesk, sans-serif',
                            textShadow: '0 0 10px rgba(0, 255, 136, 0.3)'
                          }}>
                          {info.value}
                        </p>
                      </div>
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0 border-2"
                        style={{ 
                          background: `${info.color}15`,
                          borderColor: info.color,
                          boxShadow: `0 0 15px ${info.color}30`
                        }}
                      >
                        <FiArrowUpRight 
                          className="w-6 h-6 transition-transform group-hover:rotate-45" 
                          style={{ color: info.color }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Media Links */}
            <div className="mt-6 flex items-center justify-center gap-4">
              {[
                { 
                  icon: FiGithub, 
                  link: 'https://github.com/yourusername',
                },
                { 
                  icon: FiLinkedin, 
                  link: 'https://linkedin.com/in/yourusername',
                },
                { 
                  icon: FiMail, 
                  link: 'mailto:sannikumargupta43@gmail.com',
                },
                { 
                  icon: FiTwitter, 
                  link: 'https://twitter.com/yourusername',
                }
              ].map((social, idx) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 flex items-center justify-center transition-all duration-300"
                    style={{
                      animation: `float ${3 + idx * 0.3}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.15}s`
                    }}
                  >
                    <SocialIcon 
                      className="w-6 h-6 text-gray-400 group-hover:text-[#00ff88] transition-all duration-300 group-hover:scale-125" 
                      style={{ 
                        filter: 'drop-shadow(0 0 5px rgba(0, 255, 136, 0.3))'
                      }} 
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
