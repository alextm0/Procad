"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionDivider from "./section-divider"
import Link from "next/link"

const ContactCTA = () => {
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
    <section id="contact" className="relative py-20 bg-primary-dark text-white">
      <div className="absolute top-0 left-0 w-full">
        <SectionDivider variant="triangle" position="top" fillColor="fill-primary-dark" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {language === "ro" ? "Pregătit să începi un proiect?" : "Ready to start a project?"}
        </h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
          {language === "ro"
            ? "Ne-ar face plăcere să auzim de la tine! Indiferent dacă ai o întrebare despre serviciile noastre sau dorești să începi următorul proiect, spune-ne cum te putem ajuta."
            : "We'd love to hear from you! Whether you have a question about our services or want to start your next project, let us know how we can help."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
          >
            <Link href="/contact">
              {language === "ro" ? "Contactează-ne" : "Contact Us"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-dark px-6 py-3 rounded-md font-medium transition-all duration-300"
          >
            <Link href="/career">{language === "ro" ? "Cariere" : "Careers"}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
