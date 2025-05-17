"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import CustomWaveDivider from "./custom-wave-divider"
import { projectsData } from "@/data/projects"

type ProjectType = {
  id: string
  title: string
  description: string
  fullDescription?: string[]
  results?: string[]
  image: string
  category: string
  date: string
  location: string
}

type CategoryType = {
  id: string
  name: {
    ro: string
    en: string
  }
}

const ProjectsSection = () => {
  const [language, setLanguage] = useState<"ro" | "en" | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [isHovered, setIsHovered] = useState<number | null>(null)

  useEffect(() => {
    const storedLanguage = (localStorage.getItem("language") || "ro") as "ro" | "en"
    setLanguage(storedLanguage)

    const handleLanguageChange = () => {
      setLanguage((localStorage.getItem("language") || "ro") as "ro" | "en")
    }
    window.addEventListener("languageChange", handleLanguageChange)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  // Don't render content until language is loaded
  if (!language) {
    return null
  }

  const categories: CategoryType[] = [
    { id: "all", name: { ro: "Toate", en: "All" } },
    { id: "Cadastru și Topografie", name: { ro: "Cadastru și Topografie", en: "Cadastre and Topography" } },
    { id: "GIS & Mobile Mapping", name: { ro: "GIS & Mobile Mapping", en: "GIS & Mobile Mapping" } },
    { id: "Arhitectură și Urbanism", name: { ro: "Arhitectură și Urbanism", en: "Architecture and Urban Planning" } },
    { id: "Proiectare", name: { ro: "Proiectare", en: "Design" } },
    { id: "Arhivare Electronică", name: { ro: "Arhivare Electronică", en: "Electronic Archiving" } }
  ]

  const filteredProjects = projectsData[language]
    .filter((project: ProjectType) => activeCategory === "all" || project.category === activeCategory)
    .slice(0, 6)

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
              {category.name[language]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectType, index: number) => (
            <div
              key={index}
              className="project-card bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/10 group"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-secondary rounded-full mb-4">
                    {project.category}
                  </span>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex items-center text-gray-300 mb-4 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-secondary" />
                    <span>{project.date}</span>
                    <MapPin className="h-4 w-4 ml-4 mr-2 text-secondary" />
                    <span className="truncate">{project.location}</span>
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
        <div className="text-center mt-16">
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/projects">
              {language === "ro" ? "Vezi toate proiectele" : "View all projects"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CustomWaveDivider position="bottom" />
    </section>
  )
}

export default ProjectsSection
