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
                This is my official portfolio website to showcase my work and experience in web development.
              </p>
            </div>

            {/* CTA Buttons with enhanced 3D effects */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/about"
                className={`group relative px-8 py-3.5 rounded-lg font-bold transition-all duration-300 overflow-hidden transform hover:scale-105 hover:-translate-y-1 ${
                  isDark 
                    ? 'border-2 border-orange-500 text-orange-500' 
                    : 'border-2 border-orange-600 text-orange-600'
                }`}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '1px',
                  boxShadow: isDark 
                    ? '0 4px 15px rgba(251, 146, 60, 0.2), inset 0 0 0 rgba(251, 146, 60, 0.1)' 
                    : '0 4px 15px rgba(251, 146, 60, 0.15)'
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
                href="https://drive.google.com/file/d/1JJhZf4gy3hqgKWs_6X5lmLZsh3AN-VvW/view?usp=sharing"
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
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.6), transparent)',
                    filter: 'blur(30px)',
                    transform: 'scale(1.5)'
                  }}></div>
              </a>
            </div>
          </div>

          {/* Right side - Enhanced 3D Oval Profile image with Blue/Green Glow */}
          <div className="flex justify-center lg:justify-end animate-fade-in-delay">
            <div className="relative group">
              {/* Multiple layered rotating glow effects - hidden on very small screens for performance */}
              <div className="absolute -inset-6 sm:-inset-8 md:-inset-10 lg:-inset-12 opacity-50 group-hover:opacity-80 transition-opacity duration-700 blur-2xl sm:blur-3xl"
                style={{
                  background: isDark 
                    ? 'radial-gradient(ellipse, rgba(0, 255, 136, 0.7) 0%, rgba(34, 211, 238, 0.5) 30%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)' 
                    : 'radial-gradient(ellipse, rgba(59, 130, 246, 0.5) 0%, rgba(34, 211, 238, 0.4) 30%, rgba(0, 255, 136, 0.3) 50%, transparent 70%)',
                  animation: 'rotate-glow 10s linear infinite',
                  borderRadius: '50%'
                }}></div>

              <div className="absolute -inset-5 sm:-inset-6 md:-inset-8 lg:-inset-10 opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-xl sm:blur-2xl"
                style={{
                  background: isDark 
                    ? 'conic-gradient(from 0deg, rgba(0, 255, 136, 0.8), rgba(34, 211, 238, 0.6), rgba(59, 130, 246, 0.5), rgba(0, 255, 136, 0.8))' 
                    : 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.6), rgba(34, 211, 238, 0.5), rgba(0, 255, 136, 0.4), rgba(59, 130, 246, 0.6))',
                  animation: 'rotate-glow 8s linear infinite reverse',
                  borderRadius: '50%'
                }}></div>

              <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 opacity-60 group-hover:opacity-90 transition-opacity duration-700 blur-lg sm:blur-xl"
                style={{
                  background: isDark 
                    ? 'radial-gradient(ellipse, rgba(34, 211, 238, 0.6), rgba(59, 130, 246, 0.4), transparent)' 
                    : 'radial-gradient(ellipse, rgba(34, 211, 238, 0.5), rgba(59, 130, 246, 0.3), transparent)',
                  animation: 'pulse-glow 4s ease-in-out infinite',
                  borderRadius: '50%'
                }}></div>
              
              {/* Main oval image container with 3D transform and blue glow border */}
              <div className="relative overflow-hidden transform-gpu transition-all duration-700 group-hover:scale-105 w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[350px] md:h-[440px] lg:w-[380px] lg:h-[480px]"
                style={{
                  borderRadius: '50%',
                  boxShadow: isDark 
                    ? '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 100px rgba(34, 211, 238, 0.6), 0 0 150px rgba(59, 130, 246, 0.4), inset 0 0 60px rgba(34, 211, 238, 0.2)' 
                    : '0 30px 70px rgba(0, 0, 0, 0.4), 0 0 80px rgba(34, 211, 238, 0.5), 0 0 120px rgba(59, 130, 246, 0.3), inset 0 0 50px rgba(34, 211, 238, 0.15)',
                  border: isDark 
                    ? '5px solid rgba(34, 211, 238, 0.5)' 
                    : '5px solid rgba(34, 211, 238, 0.4)',
                  transform: 'rotateX(5deg) rotateY(-5deg)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isDark 
                    ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(34, 211, 238, 0.1))' 
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(34, 211, 238, 0.08))'
                }}>
                <img
                  src="/images/sanni3.jpg"
                  alt="Sanni Kumar Gupta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    filter: isDark 
                      ? 'brightness(1.1) contrast(1.1) saturate(1.2)' 
                      : 'brightness(1.05) contrast(1.05)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://sanniportfolio8579.netlify.app/assets/sanni3-mWkZ6tBl.jpg';
                  }}
                />
                {/* Blue/Cyan gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: isDark 
                      ? 'radial-gradient(ellipse at 35% 35%, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.1), transparent 65%)' 
                      : 'radial-gradient(ellipse at 35% 35%, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.08), transparent 65%)'
                  }}></div>
              </div>

              {/* Animated glowing orbs with blue/green colors - responsive sizing */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full blur-sm opacity-90"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(0, 255, 136, 1), rgba(34, 211, 238, 0.8))' 
                    : 'radial-gradient(circle, rgba(34, 211, 238, 0.9), rgba(59, 130, 246, 0.7))',
                  boxShadow: isDark 
                    ? '0 0 40px rgba(0, 255, 136, 0.9), 0 0 80px rgba(34, 211, 238, 0.6)' 
                    : '0 0 35px rgba(34, 211, 238, 0.8), 0 0 70px rgba(59, 130, 246, 0.5)',
                  animation: 'float-orb-1 5s ease-in-out infinite'
                }}></div>
              
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-bottom-10 md:-right-10 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full blur-sm opacity-85"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(34, 211, 238, 1), rgba(59, 130, 246, 0.8))' 
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.9), rgba(34, 211, 238, 0.7))',
                  boxShadow: isDark 
                    ? '0 0 35px rgba(34, 211, 238, 0.9), 0 0 70px rgba(59, 130, 246, 0.6)' 
                    : '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(34, 211, 238, 0.5)',
                  animation: 'float-orb-2 6s ease-in-out infinite'
                }}></div>
              
              <div className="absolute top-1/4 -right-6 sm:-right-8 md:-right-10 lg:-right-12 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full blur-sm opacity-80"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(59, 130, 246, 1), rgba(0, 255, 136, 0.7))' 
                    : 'radial-gradient(circle, rgba(34, 211, 238, 0.9), rgba(0, 255, 136, 0.6))',
                  boxShadow: isDark 
                    ? '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(0, 255, 136, 0.5)' 
                    : '0 0 28px rgba(34, 211, 238, 0.7), 0 0 55px rgba(0, 255, 136, 0.4)',
                  animation: 'float-orb-3 7s ease-in-out infinite'
                }}></div>

              <div className="absolute bottom-1/3 -left-6 sm:-left-8 md:-left-10 lg:-left-12 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full blur-sm opacity-75"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(0, 255, 136, 1), rgba(59, 130, 246, 0.7))' 
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(34, 211, 238, 0.6))',
                  boxShadow: isDark 
                    ? '0 0 28px rgba(0, 255, 136, 0.8), 0 0 55px rgba(59, 130, 246, 0.5)' 
                    : '0 0 25px rgba(59, 130, 246, 0.7), 0 0 50px rgba(34, 211, 238, 0.4)',
                  animation: 'float-orb-4 6.5s ease-in-out infinite'
                }}></div>

              <div className="absolute top-1/2 -left-4 sm:-left-6 md:-left-8 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full blur-sm opacity-70"
                style={{
                  background: isDark 
                    ? 'radial-gradient(circle, rgba(34, 211, 238, 1), rgba(0, 255, 136, 0.6))' 
                    : 'radial-gradient(circle, rgba(0, 255, 136, 0.8), rgba(59, 130, 246, 0.5))',
                  boxShadow: isDark 
                    ? '0 0 25px rgba(34, 211, 238, 0.7), 0 0 50px rgba(0, 255, 136, 0.4)' 
                    : '0 0 22px rgba(0, 255, 136, 0.6), 0 0 45px rgba(59, 130, 246, 0.3)',
                  animation: 'float-orb-5 5.5s ease-in-out infinite'
                }}></div>
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
  );
};

export default Home;
