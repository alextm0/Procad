"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/data/projects"

const ProjectsPage = () => {
  const [language, setLanguage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isHovered, setIsHovered] = useState<number | null>(null)

  useEffect(() => {
    // Get initial language from localStorage
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

  // Don't render content until language is loaded
  if (!language) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const categories = [
    { id: "all", name: { ro: "Toate", en: "All" } },
    { id: "Cadastru și Topografie", name: { ro: "Cadastru și Topografie", en: "Cadastre and Topography" } },
    { id: "GIS & Mobile Mapping", name: { ro: "GIS & Mobile Mapping", en: "GIS & Mobile Mapping" } },
    { id: "Arhitectură și Urbanism", name: { ro: "Arhitectură și Urbanism", en: "Architecture and Urban Planning" } },
  ]

  const filteredProjects = projectsData[language as keyof typeof projectsData]
    .filter((project: any) => activeCategory === "all" || project.category === activeCategory)
    .filter(
      (project: any) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Page Title Section */}
      <div className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-dark">
              {language === "ro" ? "Proiectele Noastre" : "Our Projects"}
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 mb-0 leading-relaxed">
              {language === "ro"
                ? "Explorați portofoliul nostru de proiecte care demonstrează expertiza și calitatea serviciilor oferite."
                : "Explore our portfolio of projects that demonstrate the expertise and quality of our services."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder={language === "ro" ? "Caută proiecte..." : "Search projects..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent shadow-sm transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    activeCategory === category.id
                      ? "bg-secondary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow"
                  }`}
                >
                  {category.name[language as keyof typeof category.name]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="p-8">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-full mb-4">
                    {project.category}
                  </span>
                  
                  <h3 className="text-xl font-semibold text-primary-dark mb-3 group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex items-center text-gray-500 mb-4 text-sm">
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

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg p-10 mt-8">
            <div className="flex flex-col items-center justify-center">
              <Search className="h-16 w-16 text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-primary-dark mb-3">
                {language === "ro" ? "Niciun rezultat găsit" : "No results found"}
              </h3>
              <p className="text-gray-600 text-lg max-w-lg mx-auto">
                {language === "ro"
                  ? "Nu s-au găsit proiecte care să corespundă criteriilor de căutare. Încercați alte cuvinte cheie sau categorii."
                  : "No projects found matching your search criteria. Try different keywords or categories."}
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="mt-8 bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
              >
                {language === "ro" ? "Resetează filtrele" : "Reset filters"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage
