export interface Project {
  id: string;
  title: string;
  description: string;
  category: "mobile" | "web" | "backend";
  tech: string[];
  image: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  accent: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: string;
  color: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}
