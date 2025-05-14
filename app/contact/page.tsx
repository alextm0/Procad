"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const ContactPage = () => {
  const [language, setLanguage] = useState("ro")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formError, setFormError] = useState<string | null>(null)
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any error when user starts typing again
    if (formStatus === "error") {
      setFormStatus("idle")
      setFormError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    
    try {
      // Send the form data to our API endpoint
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          formData: formData
          // The recipient will be determined by the EMAIL_RECIPIENT environment variable
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      // Success handling
      setFormStatus("success")
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setFormStatus("idle")
      }, 3000)
    } catch (error) {
      // Error handling
      console.error('Error sending email:', error)
      setFormStatus("error")
      setFormError(language === "ro" ? "A apărut o eroare. Vă rugăm încercați din nou." : "An error occurred. Please try again.")
    }
  }

  const contactInfo = {
    address: "Str. Suceava, Nr. 13, Timișoara, Timiș",
    postalCode: "300391",
    phone1: "(0256) 430 856",
    phone2: "(0356) 437 098",
    email: "procadtm@gmail.com",
    hours: "Luni - Vineri: 9:00 - 17:00",
    website: "www.procad.ro",
    social: {
      facebook: "https://facebook.com/",
      linkedin: "https://linkedin.com/",
    }
  }

  const translations = {
    ro: {
      title: "Contactează-ne",
      subtitle:
        "Ne-ar face plăcere să auzim de la tine! Indiferent dacă ai o întrebare despre serviciile noastre sau dorești să începi următorul proiect, spune-ne cum te putem ajuta.",
      form: {
        name: "Nume",
        email: "Email",
        phone: "Telefon",
        subject: "Subiect",
        message: "Mesaj",
        button: "Trimite Mesaj",
        submitting: "Se trimite...",
        success: "Mesaj trimis cu succes!",
        error: "Eroare la trimitere. Încercați din nou.",
        namePlaceholder: "Numele tău complet",
        emailPlaceholder: "Adresa ta de email",
        phonePlaceholder: "Numărul tău de telefon",
        subjectOptions: [
          "Selectează un subiect",
          "Solicitare ofertă",
          "Informații servicii",
          "Colaborare",
          "Angajare",
          "Altele"
        ],
        messagePlaceholder: "Scrie mesajul tău aici...",
      },
      contactInfo: {
        title: "Informații de Contact",
        subtitle: "Suntem aici pentru a te ajuta. Contactează-ne prin oricare dintre metodele de mai jos.",
        address: "Adresă",
        phone: "Telefon",
        email: "Email",
        hours: "Program",
        website: "Website",
        followUs: "Urmărește-ne",
        getDirections: "Obține indicații",
      },
    },
    en: {
      title: "Contact Us",
      subtitle:
        "We'd love to hear from you! Whether you have a question about our services or want to start your next project, let us know how we can help.",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        button: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message. Please try again.",
        namePlaceholder: "Your full name",
        emailPlaceholder: "Your email address",
        phonePlaceholder: "Your phone number",
        subjectOptions: [
          "Select a subject",
          "Quote request",
          "Service information",
          "Collaboration",
          "Employment",
          "Other"
        ],
        messagePlaceholder: "Write your message here...",
      },
      contactInfo: {
        title: "Contact Information",
        subtitle: "We're here to help. Reach out to us through any of the methods below.",
        address: "Address",
        phone: "Phone",
        email: "Email",
        hours: "Working Hours",
        website: "Website",
        followUs: "Follow Us",
        getDirections: "Get Directions",
      },
    },
  } as const

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-8 sticky top-24">
              <div className="mb-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-primary-dark mb-4">{t.contactInfo.title}</h2>
                <p className="text-gray-600">{t.contactInfo.subtitle}</p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary-dark/5 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.contactInfo.address}</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                    <p className="text-gray-600">{contactInfo.postalCode}</p>
                    <a 
                      href={`https://maps.google.com/?q=${contactInfo.address}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-sm font-medium text-secondary hover:text-secondary-light transition-colors"
                    >
                      {t.contactInfo.getDirections}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-dark/5 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.contactInfo.phone}</h3>
                    <p className="text-gray-600">{contactInfo.phone1}</p>
                    <p className="text-gray-600">{contactInfo.phone2}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-dark/5 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.contactInfo.email}</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="text-gray-600 hover:text-secondary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-dark/5 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.contactInfo.hours}</h3>
                    <p className="text-gray-600">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">{t.contactInfo.followUs}</h3>
                <div className="flex space-x-4">
                  <a 
                    href={contactInfo.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a 
                    href={contactInfo.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-primary-dark text-white p-8">
                <h2 className="text-2xl font-bold mb-2">{language === "ro" ? "Trimite-ne un mesaj" : "Send us a message"}</h2>
                <div className="w-20 h-0.5 bg-secondary mb-4"></div>
                <p className="text-white text-opacity-90">{language === "ro" ? "Completează formularul de mai jos și te vom contacta în cel mai scurt timp" : "Fill out the form below and we'll get back to you as soon as possible"}</p>
              </div>
              
              {/* Form Content */}
              <div className="p-8">
                {formStatus === "success" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{t.form.success}</h3>
                    <p className="text-green-700">{language === "ro" ? "Îți mulțumim pentru mesaj. Te vom contacta în curând." : "Thank you for your message. We'll contact you soon."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.name} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-gray-900"
                          placeholder={t.form.namePlaceholder}
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.email} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-gray-900"
                          placeholder={t.form.emailPlaceholder}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-gray-900"
                          placeholder={t.form.phonePlaceholder}
                        />
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          {t.form.subject} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-gray-900"
                        >
                          {t.form.subjectOptions.map((option, index) => (
                            <option key={index} value={index === 0 ? "" : option} disabled={index === 0}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-gray-900"
                        placeholder={t.form.messagePlaceholder}
                      ></textarea>
                    </div>

                    {/* Error Message */}
                    {formStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-red-700">{formError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-secondary hover:bg-secondary-light text-white py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          {t.form.submitting}
                        </>
                      ) : (
                        <>
                          {t.form.button}
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16 h-[500px] w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.1966113738037!2d21.22529231555443!3d45.75387997910548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff24d29f192!2sStrada%20Suceava%2013%2C%20Timi%C8%99oara%20300391!5e0!3m2!1sen!2sro!4v1652345678901!5m2!1sen!2sro"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
        <div className="absolute top-8 left-8 md:left-16 bg-white p-6 rounded-xl shadow-xl max-w-md">
          <div className="flex items-center mb-4">
            <Image src="/dark-text-logo.png" alt="PROCAD Logo" width={140} height={56} className="h-10 w-auto" />
          </div>
          <div className="w-16 h-0.5 bg-secondary/70 mb-4"></div>
          <h3 className="text-xl font-bold text-primary-dark mb-2">{contactInfo.address}</h3>
          <p className="text-gray-600">{contactInfo.postalCode}</p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
