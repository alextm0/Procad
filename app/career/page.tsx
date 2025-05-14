"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const CareerPage = () => {
  const [language, setLanguage] = useState("ro")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null as File | null,
  })
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    
    try {
      // Create a FormData object to send all data including the file
      const formDataToSend = new FormData();
      formDataToSend.append('formType', 'career');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      
      // Add the file if one is provided
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      
      // Send the form data and file directly to the API endpoint
      const response = await fetch('/api/send-with-attachment', {
        method: 'POST',
        body: formDataToSend, // No need to set Content-Type header as it's automatically set with FormData
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Reset form
      setFormData({ name: "", email: "", message: "", file: null });
      setFileName("");
      
      // Show success message
      alert(language === "ro" ? "Aplicație trimisă cu succes!" : "Application sent successfully!");
    } catch (error) {
      console.error('Error sending application:', error);
      setErrorMessage(language === "ro" 
        ? "A apărut o eroare. Vă rugăm încercați din nou." 
        : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const translations = {
    ro: {
      title: "Cariere",
      subtitle:
        "Suntem mereu în căutare de talente care să ne ajute să oferim servicii de cea mai înaltă calitate. Dacă ești pasionat de topografie, cadastru, urbanism sau proiectare, te invităm să aplici pentru a face parte din echipa PROCAD.",
      form: {
        name: "Nume",
        email: "Email",
        message: "Mesaj",
        file: "Încarcă CV-ul (doar PDF)",
        button: "Trimite",
        namePlaceholder: "Numele tău complet",
        emailPlaceholder: "Adresa ta de email",
        messagePlaceholder: "Scrie mesajul tău aici...",
      },
    },
    en: {
      title: "Careers",
      subtitle:
        "We are always looking for talented individuals to help us deliver the highest quality services. If you are passionate about topography, cadastre, urban planning or design, we invite you to apply to be part of the PROCAD team.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        file: "Upload CV (PDF only)",
        button: "Submit",
        namePlaceholder: "Your full name",
        emailPlaceholder: "Your email address",
        messagePlaceholder: "Write your message here...",
      },
    },
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Page Title Section */}
      <div className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-dark">{t.title}</h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 mb-0 leading-relaxed">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 py-16">
        {/* Application Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-primary-dark text-white p-8">
            <h2 className="text-2xl font-bold mb-2">{language === "ro" ? "Aplică pentru un job" : "Apply for a job"}</h2>
            <div className="w-20 h-0.5 bg-secondary mb-4"></div>
            <p className="text-white text-opacity-90">{language === "ro" ? "Completează formularul de mai jos și te vom contacta în cel mai scurt timp" : "Fill out the form below and we'll get back to you as soon as possible"}</p>
          </div>
          
          <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 shadow-sm text-gray-900"
                placeholder={t.form.namePlaceholder}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 shadow-sm text-gray-900"
                placeholder={t.form.emailPlaceholder}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 shadow-sm text-gray-900"
                placeholder={t.form.messagePlaceholder}
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.file}
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:border-secondary focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/30"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-4 text-secondary" />
                    <p className="mb-2 text-sm font-medium text-gray-800">
                      {fileName
                        ? <span className="font-semibold text-primary-dark">{fileName}</span>
                        : language === "ro"
                          ? "Apasă pentru a încărca sau trage fișierul aici"
                          : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-700 bg-gray-200 px-3 py-1 rounded-full font-medium">PDF, DOC, DOCX (MAX. 10MB)</p>
                  </div>
                  <input id="file-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {errorMessage}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary-light text-white py-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  {language === "ro" ? "Se trimite..." : "Sending..."}
                  <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </>
              ) : (
                <>
                  {t.form.button}
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerPage
