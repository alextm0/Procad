"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { projectsData } from "@/data/projects"

const ProjectDetailPage = () => {
  const [language, setLanguage] = useState<string | null>(null)
  const params = useParams()
  const projectId = params.id as string

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "ro"
    setLanguage(storedLanguage)

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
        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-primary-dark mb-8 flex items-center">
                <div className="w-10 h-1 bg-secondary mr-4"></div>
                {language === "ro" ? "Descriere Proiect" : "Project Description"}
              </h2>
              
              <div className="prose max-w-none">
                {project.fullDescription ? (
                  project.fullDescription.map((paragraph: string, index: number) => (
                    <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden sticky top-24">
              {project.results && project.results.length > 0 && (
                <>
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
                  </div>
                </>
              )}

              <div className="p-6 border-t border-gray-200">
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
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-full mb-4">
                        {relatedProject.category}
                      </span>
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
