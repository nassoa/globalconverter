"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Liste des devises principales
const MAIN_CURRENCIES = [
  { code: "MGA", name: "Ariary malgache" },
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "Dollar américain" },
  { code: "GBP", name: "Livre sterling" },
  { code: "JPY", name: "Yen japonais" },
  { code: "CAD", name: "Dollar canadien" },
  { code: "AUD", name: "Dollar australien" },
  { code: "CHF", name: "Franc suisse" },
  { code: "CNY", name: "Yuan chinois" },
];

// Liste des cryptomonnaies
const CRYPTO_CURRENCIES = [
  { code: "BTC", name: "Bitcoin" },
  { code: "ETH", name: "Ethereum" },
  { code: "XRP", name: "Ripple" },
  { code: "LTC", name: "Litecoin" },
  { code: "BCH", name: "Bitcoin Cash" },
  { code: "BNB", name: "Binance Coin" },
  { code: "USDT", name: "Tether" },
  { code: "DOT", name: "Polkadot" },
  { code: "ADA", name: "Cardano" },
];

// Toutes les devises
const ALL_CURRENCIES = [...MAIN_CURRENCIES, ...CRYPTO_CURRENCIES];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("MGA");
  const [toCurrencies, setToCurrencies] = useState<string[]>(["EUR", "USD"]);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [convertedAmounts, setConvertedAmounts] = useState<
    Record<string, number>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // États pour la recherche
  const [searchFromCurrency, setSearchFromCurrency] = useState<string>("");
  const [searchToCurrency, setSearchToCurrency] = useState<string>("");
  const [selectedToCurrency, setSelectedToCurrency] = useState<string>("");

  // Charger les préférences utilisateur depuis localStorage
  useEffect(() => {
    try {
      const savedFromCurrency = localStorage.getItem("fromCurrency");
      const savedToCurrencies = localStorage.getItem("toCurrencies");
      const savedAmount = localStorage.getItem("amount");

      if (savedFromCurrency) setFromCurrency(savedFromCurrency);
      if (savedToCurrencies) setToCurrencies(JSON.parse(savedToCurrencies));
      if (savedAmount) setAmount(Number(savedAmount));

      // Mettre à jour les devises disponibles
      updateAvailableCurrencies(
        savedFromCurrency || "MGA",
        savedToCurrencies ? JSON.parse(savedToCurrencies) : ["EUR", "USD"]
      );
    } catch (e) {
      console.error("Erreur lors du chargement des préférences:", e);
    }
  }, []);

  // Fonction pour récupérer les taux de change
  const fetchExchangeRates = async () => {
    if (!fromCurrency || toCurrencies.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
      console.log("API Key:", apiKey ? "Présente" : "Absente");

      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
      );

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la récupération des taux de change: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data.result);

      if (data.result === "success") {
        const newConvertedAmounts: Record<string, number> = {};

        toCurrencies.forEach((currency) => {
          if (data.conversion_rates[currency]) {
            newConvertedAmounts[currency] =
              amount * data.conversion_rates[currency];
          }
        });

        setConvertedAmounts(newConvertedAmounts);
        setLastUpdated(Date.now());
      } else {
        throw new Error(
          data.error || "Erreur lors de la récupération des taux de change"
        );
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err instanceof Error ? err.message : "Une erreur s'est produite"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer les taux de change lorsque la devise source, les devises cibles ou le montant changent
  useEffect(() => {
    fetchExchangeRates();

    // Rafraîchir les taux toutes les 30 minutes
    const intervalId = setInterval(fetchExchangeRates, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [fromCurrency, toCurrencies.join(","), amount]);

  // Mettre à jour les devises disponibles (exclure la devise source et les devises cibles déjà sélectionnées)
  const updateAvailableCurrencies = (from: string, to: string[]) => {
    const filtered = ALL_CURRENCIES.filter(
      (currency) => currency.code !== from && !to.includes(currency.code)
    ).map((currency) => currency.code);
    setAvailableCurrencies(filtered);
  };

  // Gérer le changement de devise source
  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value);
    localStorage.setItem("fromCurrency", value);
    updateAvailableCurrencies(value, toCurrencies);
  };

  // Gérer le changement de montant
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0;
    setAmount(value);
    localStorage.setItem("amount", value.toString());
  };

  // Ajouter une devise cible
  const handleAddCurrency = (value: string) => {
    if (value && !toCurrencies.includes(value)) {
      const newToCurrencies = [...toCurrencies, value];
      setToCurrencies(newToCurrencies);
      localStorage.setItem("toCurrencies", JSON.stringify(newToCurrencies));
      updateAvailableCurrencies(fromCurrency, newToCurrencies);
      setSelectedToCurrency("");
      setSearchToCurrency("");
    }
  };

  // Supprimer une devise cible
  const handleRemoveCurrency = (currency: string) => {
    const newToCurrencies = toCurrencies.filter((c) => c !== currency);
    setToCurrencies(newToCurrencies);
    localStorage.setItem("toCurrencies", JSON.stringify(newToCurrencies));
    updateAvailableCurrencies(fromCurrency, newToCurrencies);
  };

  // Formater le montant avec séparateur de milliers
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  // Obtenir le nom complet d'une devise à partir de son code
  const getCurrencyName = (code: string) => {
    const currency = ALL_CURRENCIES.find((c) => c.code === code);
    return currency ? currency.name : code;
  };

  // Filtrer les devises en fonction de la recherche
  const filterCurrencies = (
    currencies: typeof ALL_CURRENCIES,
    search: string
  ) => {
    if (!search) return currencies;

    const searchLower = search.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchLower) ||
        currency.name.toLowerCase().includes(searchLower)
    );
  };

  // Devises filtrées pour la source
  const filteredFromCurrencies = filterCurrencies(
    ALL_CURRENCIES,
    searchFromCurrency
  );

  // Devises filtrées pour les cibles
  const filteredToCurrencies = filterCurrencies(
    ALL_CURRENCIES.filter(
      (c) => c.code !== fromCurrency && !toCurrencies.includes(c.code)
    ),
    searchToCurrency
  );

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid gap-6">
          {/* Montant et devise source */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Montant</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount || ""}
                onChange={handleAmountChange}
                placeholder="Entrez un montant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-currency">Devise source</Label>
              <Select
                value={fromCurrency}
                onValueChange={handleFromCurrencyChange}
              >
                <SelectTrigger id="from-currency">
                  <SelectValue placeholder="Choisir une devise" />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex items-center px-3 pb-2 pt-1 border-b">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                      placeholder="Rechercher une devise..."
                      value={searchFromCurrency}
                      onChange={(e) => setSearchFromCurrency(e.target.value)}
                      className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {searchFromCurrency && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchFromCurrency("")}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <ScrollArea className="h-72">
                    {filteredFromCurrencies.length > 0 ? (
                      <>
                        <SelectGroup>
                          <SelectLabel>Devises principales</SelectLabel>
                          {filteredFromCurrencies
                            .filter((c) =>
                              MAIN_CURRENCIES.some((mc) => mc.code === c.code)
                            )
                            .map((currency) => (
                              <SelectItem
                                key={currency.code}
                                value={currency.code}
                              >
                                {currency.code} - {currency.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Cryptomonnaies</SelectLabel>
                          {filteredFromCurrencies
                            .filter((c) =>
                              CRYPTO_CURRENCIES.some((cc) => cc.code === c.code)
                            )
                            .map((currency) => (
                              <SelectItem
                                key={currency.code}
                                value={currency.code}
                              >
                                {currency.code} - {currency.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </>
                    ) : (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        Aucune devise trouvée
                      </div>
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Devises cibles */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Devises cibles</Label>
              {toCurrencies.length < 10 && (
                <div className="flex items-center gap-2">
                  <Select
                    onValueChange={handleAddCurrency}
                    value={selectedToCurrency}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ajouter une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="flex items-center px-3 pb-2 pt-1 border-b">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Input
                          placeholder="Rechercher une devise..."
                          value={searchToCurrency}
                          onChange={(e) => setSearchToCurrency(e.target.value)}
                          className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {searchToCurrency && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSearchToCurrency("")}
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <ScrollArea className="h-72">
                        {filteredToCurrencies.length > 0 ? (
                          <>
                            <SelectGroup>
                              <SelectLabel>Devises principales</SelectLabel>
                              {filteredToCurrencies
                                .filter((c) =>
                                  MAIN_CURRENCIES.some(
                                    (mc) => mc.code === c.code
                                  )
                                )
                                .map((currency) => (
                                  <SelectItem
                                    key={currency.code}
                                    value={currency.code}
                                  >
                                    {currency.code} - {currency.name}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Cryptomonnaies</SelectLabel>
                              {filteredToCurrencies
                                .filter((c) =>
                                  CRYPTO_CURRENCIES.some(
                                    (cc) => cc.code === c.code
                                  )
                                )
                                .map((currency) => (
                                  <SelectItem
                                    key={currency.code}
                                    value={currency.code}
                                  >
                                    {currency.code} - {currency.name}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </>
                        ) : (
                          <div className="py-6 text-center text-sm text-muted-foreground">
                            {availableCurrencies.length === 0
                              ? "Toutes les devises sont déjà sélectionnées"
                              : "Aucune devise trouvée"}
                          </div>
                        )}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleAddCurrency(selectedToCurrency)}
                    disabled={!selectedToCurrency}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {toCurrencies.map((currency) => (
                <Badge key={currency} variant="outline" className="py-2 px-3">
                  {currency} - {getCurrencyName(currency)}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2 -mr-1"
                    onClick={() => handleRemoveCurrency(currency)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            {/* Résultats de conversion */}
            <div className="space-y-4 mt-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Chargement des taux de change...</span>
                </div>
              ) : error ? (
                <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                  {error}
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {toCurrencies.map((currency) => (
                      <Card key={currency} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{currency}</div>
                            <Badge variant="outline">
                              {getCurrencyName(currency)}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold">
                            {convertedAmounts[currency]
                              ? formatAmount(convertedAmounts[currency])
                              : "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            1 {fromCurrency} ={" "}
                            {convertedAmounts[currency]
                              ? formatAmount(
                                  convertedAmounts[currency] / amount
                                )
                              : "N/A"}{" "}
                            {currency}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {lastUpdated && (
                    <div className="text-xs text-muted-foreground text-right mt-2">
                      Dernière mise à jour:{" "}
                      {new Date(lastUpdated).toLocaleString()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
