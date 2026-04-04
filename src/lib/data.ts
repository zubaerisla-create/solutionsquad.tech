import type { Project, Service, Testimonial, TechItem, TeamMember } from "@/types";

export const PROJECTS: Project[] = [

  
      {
    id: "1",
    title: "Full-Stack LMS Platform",
    description: "Robust LMS with course creation, Stripe payments, and RBAC. Admin: admin@lms.com | Pass: admin12",
    image: "https://github.com/nayeem-miah/nayeem/blob/main/public/lms1.png?raw=true",
    category: "web",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    githubUrl: "",
    liveUrl: "https://learening-management-system.vercel.app",
    tech: ["Next.js 16", "NestJS", "React 19", "Tailwind 4", "MongoDB", "Stripe", "Redux"]
  },
 

  {
    id: "2",
    title: "Quick Buzz E-Commerce",
    description: "A high-performance e-commerce platform tailored for the local market with integrated payment gateways and smooth UX.",
    image: "https://github.com/nayeem-miah/nayeem/blob/main/public/p1.png?raw=true",
    category: "web",
    gradient: "from-cyan-500/20 to-sky-500/20",
    githubUrl: "",
    liveUrl: "https://quick-bus-bd.web.app/",
    tech: ["TypeScript", "React.js", "Node.js", "Express.js", "Firebase", "MongoDB"]
  },
   {
    id: "3",
    title: "Parcel Delivery System",
    description: "A secure and role-based Parcel Delivery system for Senders, Receivers, and Admins to manage parcels seamlessly.",
   image: "https://i.ibb.co.com/4nX7Gt4n/Gemini-Generated-Image-n2j222n2j222n2j2.png",
    category: "web",
    gradient: "from-indigo-500/20 to-blue-500/20",
    githubUrl: "",
    liveUrl: "https://parcel-delevary-client.vercel.app",
    tech: ["TypeScript", "React.js", "Redux Toolkit", "RTK Query", "Node.js", "Express.js", "MongoDB"]
  },

  {
    id: "4",
    title: "SPARTST",
    description:
      "SaaS platform for content creators with AI-powered editing tools, analytics, and multi-platform publishing.",
    category: "web",
    tech: ["Next.js", "TypeScript", "Prisma", "OpenAI", "Vercel"],
    image: "https://i.ibb.co.com/JW7q3tpS/cd013058-6dc4-4c20-9db2-83cbd7e6b8f0.jpg",
    gradient: "from-cyan-500/20 to-blue-500/20",
    liveUrl: "https://celis-client.vercel.app/home",
    githubUrl: "#",
  },
    {
    id: "5",
    title: "Restuarant App",
    description:
      "A comprehensive, tech-driven restaurant ecosystem that optimizes the car-based pickup journey through real-time arrival alerts, mobile-first ordering, and secure QR-code verification.",
    category: "mobile",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
    image: "https://i.ibb.co.com/ZRfmJyDV/Gemini-Generated-Image-8sqsd68sqsd68sqs.png",
    gradient: "from-pink-500/20 to-rose-500/20",
    liveUrl: "https://drive.google.com/drive/u/0/folders/1k776N7KOtc6B15p5PYKh7D_c2U0Xd8w4",
    githubUrl: "#",
  },
  {
    id: "6",
    title: "Ai Financial App",
    description:
      "An intelligent financial management platform that leverages AI to provide personalized insights, automated budgeting, and smart investment recommendations to help users achieve their financial goals.",
    category: "mobile",
    tech: ["Node.js", "Express", "JWT", "Redis", "Docker"],
    image: "https://i.ibb.co.com/0VcsPgnT/Gemini-Generated-Image-uule0uule0uule0u.png",
    gradient: "from-lime-500/20 to-green-500/20",
    liveUrl: "https://drive.google.com/drive/folders/1-Qp45QRb88UIunyPCK8KH-EOfHDf5oyY?dmr=1&ec=wgc-drive-globalnav-goto",
    githubUrl: "#",
  },

];

