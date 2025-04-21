**global-converter**\
_Version 0.1.0_

## Description

**Global Converter** est une application web Single-Page-Application (SPA) de conversion de devises et cryptomonnaies, construite avec Next.js App Router et stylée avec Tailwind CSS. Elle propose une interface à onglets moderne et épurée, en mode clair/sombre, responsive sur mobile et desktop, avec des animations subtiles pour fluidifier l'expérience utilisateur.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
<!-- - [Contribuer](#contribuer) -->

## Fonctionnalités

### Onglet "Convertisseur"

- Saisie du montant à convertir
- Sélecteur de devise source (par défaut **MGA** - Ariary malgache)
- Sélecteurs multiples de devises cibles (par défaut **EUR** et **USD**)
- Conversion instantanée en temps réel, supportant devises fiat et cryptomonnaies (Bitcoin, Ethereum, etc.)
- Affichage conditionnel des résultats sous forme de cartes par devise
- Gestion de l’historique et des préférences dans le `localStorage`

### Onglet "Aide & FAQ"

- Informations sur l’utilisation de l’application
- Questions fréquemment posées

### UI & UX

- Navigation par onglets dynamique
- Animations fluides lors du changement d’onglet
- Mode clair/ombré avec **next-themes**
- Design responsive (mobile & desktop)
- Animations subtiles via **tailwindcss-animate**

## Technologies

- **Next.js** (App Router)
- **React 18**
- **Tailwind CSS** + **tailwindcss-animate**
- **Radix UI** (Tabs, Select, ScrollArea, etc.)
- **Lucide-react** (icônes)
- **next-themes** pour le mode clair/obscur
- **ExchangeRate-API** pour récupérer les taux de change
- **localStorage** pour sauvegarde des préférences
- **TypeScript**

<!-- ## Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Commitez vos changements (`git commit -m "feat: ma feature"`)
4. Pushez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request -->
