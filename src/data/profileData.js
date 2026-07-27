export const initialProfileData = {
  personalInfo: {
    name: "Wahaj Farooq",
    title: "Developer & Media Creator",
    location: "Vancouver, BC, Canada",
    tagline: "Building products with a focus on minimalism, interaction design, and high performance.",
    bioParagraphs: [
      "Developer and creator based in Vancouver. Currently working on side projects, open-source templates, and web applications.",
      "I build products with a focus on minimalism, interaction design, and high performance. I also run an aviation media channel documenting traffic at Vancouver International Airport (YVR)."
    ],
    email: "wahaj@example.com", // Wahaj can edit this in the Live Profile Editor
    statusBadge: "Available for new projects & collaborations",
    socialLinks: {
      github: "https://github.com/wahajf",
      linkedin: "https://linkedin.com/in/wahajfarooq",
      youtube: "https://youtube.com/@thatyvrspotter",
      twitter: "https://twitter.com/wahajf"
    }
  },
  stats: [
    { label: "Years Coding", value: "3+" },
    { label: "YVR Aviation Footage", value: "100+ hrs" },
    { label: "Open Source Stars", value: "250+" },
    { label: "Products Built", value: "12+" }
  ],
  skills: [
    { name: "JavaScript / TypeScript", category: "Frontend", level: 90 },
    { name: "React / Next.js", category: "Frontend", level: 92 },
    { name: "HTML5 / Modern CSS", category: "Frontend", level: 95 },
    { name: "Node.js & APIs", category: "Backend", level: 85 },
    { name: "UI/UX & Minimalism", category: "Design", level: 95 },
    { name: "Git & GitHub Workflow", category: "Tools", level: 90 },
    { name: "Video Editing & Production", category: "Media", level: 88 },
    { name: "Telephoto & Aviation Spotting", category: "Media", level: 92 }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Independent Developer",
      organization: "Self-Employed",
      period: "2025 – Present",
      location: "Vancouver, BC",
      description: "Designing and building high-performance web apps, minimalist templates, and developer tooling.",
      highlights: ["Built lightweight aesthetic web templates", "Focused on micro-interactions and performance optimization"]
    },
    {
      id: "exp-2",
      role: "Media Creator & Aviation Spotter",
      organization: "@thatyvrspotter",
      period: "2024 – Present",
      location: "Vancouver International Airport (YVR)",
      description: "Filming, editing, and curating high-definition aviation videography showcasing aircraft movements at YVR airport.",
      highlights: ["Grew channel community of aviation enthusiasts", "Captured rare commercial and cargo aircraft operations"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "@thatyvrspotter",
      category: "Aviation Media",
      period: "2024 – Present",
      description: "A dedicated aviation media channel documenting daily flight operations, landings, heavy departures, and special liveries at Vancouver International Airport.",
      youtubeId: "JSh_f35lJnQ",
      youtubeUrl: "https://youtu.be/JSh_f35lJnQ",
      tags: ["Videography", "YVR Airport", "Aviation", "YouTube"],
      featured: true,
      githubUrl: "",
      liveUrl: "https://youtube.com/@thatyvrspotter"
    },
    {
      id: "proj-2",
      title: "Minimal Site Template",
      category: "Web Development",
      period: "2026",
      description: "An ultra-clean, Apple-inspired personal portfolio template with light/dark theme switching, fluid typography, and dynamic video preview popups.",
      youtubeId: "",
      tags: ["JavaScript", "HTML5", "Minimal CSS", "UX Design"],
      featured: true,
      githubUrl: "https://github.com/wahajf",
      liveUrl: "https://wahajf.github.io/wahajfarooq/"
    },
    {
      id: "proj-3",
      title: "YVR Flight Radar & Traffic Observer",
      category: "Side Project",
      period: "2025",
      description: "A real-time flight dashboard concept tracking inbound aircraft schedules, runway active modes, and aircraft liveries for YVR spotters.",
      youtubeId: "",
      tags: ["React", "API Integration", "Tailwind/CSS", "Maps"],
      featured: false,
      githubUrl: "https://github.com/wahajf",
      liveUrl: ""
    }
  ]
};