export const SERVICES: Service[] = [
  {
    id: "mobile",
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Native-quality cross-platform apps that users love — built with React Native and Flutter for iOS and Android.",
    features: [
      "React Native & Flutter",
      "Offline-first architecture",
      "Push notifications & deep linking",
      "App Store & Play Store deployment",
      "Performance profiling & optimization",
    ],
    gradient: "from-teal-500 to-emerald-500",
    accent: "#14b8a6",
  },
  {
    id: "web",
    icon: "🌐",
    title: "Web & Frontend Development",
    description:
      "Blazing fast, accessible, and beautifully crafted web experiences with Next.js and React at the core.",
    features: [
      "Next.js & React",
      "Server-side & static rendering",
      "Responsive & accessible UI",
      "SEO optimization",
      "Performance & Core Web Vitals",
    ],
    gradient: "from-violet-500 to-purple-500",
    accent: "#8b5cf6",
  },
  {
    id: "backend",
    icon: "⚙️",
    title: "Backend & Software Development",
    description:
      "Scalable, reliable APIs and microservices built for growth — from startup MVPs to enterprise systems.",
    features: [
      "NestJS, Node.js & FastAPI",
      "RESTful & GraphQL APIs",
      "Microservices & event-driven",
      "Database design & optimization",
      "CI/CD & DevOps integration",
    ],
    gradient: "from-orange-500 to-amber-500",
    accent: "#f97316",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "NovaTech Inc.",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah",
    rating: 5,
    text: "Solution Sqauad delivered our mobile app 2 weeks ahead of schedule. The code quality and attention to UX details exceeded our expectations. Our users love the performance.",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Founder",
    company: "FinEdge",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Marcus",
    rating: 5,
    text: "The backend they built handles our peak loads of 500k requests per minute flawlessly. Their NestJS expertise and architecture decisions saved us months of tech debt.",
  },
  {
    id: "3",
    name: "Amara Osei",
    role: "Product Manager",
    company: "StyleHub",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Amara",
    rating: 5,
    text: "Our Next.js storefront conversion rate jumped 34% after their optimization work. They truly understand the intersection of design, performance, and business impact.",
  },
  {
    id: "4",
    name: "James Liu",
    role: "VP Engineering",
    company: "LogiCore",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=James",
    rating: 5,
    text: "Seamless collaboration from day one. They integrated perfectly with our team, shipped on time, and the Flutter app they built has a 4.9-star rating. Highly recommend.",
  },
];

export const TECH_STACK: TechItem[] = [
  { name: "React Native", icon: "⚛️", category: "Mobile", color: "#61DAFB" },
  { name: "Flutter", icon: "🐦", category: "Mobile", color: "#54C5F8" },
  { name: "Next.js", icon: "▲", category: "Web", color: "#ffffff" },
  { name: "React", icon: "⚛", category: "Web", color: "#61DAFB" },
  { name: "TypeScript", icon: "TS", category: "Language", color: "#3178C6" },
  { name: "NestJS", icon: "🐈", category: "Backend", color: "#E0234E" },
  { name: "Node.js", icon: "🟢", category: "Backend", color: "#339933" },
  { name: "Express", icon: "🚂", category: "Backend", color: "#ffffff" },
  { name: "FastAPI", icon: "⚡", category: "Backend", color: "#009688" },
  { name: "PostgreSQL", icon: "🐘", category: "Database", color: "#4169E1" },
  { name: "MongoDB", icon: "🍃", category: "Database", color: "#47A248" },
  { name: "Redis", icon: "🔴", category: "Database", color: "#DC382D" },
  { name: "Docker", icon: "🐳", category: "DevOps", color: "#2496ED" },
  { name: "Tailwind CSS", icon: "💨", category: "Web", color: "#06B6D4" },
  { name: "GraphQL", icon: "◈", category: "API", color: "#E10098" },
  { name: "Firebase", icon: "🔥", category: "Platform", color: "#FFCA28" },
];

export const TEAM: TeamMember[] = [
  {
    name: "Alex Mercer",
    role: "CEO & Lead Architect",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Alex",
    bio: "10+ years building scalable systems for Fortune 500s and startups.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Mobile",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Priya",
    bio: "React Native & Flutter expert with 50+ shipped apps.",
  },
  {
    name: "David Kim",
    role: "Lead Frontend Engineer",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=David",
    bio: "Next.js core contributor. Obsessed with performance & UX.",
  },
  {
    name: "Lena Müller",
    role: "Backend Architect",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Lena",
    bio: "Microservices & distributed systems specialist. NestJS & FastAPI.",
  },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Stack", href: "#stack" },
  { label: "Feedback", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
