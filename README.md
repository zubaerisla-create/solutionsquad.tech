# Solution Sqauad — Portfolio Website

A modern, professional single-page portfolio for a software development company built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+
- npm or yarn or pnpm

### Installation

```bash
# Clone or extract the project
cd devcraft-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Folder Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, theme, navbar, footer)
│   ├── page.tsx                # Home page (all sections)
│   ├── globals.css             # Global styles & design tokens
│   ├── about/page.tsx          # Standalone About page
│   ├── services/page.tsx       # Standalone Services page
│   ├── portfolio/page.tsx      # Standalone Portfolio page
│   ├── contact/page.tsx        # Standalone Contact page
│   └── not-found.tsx           # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with active section tracking
│   │   └── Footer.tsx          # Footer with links & socials
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx     # Animated hero with parallax & stats
│   │   ├── AboutSection.tsx    # Company story, values & team
│   │   ├── ServicesSection.tsx # 3 service cards with hover effects
│   │   ├── PortfolioSection.tsx# Filterable projects + detail modal
│   │   ├── TechStackSection.tsx# Marquee + categorized tech grid
│   │   ├── TestimonialsSection.tsx # Reviews carousel
│   │   └── ContactSection.tsx  # Contact form + info
│   │
│   └── ui/
│       ├── ThemeProvider.tsx   # next-themes wrapper
│       ├── ThemeToggle.tsx     # Dark/light mode toggle button
│       ├── CustomCursor.tsx    # Custom animated cursor (desktop)
│       └── SectionHeader.tsx   # Reusable section title component
│
├── hooks/
│   └── useScrollAnimation.ts  # Intersection Observer + Framer Motion hook
│
├── lib/
│   ├── data.ts                 # All content data (projects, services, team…)
│   └── utils.ts                # cn() helper + animation variants
│
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Dark Mode** | Default dark, toggleable to light via `next-themes` |
| **Framer Motion** | Page load, scroll-triggered, hover, and layout animations |
| **Custom Cursor** | Animated dual-ring cursor on desktop |
| **Filter Tabs** | Portfolio filtered by All / Mobile / Web / Backend |
| **Project Modal** | Click any project card for a detail overlay |
| **Marquee** | Auto-scrolling tech stack rows |
| **Testimonials** | Clickable carousel with dot navigation |
| **Contact Form** | Fully controlled form with loading + success state |
| **Responsive** | Mobile-first, works on all screen sizes |
| **SEO** | Metadata on every page |

---

## 🎨 Design System

### Colors
- **Brand**: `#14b8a6` (teal-500)
- **Accent**: `#8b5cf6` (violet-500)
- **Dark background**: `#080c10`

### Fonts
- **Display / Headings**: Syne (Google Fonts)
- **Body**: DM Sans (Google Fonts)
- **Code / Labels**: JetBrains Mono (Google Fonts)

---

## 🛠 Customization

1. **Content** — Edit `src/lib/data.ts` to update projects, services, team, and testimonials.
2. **Colors** — Adjust `tailwind.config.ts` color palette and `globals.css` CSS variables.
3. **Fonts** — Swap fonts in `src/app/layout.tsx`.
4. **Sections** — Each section is a standalone component in `src/components/sections/`.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🔧 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Framer Motion v11**
- **next-themes** — dark/light mode
- **react-intersection-observer** — scroll triggers
