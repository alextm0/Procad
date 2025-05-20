"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { usePathname } from "next/navigation"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState("ro")
  const pathname = usePathname()

  useEffect(() => {
    // Debounced scroll handler to improve performance
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        if (window.scrollY > 10) {
          if (!isScrolled) setIsScrolled(true);
        } else {
          if (isScrolled) setIsScrolled(false);
        }
      }, 10); // Small timeout for debouncing
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled])

  useEffect(() => {
    // Check for language in localStorage
    const storedLanguage = localStorage.getItem("language") || "ro"
    setLanguage(storedLanguage)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const toggleLanguage = () => {
    const newLanguage = language === "ro" ? "en" : "ro"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Dispatch a custom event to notify components about language change
    const event = new Event("languageChange")
    window.dispatchEvent(event)
  }

  const isHomePage = pathname === "/"
  const isProjectDetailPage = pathname.startsWith("/projects/") && pathname !== "/projects"
  const isCareerPage = pathname === "/career"
  const isProjectsPage = pathname === "/projects"
  const isContactPage = pathname === "/contact"

  const navItems = [
    { name: language === "ro" ? "Servicii" : "Services", href: isHomePage ? "#services" : "/#services" },
    { name: language === "ro" ? "Proiecte" : "Projects", href: isHomePage ? "#projects" : "/projects" },
    { name: language === "ro" ? "Despre" : "About", href: isHomePage ? "#about" : "/#about" },
    { name: language === "ro" ? "Contact" : "Contact", href: "/contact" },
    { name: language === "ro" ? "Cariera" : "Career", href: "/career" },
  ]

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isProjectDetailPage ? "bg-primary-dark/95 backdrop-blur-sm shadow-md py-3" :
        (isCareerPage || isProjectsPage || isContactPage) ? 
          (isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-primary-dark py-5") :
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <div className={`relative ${isScrolled ? "" : "drop-shadow-md"}`}>
            {/* Preload both logos but only show the appropriate one */}
            <Image 
              src="/dark-text-logo.png"
              alt="PROCAD Logo" 
              width={200} 
              height={80} 
              className={`h-16 w-auto transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 absolute'}`}
              priority
            />
            <Image 
              src="/light-text-logo.png"
              alt="PROCAD Logo" 
              width={200} 
              height={80} 
              className={`h-16 w-auto transition-opacity duration-300 ${isScrolled ? 'opacity-0 absolute' : 'opacity-100'}`}
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium transition-colors hover:text-secondary ${
                isProjectDetailPage ? "text-white drop-shadow-md" :
                (isCareerPage || isProjectsPage || isContactPage) ? 
                  (isScrolled ? "text-primary-dark" : "text-white drop-shadow-md") :
                isScrolled ? "text-primary-dark" : "text-white drop-shadow-md"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className={`flex items-center text-base font-medium transition-colors hover:text-secondary ${
              isProjectDetailPage ? "text-white drop-shadow-md" :
              (isCareerPage || isProjectsPage || isContactPage) ? 
                (isScrolled ? "text-primary-dark" : "text-white drop-shadow-md") :
              isScrolled ? "text-primary-dark" : "text-white drop-shadow-md"
            }`}
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === "ro" ? "EN" : "RO"}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden relative z-10" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <X className={isProjectDetailPage ? "text-white drop-shadow-md" : (isCareerPage || isProjectsPage || isContactPage) ? (isScrolled ? "text-primary-dark" : "text-white drop-shadow-md") : isScrolled ? "text-primary-dark" : "text-white drop-shadow-md"} />
          ) : (
            <Menu className={isProjectDetailPage ? "text-white drop-shadow-md" : (isCareerPage || isProjectsPage || isContactPage) ? (isScrolled ? "text-primary-dark" : "text-white drop-shadow-md") : isScrolled ? "text-primary-dark" : "text-white drop-shadow-md"} />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-primary-dark bg-opacity-95 flex flex-col items-center justify-center md:hidden z-50" style={{top:0, left:0, width:'100vw', height:'100vh'}}>
            {/* Close Button */}
            <button 
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-white hover:text-secondary transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col items-center space-y-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white text-xl font-medium hover:text-secondary py-2"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLanguage()
                  toggleMenu()
                }}
                className="flex items-center text-white text-xl font-medium hover:text-secondary py-2"
              >
                <Globe className="h-6 w-6 mr-2" />
                {language === "ro" ? "EN" : "RO"}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
