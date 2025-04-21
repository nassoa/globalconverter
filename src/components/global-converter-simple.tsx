"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import CurrencyConverter from "@/components/currency-converter"
import HelpFaq from "@/components/help-faq"
import { Globe } from "lucide-react"

export default function GlobalConverterSimple() {
  const [activeTab, setActiveTab] = useState("converter")

  // Récupérer l'onglet actif depuis localStorage au chargement
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem("activeTab")
      if (savedTab) {
        setActiveTab(savedTab)
      }
    } catch (e) {
      console.error("Erreur lors du chargement des préférences:", e)
    }
  }, [])

  // Sauvegarder l'onglet actif dans localStorage
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    try {
      localStorage.setItem("activeTab", value)
    } catch (e) {
      console.error("Erreur lors de la sauvegarde des préférences:", e)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">GlobalConverter</h1>
        </div>
        <ModeToggle />
      </div>

      {/* Tabs navigation simplifiée */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "converter"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => handleTabChange("converter")}
        >
          Convertisseur
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "help"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => handleTabChange("help")}
        >
          Aide & FAQ
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "converter" && <CurrencyConverter />}
        {activeTab === "help" && <HelpFaq />}
      </div>
    </div>
  )
}
