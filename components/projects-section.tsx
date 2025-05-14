"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CustomWaveDivider from "./custom-wave-divider"

const projectsData = {
  ro: [
    {
      id: "cartografiere-aeriana-valea-muresului",
      title: "Cartografiere Aeriană - Valea Mureșului",
      description: "Cartografiere cu dronă și procesare date LiDAR pentru monitorizarea zonei de protecție.",
      image: "/hero1.jpeg",
      category: "Fotogrammetrie",
      date: "Martie 2023",
      location: "Valea Mureșului, România",
      fullDescription: [
        "Proiectul a implicat cartografierea detaliată a Văii Mureșului utilizând tehnologie avansată de dronă și procesare LiDAR.",
        "Scopul principal a fost monitorizarea zonei de protecție și evaluarea schimbărilor topografice din regiune.",
        "Echipa noastră a realizat zboruri fotogrammetrice la diferite altitudini pentru a captura date de înaltă rezoluție.",
        "Datele colectate au fost procesate utilizând software specializat pentru a genera modele digitale ale terenului (DTM) și modele digitale ale suprafeței (DSM).",
        "Rezultatele au fost utilizate pentru analiza schimbărilor în timp și pentru planificarea măsurilor de protecție a mediului.",
      ],
      results: [
        "Model digital al terenului cu precizie de 5 cm",
        "Ortofotoplanuri de înaltă rezoluție",
        "Hărți tematice pentru monitorizarea zonei de protecție",
        "Analiză volumetrică a schimbărilor topografice",
      ],
      gallery: ["/hero1.jpeg", "/hero2.jpeg", "/hero3.jpeg"],
    },
    {
      id: "plan-urbanistic-zonal-timisoara-nord",
      title: "Plan Urbanistic Zonal - Timișoara Nord",
      description: "Dezvoltare PUZ pentru o nouă zonă rezidențială cu spații verzi integrate.",
      image: "/hero2.jpeg",
      category: "Urbanism",
      date: "Iunie 2023",
      location: "Timișoara, România",
      fullDescription: [
        "Proiectul a constat în elaborarea unui Plan Urbanistic Zonal (PUZ) pentru dezvoltarea unei noi zone rezidențiale în partea de nord a Timișoarei.",
        "Conceptul a pus accent pe integrarea spațiilor verzi și crearea unui mediu urban sustenabil și prietenos cu mediul.",
        "Echipa noastră a realizat studii preliminare, inclusiv analize de trafic, impact asupra mediului și integrare în contextul urban existent.",
        "Planul final include zone rezidențiale, spații comerciale, facilități educaționale și recreative, precum și o rețea extinsă de spații verzi și piste pentru biciclete.",
      ],
      results: [
        "Plan Urbanistic Zonal aprobat de autoritățile locale",
        "Concept integrat de dezvoltare urbană sustenabilă",
        "Soluții inovatoare pentru managementul apelor pluviale",
        "Rețea de spații verzi interconectate",
      ],
      gallery: ["/hero2.jpeg", "/hero3.jpeg", "/hero1.jpeg"],
    },
    {
      id: "ridicari-topografice-autostrada-a1",
      title: "Ridicări Topografice - Autostrada A1",
      description: "Măsurători de precizie pentru extinderea infrastructurii rutiere naționale.",
      image: "/hero3.jpeg",
      category: "Topografie",
      date: "Septembrie 2023",
      location: "Autostrada A1, România",
      fullDescription: [
        "Proiectul a implicat realizarea de ridicări topografice de înaltă precizie pentru extinderea și modernizarea unui segment al Autostrăzii A1.",
        "Echipa noastră a utilizat echipamente de ultimă generație pentru a asigura măsurători precise, esențiale pentru proiectarea și construcția infrastructurii rutiere.",
        "Lucrările au inclus ridicări topografice terestre, stabilirea rețelei de sprijin geodezic și determinarea profilelor longitudinale și transversale.",
        "Datele colectate au fost procesate și integrate în sistemul de proiectare pentru a asigura conformitatea cu standardele naționale și europene de infrastructură rutieră.",
      ],
      results: [
        "Ridicări topografice cu precizie sub-centimetrică",
        "Rețea geodezică de sprijin pentru întregul proiect",
        "Modele digitale ale terenului pentru proiectare",
        "Documentație tehnică completă conform standardelor CNAIR",
      ],
      gallery: ["/hero3.jpeg", "/hero1.jpeg", "/hero2.jpeg"],
    },
  ],
  en: [
    {
      id: "aerial-mapping-mures-valley",
      title: "Aerial Mapping - Mureș Valley",
      description: "Drone mapping and LiDAR data processing for protection zone monitoring.",
      image: "/hero1.jpeg",
      category: "Photogrammetry",
      date: "March 2023",
      location: "Mureș Valley, Romania",
      fullDescription: [
        "The project involved detailed mapping of the Mureș Valley using advanced drone technology and LiDAR processing.",
        "The main purpose was to monitor the protection zone and evaluate topographic changes in the region.",
        "Our team conducted photogrammetric flights at different altitudes to capture high-resolution data.",
        "The collected data was processed using specialized software to generate Digital Terrain Models (DTM) and Digital Surface Models (DSM).",
        "The results were used for analyzing changes over time and planning environmental protection measures.",
      ],
      results: [
        "Digital terrain model with 5 cm accuracy",
        "High-resolution orthophotoplans",
        "Thematic maps for protection zone monitoring",
        "Volumetric analysis of topographic changes",
      ],
      gallery: ["/hero1.jpeg", "/hero2.jpeg", "/hero3.jpeg"],
    },
    {
      id: "zonal-urban-plan-timisoara-north",
      title: "Zonal Urban Plan - Timișoara North",
      description: "PUZ development for a new residential area with integrated green spaces.",
      image: "/hero2.jpeg",
      category: "Urban Planning",
      date: "June 2023",
      location: "Timișoara, Romania",
      fullDescription: [
        "The project consisted of developing a Zonal Urban Plan (PUZ) for a new residential area in the northern part of Timișoara.",
        "The concept emphasized the integration of green spaces and the creation of a sustainable and environmentally friendly urban environment.",
        "Our team conducted preliminary studies, including traffic analysis, environmental impact, and integration into the existing urban context.",
        "The final plan includes residential areas, commercial spaces, educational and recreational facilities, as well as an extensive network of green spaces and bicycle paths.",
      ],
      results: [
        "Zonal Urban Plan approved by local authorities",
        "Integrated concept of sustainable urban development",
        "Innovative solutions for rainwater management",
        "Network of interconnected green spaces",
      ],
      gallery: ["/hero2.jpeg", "/hero3.jpeg", "/hero1.jpeg"],
    },
    {
      id: "topographic-surveys-a1-highway",
      title: "Topographic Surveys - A1 Highway",
      description: "Precision measurements for national road infrastructure expansion.",
      image: "/hero3.jpeg",
      category: "Topography",
      date: "September 2023",
      location: "A1 Highway, Romania",
      fullDescription: [
        "The project involved high-precision topographic surveys for the expansion and modernization of a segment of the A1 Highway.",
        "Our team used state-of-the-art equipment to ensure precise measurements, essential for the design and construction of road infrastructure.",
        "The work included terrestrial topographic surveys, establishing the geodetic support network, and determining longitudinal and transverse profiles.",
        "The collected data was processed and integrated into the design system to ensure compliance with national and European road infrastructure standards.",
      ],
      results: [
        "Topographic surveys with sub-centimeter precision",
        "Geodetic support network for the entire project",
        "Digital terrain models for design",
        "Complete technical documentation according to CNAIR standards",
      ],
      gallery: ["/hero3.jpeg", "/hero1.jpeg", "/hero2.jpeg"],
    },
  ],
}

