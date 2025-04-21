"use client"

import { useState, useEffect } from "react"

interface ConversionResult {
  convertedAmounts: Record<string, number>
  isLoading: boolean
  error: string | null
  lastUpdated: number | null
}

export function useCurrencyConverter(amount: number, fromCurrency: string, toCurrencies: string[]): ConversionResult {
  const [convertedAmounts, setConvertedAmounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [rates, setRates] = useState<Record<string, number>>({})

  // Fonction pour récupérer les taux de change
  const fetchExchangeRates = async () => {
    if (!fromCurrency || toCurrencies.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      // Utilisons directement la clé d'API
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY
      console.log("API Key:", apiKey ? "Présente" : "Absente")

      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des taux de change: ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response:", data.result)

      if (data.result === "success") {
        setRates(data.conversion_rates)
        setLastUpdated(Date.now())
      } else {
        throw new Error(data.error || "Erreur lors de la récupération des taux de change")
      }
    } catch (err) {
      console.error("API Error:", err)
      setError(err instanceof Error ? err.message : "Une erreur s'est produite")
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer les taux de change lorsque la devise source ou les devises cibles changent
  useEffect(() => {
    fetchExchangeRates()

    // Rafraîchir les taux toutes les 30 minutes
    const intervalId = setInterval(fetchExchangeRates, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [fromCurrency, toCurrencies.join(",")])

  // Calculer les montants convertis lorsque les taux, le montant ou les devises changent
  useEffect(() => {
    if (Object.keys(rates).length > 0 && amount > 0) {
      const newConvertedAmounts: Record<string, number> = {}

      toCurrencies.forEach((currency) => {
        if (rates[currency]) {
          newConvertedAmounts[currency] = amount * rates[currency]
        }
      })

      setConvertedAmounts(newConvertedAmounts)
    }
  }, [rates, amount, toCurrencies])

  return { convertedAmounts, isLoading, error, lastUpdated }
}
