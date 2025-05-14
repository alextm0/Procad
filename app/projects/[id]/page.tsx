"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

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

const ProjectDetailPage = () => {
  const [language, setLanguage] = useState("ro")
  const [activeImage, setActiveImage] = useState(0)
  const params = useParams()
  const projectId = params.id as string

  useEffect(() => {
    // Check for language in localStorage
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

  // Find the project by ID
  const project = projectsData[language as keyof typeof projectsData].find((p: any) => p.id === projectId)

  if (!project) {
    return (
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary-dark mb-4">
            {language === "ro" ? "Proiect negăsit" : "Project not found"}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === "ro"
              ? "Proiectul pe care îl cauți nu există sau a fost mutat."
              : "The project you are looking for does not exist or has been moved."}
          </p>
          <Button asChild className="bg-secondary hover:bg-secondary-light text-white">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {language === "ro" ? "Înapoi la proiecte" : "Back to projects"}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Page Header */}
      <div className="pt-32 pb-8 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          {/* Removed back button as requested */}

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-white bg-secondary rounded-full">
                {project.category}
              </span>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-secondary" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-secondary" />
                <span>{project.location}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-dark">{project.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-0">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 py-16">
        {/* Image Gallery */}
        <div className="mb-16">
          <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl mb-6">
            <Image
              src={project.gallery[activeImage] || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-primary-dark font-medium text-sm shadow-lg">
              {language === "ro" ? "Imagine " : "Image "} {activeImage + 1} / {project.gallery.length}
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 px-2">
            {project.gallery.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-24 w-40 rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg ${
                  activeImage === index ? "ring-4 ring-secondary scale-105" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="160px"
                  quality={80}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-primary-dark mb-8 flex items-center">
                <div className="w-10 h-1 bg-secondary mr-4"></div>
                {language === "ro" ? "Descriere Proiect" : "Project Description"}
              </h2>
              
              <div className="prose max-w-none">
                {project.fullDescription.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden sticky top-24">
              <div className="bg-primary-dark text-white p-6">
                <h2 className="text-xl font-bold mb-2">{language === "ro" ? "Rezultate Proiect" : "Project Results"}</h2>
                <div className="w-16 h-0.5 bg-secondary/70 mb-2"></div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {project.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-secondary/10 p-2 rounded-full mr-4 mt-0.5">
                        <Tag className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-primary-dark mb-4">
                    {language === "ro" ? "Ai un proiect similar?" : "Have a similar project?"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === "ro"
                      ? "Contactează-ne pentru a discuta despre cum te putem ajuta cu expertiza noastră."
                      : "Contact us to discuss how we can help you with our expertise."}
                  </p>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary-light text-white py-3 shadow-md hover:shadow-lg transition-all duration-300">
                    <Link href="/contact">{language === "ro" ? "Contactează-ne" : "Contact Us"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-primary-dark flex items-center">
              <div className="w-10 h-1 bg-secondary mr-4"></div>
              {language === "ro" ? "Proiecte Similare" : "Similar Projects"}
            </h2>
            <Button asChild variant="outline" className="text-primary-dark border-primary-dark/20 hover:bg-primary-dark/5">
              <Link href="/projects">
                {language === "ro" ? "Vezi toate proiectele" : "View all projects"}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData[language as keyof typeof projectsData]
              .filter((p: any) => p.category === project.category && p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]"
                >
                  <Link href={`/projects/${relatedProject.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-secondary rounded-full mb-2">
                          {relatedProject.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-semibold text-primary-dark mb-3 group-hover:text-secondary transition-colors duration-300">
                        {relatedProject.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{relatedProject.description}</p>
                      <div className="flex items-center text-secondary font-medium">
                        {language === "ro" ? "Vezi detalii" : "View details"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
