import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Admin from './components/Admin'

// Lazy load About component for better mobile performance
const About = lazy(() => import('./components/About'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
)

// Home Page Component (includes all sections)
function HomePage() {
  return (
    <>
      <Home />
      <Services />
      <Projects />
      <Contact />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Admin route without navbar/footer */}
              <Route path="/admin" element={<Admin />} />
              
              {/* Regular routes with navbar/footer */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/service" element={<Services />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Catch-all route - redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                  <Footer />
                  <ScrollToTop />
                </>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
