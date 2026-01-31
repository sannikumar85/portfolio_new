import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiUser } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Floating particles effect
    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 26, 0.98) 50%, rgba(0, 0, 0, 0.95) 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
      }}
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isDark ? 0.4 : 0.2 }}
      />

      {/* Glow effects */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-purple-600/20' : 'bg-orange-300/30'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-blue-600/10' : 'bg-yellow-300/30'}`}></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left space-y-8 animate-fade-in">
            <div className="space-y-4">
              {/* Animated greeting with 3D effect */}
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}>
                I'm <span className="font-bold relative inline-block">
                  <span className={isDark ? 'text-white' : 'text-gray-900'} 
                    style={{ 
                      textShadow: isDark 
                        ? '2px 2px 4px rgba(0, 255, 136, 0.3), -2px -2px 4px rgba(0, 255, 136, 0.1)' 
                        : '2px 2px 4px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'Rajdhani, sans-serif',
                      letterSpacing: '2px'
                    }}>
                    SANNI
                  </span>
                </span>
              </h2>

              {/* Main heading with glowing text only */}
              <h1 className="relative inline-block text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tight"
                style={{ 
                  fontFamily: 'Bebas Neue, sans-serif',
                  letterSpacing: '6px',
                  color: isDark ? '#00ff88' : '#fb923c',
                  textShadow: isDark 
                    ? '0 0 20px rgba(110, 176, 145, 0.2), 0 0 40px rgba(0, 255, 136, 0.2), 0 0 60px rgba(0, 255, 136, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.3)' 
                    : '0 0 20px rgba(251, 146, 60, 0.2), 0 0 40px rgba(251, 146, 60, 0.2), 0 0 60px rgba(251, 146, 60, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.2)',
                  filter: isDark 
                    ? 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.7))' 
                    : 'drop-shadow(0 0 25px rgba(251, 146, 60, 0.6))'
                }}>
                GUPTA
              </h1>

              {/* Description */}
              <p className={`text-base md:text-lg max-w-xl leading-relaxed pt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}>
                Welcome to my portfolio. I'm a developer passionate about creating modern web applications.
              </p>
            </div>

            {/* CTA Buttons with enhanced 3D effects */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/about"
                className={`group relative px-8 py-3.5 rounded-lg font-bold transition-all duration-300 overflow-hidden transform hover:scale-105 ${
                  isDark 
                    ? 'border-2 border-orange-500 text-orange-500' 
                    : 'border-2 border-orange-600 text-orange-600'
                }`}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '1px'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiUser className="w-5 h-5" />
                  <span>ABOUT ME</span>
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 179, 8, 0.2))',
                    filter: 'blur(20px)',
                    transform: 'scale(1.5)'
                  }}></div>
              </Link>

              <a
                href="https://drive.google.com/file/d/1BNUN_n9FihhIrD1ArWunY9u2_jPnzY_p/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-3.5 rounded-lg font-bold text-black transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '1px',
                  background: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)',
                  boxShadow: '0 8px 25px rgba(251, 146, 60, 0.4), 0 0 40px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiDownload className="w-5 h-5" />
                  <span>DOWNLOAD CV</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Right side - Clean Professional Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-delay">
            <div className="relative group">
              {/* Simple image container - no extra design elements */}
              <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] lg:w-[400px] lg:h-[500px] transition-all duration-500 group-hover:scale-[1.02]">
                <img
                  src="https://i.ibb.co/YdQk2Vn/sticker.png"
                  alt="Sanni Kumar Gupta - Full Stack Developer"
                  className="w-full h-full object-contain object-center transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02) saturate(1.05)'
                  }}
                  onError={(e) => {
                    e.target.src = '/images/sticker.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-7 h-11 border-2 rounded-full flex items-start justify-center p-2 ${
          isDark ? 'border-cyan-400/60' : 'border-blue-500/50'
        }`}
          style={{
            boxShadow: isDark 
              ? '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 15px rgba(34, 211, 238, 0.15)' 
              : '0 0 15px rgba(59, 130, 246, 0.3), inset 0 0 12px rgba(59, 130, 246, 0.1)'
          }}>
          <div className={`w-1.5 h-3 rounded-full animate-scroll ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`}
            style={{
              boxShadow: isDark ? '0 0 12px rgba(34, 211, 238, 0.9)' : '0 0 10px rgba(59, 130, 246, 0.7)'
            }}></div>
        </div>
      </div>
    </section>

    {/* Working Experience Section - Separate Section */}
    <section className={`min-h-screen py-20 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Background Canvas for Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-30"
        style={{ background: 'transparent' }}
      />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? 'bg-cyan-500' : 'bg-emerald-500'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse ${
          isDark ? 'bg-purple-500' : 'bg-blue-500'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? '' : 'text-gray-800'
          }`}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '3px',
              ...(isDark ? {
                background: 'linear-gradient(135deg, #00ff88 0%, #00ccff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.5))'
              } : {
                color: '#1f2937',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                filter: 'drop-shadow(0 0 10px rgba(31, 41, 55, 0.3))'
              })
            }}
          >
            💼 PROFESSIONAL EXPERIENCE
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className={`w-16 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-transparent to-cyan-400/80' : 'bg-gradient-to-r from-transparent to-teal-600/90'}`}></div>
            <div className={`w-6 h-6 rounded-full animate-pulse ${isDark ? 'bg-cyan-400' : 'bg-teal-600'}`}
              style={{
                boxShadow: isDark ? '0 0 20px rgba(34, 211, 238, 0.6)' : '0 0 20px rgba(13, 148, 136, 0.7)'
              }}
            ></div>
            <div className={`w-40 h-1 rounded-full ${isDark ? 'bg-cyan-400/80' : 'bg-teal-600/80'}`}></div>
            <div className={`w-6 h-6 rounded-full animate-pulse ${isDark ? 'bg-cyan-400' : 'bg-teal-600'}`} 
              style={{ 
                animationDelay: '0.5s',
                boxShadow: isDark ? '0 0 20px rgba(34, 211, 238, 0.6)' : '0 0 20px rgba(13, 148, 136, 0.7)'
              }}
            ></div>
            <div className={`w-16 h-1 rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-400/80 to-transparent' : 'bg-gradient-to-r from-teal-600/90 to-transparent'}`}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience 1 - Current */}
          <div className={`group relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 border-2 border-cyan-500/40 hover:border-cyan-400/70' 
              : 'bg-gradient-to-br from-white/90 via-emerald-50/90 to-white/90 border-2 border-emerald-300/50 hover:border-emerald-500/70 shadow-2xl hover:shadow-3xl'
          }`}
            style={{
              boxShadow: isDark 
                ? '0 20px 60px rgba(34, 211, 238, 0.15), 0 0 40px rgba(34, 211, 238, 0.1)' 
                : '0 20px 60px rgba(5, 150, 105, 0.15), 0 0 40px rgba(5, 150, 105, 0.1)'
            }}
          >
            {/* Current Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className={`px-4 py-2 rounded-full text-sm font-bold animate-pulse ${
                isDark ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50' : 'bg-emerald-500/30 text-emerald-700 border border-emerald-400/50'
              }`}
                style={{
                  boxShadow: isDark ? '0 0 20px rgba(34, 211, 238, 0.4)' : '0 0 20px rgba(5, 150, 105, 0.3)'
                }}
              >
                ⚡ CURRENT
              </span>
            </div>
            
            <div className="mt-4 mb-6">
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}>
                Full Stack Developer Intern
              </h3>
              <p className={`text-xl font-semibold mb-2 ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Easy Property Solution
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                📅 June 2024 – Present
              </p>
            </div>
            
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Architected a full-stack real estate platform with 50+ active property listings, supporting 200+ users, 
              implementing secure authentication, property verification workflows, and a Flutter-based mobile application 
              enabling real-time booking and advanced search.
            </p>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl ${
              isDark ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-br from-emerald-300/30 to-teal-300/30'
            }`}></div>
          </div>

          {/* Experience 2 */}
          <div className={`group relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 border-2 border-purple-500/40 hover:border-purple-400/70' 
              : 'bg-gradient-to-br from-white/90 via-purple-50/90 to-white/90 border-2 border-purple-300/50 hover:border-purple-500/70 shadow-2xl hover:shadow-3xl'
          }`}
            style={{
              boxShadow: isDark 
                ? '0 20px 60px rgba(147, 51, 234, 0.15), 0 0 40px rgba(147, 51, 234, 0.1)' 
                : '0 20px 60px rgba(147, 51, 234, 0.15), 0 0 40px rgba(147, 51, 234, 0.1)'
            }}
          >
            <div className="mb-6">
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}>
                Software Development Intern
              </h3>
              <p className={`text-xl font-semibold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Cognifyz Technologies
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                📅 April 2025 – June 2025
              </p>
            </div>
            
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Delivered 5+ MERN-based client projects, building React.js frontends and Node.js backend services, 
              improving performance, scalability, and maintainability while following industry best practices.
            </p>
            
            <a href="#" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isDark ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100/50'
            }`}>
              📜 View Certificate →
            </a>
            
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl ${
              isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-300/30 to-pink-300/30'
            }`}></div>
          </div>

          {/* Experience 3 */}
          <div className={`group relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 border-2 border-orange-500/40 hover:border-orange-400/70' 
              : 'bg-gradient-to-br from-white/90 via-orange-50/90 to-white/90 border-2 border-orange-300/50 hover:border-orange-500/70 shadow-2xl hover:shadow-3xl'
          }`}
            style={{
              boxShadow: isDark 
                ? '0 20px 60px rgba(249, 115, 22, 0.15), 0 0 40px rgba(249, 115, 22, 0.1)' 
                : '0 20px 60px rgba(249, 115, 22, 0.15), 0 0 40px rgba(249, 115, 22, 0.1)'
            }}
          >
            <div className="mb-6">
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}>
                Web Development Intern
              </h3>
              <p className={`text-xl font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}>
                Future Interns
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                📅 August 2025 – October 2025
              </p>
            </div>
            
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Contributed to 3+ real-world web projects, collaborating in agile teams to build responsive UIs, 
              reusable components, and production-ready features.
            </p>
            
            <a href="#" className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isDark ? 'text-orange-400 hover:text-orange-300 hover:bg-orange-500/10' : 'text-orange-600 hover:text-orange-700 hover:bg-orange-100/50'
            }`}>
              📜 View Certificate →
            </a>
            
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-2xl ${
              isDark ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20' : 'bg-gradient-to-br from-orange-300/30 to-yellow-300/30'
            }`}></div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
