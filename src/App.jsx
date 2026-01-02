import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

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
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Services />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