const ProjectsSection = () => {
  const [language, setLanguage] = useState("ro")
  const [activeCategory, setActiveCategory] = useState("all")
  const [isHovered, setIsHovered] = useState<number | null>(null)

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

  const categories = [
    { id: "all", name: { ro: "Toate", en: "All" } },
    { id: "Fotogrammetrie", name: { ro: "Fotogrammetrie", en: "Photogrammetry" } },
    { id: "Urbanism", name: { ro: "Urbanism", en: "Urban Planning" } },
    { id: "Topografie", name: { ro: "Topografie", en: "Topography" } },
  ]

  const filteredProjects =
    activeCategory === "all"
      ? projectsData[language as keyof typeof projectsData]
      : projectsData[language as keyof typeof projectsData].filter((project: any) => project.category === activeCategory)

  return (
    <section id="projects" className="relative py-24 bg-primary-dark text-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "ro" ? "Proiecte Realizate" : "Our Projects"}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            {language === "ro"
              ? "Explorați o selecție din proiectele noastre recente care demonstrează expertiza și calitatea serviciilor oferite."
              : "Explore a selection of our recent projects that demonstrate the expertise and quality of our services."}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-secondary text-white"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              }`}
            >
              {category.name[language as keyof typeof category.name]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project: any, index: number) => (
            <div
              key={index}
              className="project-card bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 group"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isHovered === index ? "scale-110" : "scale-100"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-secondary rounded-full mb-2">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex items-center text-gray-300 mb-4 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-secondary" />
                    <span>{project.date}</span>
                    <MapPin className="h-4 w-4 ml-4 mr-2 text-secondary" />
                    <span>{project.location}</span>
                  </div>

                  <Button
                    variant="link"
                    className="text-secondary hover:text-secondary-light p-0 flex items-center group"
                  >
                    {language === "ro" ? "Vezi detalii" : "View details"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
          >
            <Link href="/projects">
              {language === "ro" ? "Vezi toate proiectele" : "View all projects"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <CustomWaveDivider className="absolute bottom-0 left-0 right-0" />
    </section>
  )
}

export default ProjectsSection
