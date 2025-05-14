"use client"

import { useState, useEffect } from "react"
import { MapPin, Ruler, Building, Camera, FileText, BarChart3 } from "lucide-react"
import SectionDivider from "./section-divider"

const servicesData = {
  ro: [
    {
      icon: <MapPin className="h-10 w-10 text-secondary" />,
      title: "Cadastru",
      description:
        "Puneri în posesie și intabulări pentru terenuri agricole, forestiere și construcții. Dezmembrări imobile, planuri urbanistice zonale și unificări terenuri.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-secondary" />,
      title: "Topografie",
      description:
        "Ridicări topografice pentru construcții civile, industriale, drumuri, căi ferate, poduri și viaducte. Ridicări pentru canale, lacuri, râuri, fluvii și terenuri forestiere.",
    },
    {
      icon: <Camera className="h-10 w-10 text-secondary" />,
      title: "Mobile Mapping și GIS",
      description:
        "Captură și analiză date spațiale cu tehnologie LiDAR. Organizare, vizualizare și integrare date în QGIS/ArcGIS. Prelucrare imagini satelitare și realizare hărți de risc.",
    },
    {
      icon: <Camera className="h-10 w-10 text-secondary" />,
      title: "Fotogrammetrie",
      description:
        "Planificare și execuție zboruri fotogrammetrice. Creare ortofotoplanuri. Generare model digital al terenului. Calcule volumetrice.",
    },
    {
      icon: <Building className="h-10 w-10 text-secondary" />,
      title: "Arhitectură - Urbanism",
      description:
        "Elaborare Planuri Urbanistice Generale (PUG), Zonale (PUZ) și de Detaliu (PUD). Proiectare arhitectură civilă/industrială și consultanță tehnică în urbanism.",
    },
    {
      icon: <FileText className="h-10 w-10 text-secondary" />,
      title: "Arhivare",
      description:
        "Arhivarea documentelor asigură trasabilitatea, transparența și protecția informațiilor organizaționale, esențială pentru gestionarea eficientă a datelor.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-secondary" />,
      title: "Proiectare",
      description:
        "Servicii de proiectare pentru drumuri, infrastructură, rețele edilitare și construcții civile/industriale. Elaborare documentații tehnice și studii de fezabilitate.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-secondary" />,
      title: "Evaluări",
      description:
        "Servicii de reevaluare a bunurilor imobile aparținând domeniului public și privat, servicii de cadastru și evaluare pentru expropriere.",
    },
  ],
  en: [
    {
      icon: <MapPin className="h-10 w-10 text-secondary" />,
      title: "Cadastre",
      description:
        "Property registration and land title services for agricultural, forest lands and constructions. Property divisions, zonal urban plans and land unifications.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-secondary" />,
      title: "Topography",
      description:
        "Topographic surveys for civil and industrial constructions, roads, railways, bridges and viaducts. Surveys for channels, lakes, rivers, streams and forest lands.",
    },
    {
      icon: <Camera className="h-10 w-10 text-secondary" />,
      title: "Mobile Mapping and GIS",
      description:
        "Spatial data capture and analysis with LiDAR technology. Organization, visualization and integration of data in QGIS/ArcGIS. Satellite image processing and risk mapping.",
    },
    {
      icon: <Camera className="h-10 w-10 text-secondary" />,
      title: "Photogrammetry",
      description:
        "Planning and execution of photogrammetric flights. Creation of orthophotoplans. Digital terrain model generation. Volumetric calculations.",
    },
    {
      icon: <Building className="h-10 w-10 text-secondary" />,
      title: "Architecture - Urban Planning",
      description:
        "Development of General Urban Plans (PUG), Zonal (PUZ) and Detailed (PUD) plans. Civil/industrial architecture design and technical consultancy in urban planning.",
    },
    {
      icon: <FileText className="h-10 w-10 text-secondary" />,
      title: "Archiving",
      description:
        "Document archiving ensures traceability, transparency and protection of organizational information, essential for efficient data management.",
    },
    {
      icon: <Ruler className="h-10 w-10 text-secondary" />,
      title: "Design",
      description:
        "Design services for roads, infrastructure, utility networks and civil/industrial constructions. Preparation of technical documentation and feasibility studies.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-secondary" />,
      title: "Evaluations",
      description:
        "Revaluation services for real estate belonging to the public and private domain, cadastre services and evaluation for expropriation.",
    },
  ],
}

const ServicesSection = () => {
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
    <section id="services" className="relative py-20 bg-gray-50">
      <div className="absolute top-0 left-0 w-full">
        <SectionDivider variant="wave" position="top" fillColor="fill-gray-50" />
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {language === "ro" ? "Serviciile Noastre" : "Our Services"}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            {language === "ro"
              ? "Oferim o gamă completă de servicii profesionale în domeniul topografiei, cadastrului, urbanismului și proiectării."
              : "We offer a complete range of professional services in the field of topography, cadastre, urban planning and design."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData[language].map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 bg-secondary/10 p-4 rounded-full">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary-dark mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
