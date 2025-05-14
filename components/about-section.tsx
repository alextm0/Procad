"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Award, Users, CheckCircle } from "lucide-react"

const aboutData = {
  ro: {
    title: "Cine suntem noi?",
    subtitle:
      "La Procad, combinăm tehnologia de ultimă generație cu decenii de experiență pentru a oferi soluții de topografie și planificare urbană fără egal.",
    description: [
      "Suntem onorați să vă punem la dispoziție cele mai de calitate servicii în domeniul - CADASTRU, URBANISM, TOPOGRAFIE și PROIECTARE.",
      "Firma PROCAD a fost înființată în anul 2005 și este autorizată de către Agenția Națională de Cadastru și Publicitate Imobiliară fiind certificată în Clasa I pentru domeniile cadastrului, geodeziei și cartografiei.",
    ],
    features: [
      {
        icon: <Calendar className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Experiență din 2005 în topografie și cadastru",
      },
      {
        icon: <Award className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Certificate Clasa I în geodezie și cartografie",
      },
      {
        icon: <Users className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Echipă de profesioniști certificați",
      },
      {
        icon: <CheckCircle className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Proiecte de urbanism și dezvoltări imobiliare",
      },
    ],
  },
  en: {
    title: "Who we are?",
    subtitle:
      "At Procad, we combine cutting-edge technology with decades of experience to deliver unparalleled topography and urban planning solutions.",
    description: [
      "We are honored to provide you with the highest quality services in the field of CADASTRE, URBAN PLANNING, TOPOGRAPHY and DESIGN.",
      "PROCAD company was established in 2005 and is authorized by the National Agency for Cadastre and Real Estate Advertising, being certified in Class I for the fields of cadastre, geodesy and cartography.",
    ],
    features: [
      {
        icon: <Calendar className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Experience since 2005 in topography and cadastre",
      },
      {
        icon: <Award className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Class I Certificates in geodesy and cartography",
      },
      {
        icon: <Users className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Team of certified professionals",
      },
      {
        icon: <CheckCircle className="h-7 w-7 text-secondary" strokeWidth={1.5} />,
        title: "Urban planning projects and real estate developments",
      },
    ],
  },
}

const AboutSection = () => {
  // Add custom animations to tailwind.config.ts if they don't exist already
  const [language, setLanguage] = useState("ro")

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
    <section id="about" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative h-[550px] rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] group">
            <Image 
              src="/Procad7.jpg" 
              alt="PROCAD team working" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-primary-dark/30 mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-dark to-transparent h-1/2 opacity-80"></div>
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-primary-dark font-medium text-sm shadow-lg">
              {language === "ro" ? "Din 2005" : "Since 2005"}
            </div>
            <div className="absolute bottom-8 left-8 bg-white p-5 rounded-xl shadow-2xl transform -rotate-2 transition-transform duration-500 group-hover:rotate-0">
              <Image src="/dark-text-logo.png" alt="PROCAD Logo" width={140} height={56} className="h-14 w-auto" />
            </div>
          </div>

          {/* Content Side */}
          <div className="pl-0 lg:pl-4 animate-fade-in">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-6 section-title">
              {aboutData[language as keyof typeof aboutData].title}
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">{aboutData[language as keyof typeof aboutData].subtitle}</p>

            <div className="space-y-6 mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {aboutData[language as keyof typeof aboutData].description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 animate-slide-up" style={{ animationDelay: '300ms' }}>
              {aboutData[language as keyof typeof aboutData].features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-5 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-lg group/feature"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="mr-4 mt-1 bg-secondary/15 p-3 rounded-full shadow-sm transition-all duration-300 group-hover/feature:bg-secondary/25 group-hover/feature:scale-110">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 font-medium pt-1.5">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
