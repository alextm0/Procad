"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroImages = [
  {
    src: "/hero1.jpeg",
    alt: "PROCAD surveying equipment in mountain landscape",
  },
  {
    src: "/Procad6.jpg",
    alt: "PROCAD engineers reviewing plans",
  },
  {
    src: "/Procad4.jpg",
    alt: "PROCAD field worker with equipment",
  },
  {
    src: "/Procad10.jpg",
    alt: "PROCAD topographic survey work",
  },
]

const heroTitles = {
  ro: [
    "Măsurăm lumea pentru a crea viitorul în Topografie",
    "Proiectăm spații pentru comunități durabile",
    "Cartografiem terenuri cu precizie și inovație",
  ],
  en: [
    "Measuring the world to create the future in Topography",
    "Designing spaces for sustainable communities",
    "Mapping lands with precision and innovation",
  ],
}

const heroDescriptions = {
  ro: "Descoperiți servicii precise și inovatoare pentru proiectele dvs. de construcție și planificare urbană.",
  en: "Discover precise and innovative services for your construction and urban planning projects.",
}

const buttonTexts = {
  ro: {
    services: "Explorați Serviciile",
    projects: "Proiectele Noastre",
  },
  en: {
    services: "Explore Services",
    projects: "Our Projects",
  },
}

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [language, setLanguage] = useState("ro")

  useEffect(() => {
    // Preload all hero images to reduce lag
    heroImages.forEach(image => {
      const img = new globalThis.Image();
      img.src = image.src || "/placeholder.svg";
    });
    
    // Use requestAnimationFrame for smoother transitions
    let animationFrameId: number;
    let lastUpdateTime = Date.now();
    
    const updateSlider = () => {
      const currentTime = Date.now();
      if (currentTime - lastUpdateTime >= 5000) { // 5 seconds interval
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % heroTitles.ro.length);
        lastUpdateTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(updateSlider);
    };
    
    animationFrameId = requestAnimationFrame(updateSlider);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [])

  useEffect(() => {
    // Check for language in localStorage or other state management
    const storedLanguage = localStorage.getItem("language") || "ro"
    setLanguage(storedLanguage)

    // Add event listener for language changes
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ro")
    }
    window.addEventListener("languageChange", handleLanguageChange)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image 
              src={image.src || "/placeholder.svg"} 
              alt={image.alt} 
              fill 
              priority={index === 0} 
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover" 
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl text-white py-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 hero-slide drop-shadow-lg">
              {heroTitles[language as keyof typeof heroTitles][currentTitleIndex]}
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 drop-shadow-md leading-relaxed">{heroDescriptions[language as keyof typeof heroDescriptions]}</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                asChild
                className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center"
              >
                <a href="#services">
                  {buttonTexts[language as keyof typeof buttonTexts].services}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-dark px-6 py-3 rounded-md font-medium transition-all duration-300"
              >
                <a href="#projects">{buttonTexts[language as keyof typeof buttonTexts].projects}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
