"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import CurrencyConverter from "@/components/currency-converter";
import HelpFaq from "@/components/help-faq";
import { Coins, Globe } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GlobalConverter() {
  const [activeTab, setActiveTab] = useState("converter");

  // Récupérer l'onglet actif depuis localStorage au chargement
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem("activeTab");
      if (savedTab) {
        setActiveTab(savedTab);
      }
    } catch (e) {
      console.error("Erreur lors du chargement des préférences:", e);
    }
  }, []);

  // Sauvegarder l'onglet actif dans localStorage
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    try {
      localStorage.setItem("activeTab", value);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde des préférences:", e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Coins className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">GlobalConverter</h1>
        </div>
        <ModeToggle />
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="converter">Convertisseur</TabsTrigger>
          <TabsTrigger value="help">Aide & FAQ</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {activeTab === "converter" && <CurrencyConverter />}
          {activeTab === "help" && <HelpFaq />}
        </div>
      </Tabs>
    </div>
  );
}
