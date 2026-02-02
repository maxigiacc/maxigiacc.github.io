export const site = {
  name: "Massimo Giaccone",
  email: "giacconemassimo@gmail.com",
  linkedin: "https://www.linkedin.com/in/massimo-giaccone-97493025a/",
  cvUrl: "./res/Curriculum_en_2025.pdf",
};

export const navItems = [
  { label: "Home", href: "./index.html", page: "home" },
  { label: "Competenze", href: "./competenze.html", page: "skills" },
  { label: "Esperienze", href: "./esperienze.html", page: "experience" },
  { label: "Formazione", href: "./formazione.html", page: "education" },
  { label: "Progetti", href: "./progetti.html", page: "projects" },
  { label: "Contatti", href: "./contatti.html", page: "contact" },
];

export const heroStats = [
  { value: "2024", label: "Laurea triennale" },
  { value: "2025", label: "Erasmus • Odense" },
  { value: "EN", label: "Inglese avanzato" },
];

export const profilePoints = [
  "Mobile development con Java, Kotlin e Flutter",
  "Web technologies: HTML, CSS, JavaScript, React",
  "Data processing e prototipi con Python",
];

export const focusAreas = [
  {
    title: "Mobile first",
    description: "App fluide e solide con Flutter, Kotlin e attenzione alla UX mobile.",
  },
  {
    title: "Web moderno",
    description: "Interfacce reattive con HTML, CSS, JavaScript e React.",
  },
  {
    title: "AI e dati",
    description: "Interesse costante per l'intelligenza artificiale e prototipi utili.",
  },
];

export const cvHighlights = [
  "Erasmus (Set 2025 - Gen 2026) — University of Southern Denmark",
  "Instructor AI & Programming (Mar - Ago 2025) — CNA Emilia Romagna",
  "Intern Web App (Lug - Ago 2023) — MMG Service SRL",
];

export const skillFilters = [
  { label: "Tutte", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "Web", value: "web" },
  { label: "Core", value: "core" },
  { label: "AI & Data", value: "ai" },
];

export const skills = [
  {
    title: "Java",
    description: "Solida base per applicazioni Android e logica applicativa.",
    level: "Avanzato",
    tags: ["mobile", "core"],
  },
  {
    title: "Kotlin",
    description: "Android moderno con attenzione a performance e design system.",
    level: "Avanzato",
    tags: ["mobile"],
  },
  {
    title: "Flutter",
    description: "Cross-platform rapido, prototipi veloci e interfacce curate.",
    level: "Avanzato",
    tags: ["mobile"],
  },
  {
    title: "C",
    description: "Fondamenti di programmazione, memoria e strutture dati.",
    level: "Avanzato",
    tags: ["core"],
  },
  {
    title: "HTML & CSS",
    description: "Markup semantico, layout responsivi e animazioni leggere.",
    level: "Intermedio",
    tags: ["web"],
  },
  {
    title: "JavaScript",
    description: "Interazioni, componenti dinamici e integrazioni UI.",
    level: "Intermedio",
    tags: ["web"],
  },
  {
    title: "React",
    description: "Componenti modulari, routing e stato condiviso.",
    level: "Intermedio",
    tags: ["web"],
  },
  {
    title: "Python",
    description: "Scripting, prototipi web e sperimentazione su dati.",
    level: "Intermedio",
    tags: ["web", "ai"],
  },
];

export const languages = [
  { title: "Italiano", description: "Madrelingua." },
  { title: "Inglese", description: "Livello avanzato." },
];

export const experiences = [
  {
    date: "Mar - Ago 2025",
    title: "Instructor — Programming & Artificial Intelligence",
    description: "CNA Emilia Romagna. Docenza su programmazione e AI con focus pratico.",
  },
  {
    date: "Lug - Ago 2023",
    title: "Intern — Web Application Development",
    description: "MMG Service SRL. Supporto allo sviluppo di una webapp per la gestione dei flussi di uscita.",
  },
  {
    date: "Lug - Set 2020",
    title: "Website Management Intern",
    description: "MMG Service SRL. Manutenzione del sito aziendale e aggiornamento contenuti.",
  },
];

