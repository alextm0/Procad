"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react"

const Footer = () => {
  const [language, setLanguage] = useState("ro")

  useEffect(() => {
    // Check for language in localStorage or other state management
    const storedLanguage = localStorage.getItem("language") || "ro"
    setLanguage(storedLanguage)
  }, [])

  const contactInfo = {
    address: "Str. Suceava, Nr. 13, Timișoara, Timiș",
    postalCode: "300391",
    phone1: "(0256) 430 856",
    phone2: "(0356) 437 098",
    email: "procadtm@gmail.com",
    hours: "Luni - Vineri: 9 - 17",
    website: "www.procad.ro",
  }

  const footerLinks = {
    ro: {
      company: {
        title: "Companie",
        links: [
          { name: "Despre Noi", href: "#about" },
          { name: "Servicii", href: "#services" },
          { name: "Proiecte", href: "#projects" },
          { name: "Cariere", href: "/career" },
        ],
      },
      services: {
        title: "Servicii",
        links: [
          { name: "Cadastru", href: "#services" },
          { name: "Topografie", href: "#services" },
          { name: "Urbanism", href: "#services" },
          { name: "Proiectare", href: "#services" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { name: "Termeni și Condiții", href: "/terms" },
          { name: "Politica de Confidențialitate", href: "/privacy" },
          { name: "Cookie Policy", href: "/cookies" },
        ],
      },
    },
    en: {
      company: {
        title: "Company",
        links: [
          { name: "About Us", href: "#about" },
          { name: "Services", href: "#services" },
          { name: "Projects", href: "#projects" },
          { name: "Careers", href: "/career" },
        ],
      },
      services: {
        title: "Services",
        links: [
          { name: "Cadastre", href: "#services" },
          { name: "Topography", href: "#services" },
          { name: "Urban Planning", href: "#services" },
          { name: "Design", href: "#services" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { name: "Terms & Conditions", href: "/terms" },
          { name: "Privacy Policy", href: "/privacy" },
          { name: "Cookie Policy", href: "/cookies" },
        ],
      },
    },
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/light-text-logo.png" alt="PROCAD Logo" width={180} height={72} className="h-14 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6">
              {language === "ro"
                ? "Servicii profesionale de topografie și urbanism pentru proiectele dvs."
                : "Professional topography and urban planning services for your projects."}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{language === "ro" ? "Contact Rapid" : "Quick Contact"}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-3 mt-1" />
                <span className="text-gray-300">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-3" />
                <span className="text-gray-300">
                  {contactInfo.phone1}, {contactInfo.phone2}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-3" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-secondary mr-3" />
                <span className="text-gray-300">{contactInfo.hours}</span>
              </li>
              <li className="flex items-center">
                <Globe className="h-5 w-5 text-secondary mr-3" />
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{footerLinks[language].company.title}</h3>
            <ul className="space-y-3">
              {footerLinks[language].company.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{footerLinks[language].services.title}</h3>
            <ul className="space-y-3">
              {footerLinks[language].services.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-64 rounded-lg overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.1966113738037!2d21.22529231555443!3d45.75387997910548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff24d29f192!2sStrada%20Suceava%2013%2C%20Timi%C8%99oara%20300391!5e0!3m2!1sen!2sro!4v1652345678901!5m2!1sen!2sro"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Procad.{" "}
            {language === "ro" ? "Toate drepturile rezervate." : "All rights reserved."}
          </p>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm">
              {language === "ro" ? "Designed with " : "Designed with "}
              <span className="text-red-500">❤</span>
              {language === "ro" ? " în România" : " in Romania"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