export const education = [
  {
    date: "Set 2024 - Dic 2026",
    title: "Laurea Magistrale in Ingegneria Informatica",
    description: "Universita di Bologna — Alma Mater Studiorum.",
  },
  {
    date: "Set 2025 - Gen 2026",
    title: "Erasmus Exchange Program",
    description: "University of Southern Denmark, Odense.",
  },
  {
    date: "Set 2021 - Dic 2024",
    title: "Laurea Triennale in Ingegneria Informatica",
    description: "Universita di Bologna — Alma Mater Studiorum.",
  },
  {
    date: "2021",
    title: "Diploma di Maturita Scientifica",
    description: "Liceo Enrico Fermi, Ragusa.",
  },
];

export const cvProjects = [
  {
    type: "IoT",
    title: "IoT Event Tracking Solution",
    description: "Soluzione per il tracciamento di eventi con stack mobile e LoRa.",
    tags: ["Flutter", "LoRa", "Python"],
  },
  {
    type: "Mobile",
    title: "MyTable — Smart Restaurant Ordering App",
    description: "App Android per l'ordinazione smart con backend real-time.",
    tags: ["Kotlin", "Firebase", "Android"],
  },
  {
    type: "AI",
    title: "AI Agent for Tablut Board Game",
    description: "Agente di gioco basato su algoritmi di ricerca e AI.",
    tags: ["Python", "Game AI"],
  },
  {
    type: "Data Science",
    title: "Income Classification",
    description: "Classificazione con tecniche di machine learning supervisionato.",
    tags: ["Pandas", "Scikit-learn"],
  },
  {
    type: "Data Viz",
    title: "Optimizing the Formula 1 Calendar",
    description: "Data visualization per analizzare logistica e calendario F1.",
    tags: ["Plotly", "Matplotlib"],
  },
  {
    type: "XR / AR",
    title: "XR/AR Learning Environments",
    description: "Ambienti immersivi per la didattica con Unity.",
    tags: ["Unity"],
  },
  {
    type: "ML",
    title: "Applied Machine Learning Project",
    description: "Sperimentazioni ML con pipeline end-to-end.",
    tags: ["TensorFlow"],
  },
];

export const detailProjects = [
  {
    title: "IoT Event Tracking Solution",
    summary: "Soluzione per il tracciamento di eventi con stack mobile e integrazione LoRa.",
    points: ["Stack: Flutter, LoRa, Python", "Focus: IoT, raccolta dati, visualizzazione"],
  },
  {
    title: "MyTable — Smart Restaurant Ordering App",
    summary: "App Android per ordinazioni smart con backend real-time.",
    points: ["Stack: Kotlin (Android), Firebase", "Focus: UX in sala, rapidita, affidabilita"],
    link: "./res/MyTable.pdf",
  },
  {
    title: "AI Agent for Tablut Board Game",
    summary: "Agente di gioco basato su algoritmi di ricerca e tecniche di AI.",
    points: ["Stack: Python, Search Algorithms", "Focus: game AI e ottimizzazione mosse"],
  },
  {
    title: "Income Classification (Data Science & ML)",
    summary: "Classificazione supervisionata con pipeline di data processing.",
    points: ["Stack: Pandas, Scikit-learn", "Focus: feature engineering e valutazione modelli"],
  },
  {
    title: "Optimizing the Formula 1 Calendar",
    summary: "Data visualization per analizzare logistica e calendario F1.",
    points: ["Stack: Plotly, Matplotlib", "Focus: insight visivi e ottimizzazione"],
  },
];

export const pdfProjects = [
  {
    type: "Tesi triennale",
    title: "Smart City e IoT (LoRa)",
    description: "Approfondimento sul tracciamento di oggetti mobili con tecnologie LoRa.",
    tags: ["LoRa", "IoT", "Smart City"],
    url: "./res/Smart-City-e-IoT-Tracciamento-di-Oggetti-Mobili-con-LoRa.pdf",
    cta: "Apri PDF",
  },
  {
    type: "Tesi completa",
    title: "Tesi Massimo Giaccone",
    description: "Documento completo con analisi, risultati e conclusioni.",
    tags: ["Ricerca", "Analisi"],
    url: "./res/Tesi_Massimo_Giaccone.pdf",
    cta: "Leggi PDF",
  },
  {
    type: "Progetto",
    title: "MyTable",
    description: "Documento di progetto con focus su organizzazione e workflow.",
    tags: ["Product", "Workflow"],
    url: "./res/MyTable.pdf",
    cta: "Apri PDF",
  },
];
