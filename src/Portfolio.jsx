import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ReactTyped } from "react-typed";

// --- Simple smooth-scroll helper ---
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// --- Reusable animated section wrapper ---
const AnimatedSection = ({ id, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  </section>
);

// --- Simple chip badge ---
const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

// --- Progress bar on top while scrolling ---
const TopProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 z-50"
    />
  );
};

// --- Nav ---
const Nav = () => (
  <nav className="sticky top-0 z-40 backdrop-blur dark:bg-neutral-900/70 border-b">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <button onClick={() => scrollToId("home")} className="font-bold tracking-tight">
        Aaisha <span className="text-indigo-600">Portfolio</span>
      </button>
      <div className="hidden sm:flex gap-3">
        {[
          ["Projects", "projects"],
          ["AAISearch", "aaisearch"],
          ["Java", "java"],
          ["Experience", "experience"],
          ["Contact", "contact"],
        ].map(([label, id]) => (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            className="text-sm px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

// --- Hero ---
const Hero = () => (
  <section id="home" className="relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-indigo-500/30 via-fuchsia-500/30 to-rose-500/30 blur-3xl" />
    </div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
  <ReactTyped
    strings={[
      "Frontend Engineer",
      "Java Developer",
      "Data Science Student",
      "ML Enthusiast",
      "Cloud & Network Engineer"
    ]}
    typeSpeed={70}
    backSpeed={40}
    backDelay={900}
    loop
  />
</h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-prose"
        >
          I build fast, accessible UIs and scalable Java backends. Explore my AAISearch project, clean component systems, and hands-on DSA in Java.
        </motion.p>
        <div className="mt-6 flex gap-3">
          <a href="#aaisearch" onClick={(e)=>{e.preventDefault();scrollToId('aaisearch')}} className="px-5 py-2.5 rounded-xl bg-indigo-600 font-medium shadow">
            See AAISearch Case Study
          </a>
          <a href="#projects" onClick={(e)=>{e.preventDefault();scrollToId('projects')}} className="px-5 py-2.5 rounded-xl border font-medium">
            All Projects
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["React","Vite","Tailwind","Framer Motion","TypeScript","Java","DSA","REST APIs"].map(t=> <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        {/* Replace src with your hero image */}
        <img
          src="/portfolioimage.png"
          alt="Aaisha Sultana — Frontend & Java"
          className="rounded-3xl shadow-2xl w-full object-contain"
        />
        
      </motion.div>
    </div>
  </section>
);

// --- AAISearch Case Study ---
const AAISearch = () => (
  <AnimatedSection id="aaisearch">
    <div className="flex items-center justify-between gap-6 flex-wrap">
      <h2 className="text-2xl sm:text-3xl font-bold">AAISearch — Full-Stack Search Engine</h2>
      <div className="flex gap-2">
        <a href="https://github.com/gitsish/AAISearch-Project" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border font-medium">GitHub</a>
        <a href="https://aaisearchengine.vercel.app/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium">Live Demo</a>
      </div>
    </div>
    <p className="text-neutral-600 dark:text-neutral-300">
      A mini Google-like search built with <b>Node/Express</b>, <b>React</b>, and an <b>inverted index</b> over fetched pages. It features query parsing, ranking (TF-IDF), caching, and result snippets with highlighted keywords.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <img src="/aaisearchprojectimage.png" alt="AAISearch UI" className="rounded-2xl border shadow" />
      <div className="space-y-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm font-semibold mb-1">Key Features</p>
          <ul className="list-disc pl-5 text-sm leading-6">
            <li>Instant search with debounced input & keyboard nav</li>
            <li>Inverted index + TF-IDF ranking for relevance</li>
            <li>Snippet generation with highlighted matches</li>
            <li>Server-side caching (LRU) & rate-limited fetcher</li>
            <li>Typed API responses, error boundaries, 404 states</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-4">
          <p className="text-sm font-semibold mb-1">Impact</p>
          <ul className="list-disc pl-5 text-sm leading-6">
            <li>p95 response under 120ms for warm cache (local)</li>
            <li>Zero-blocking UI at 60fps on mid-range devices</li>
            <li>Clean architecture → easy to extend with filters</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {["React","Node.js","Express","Vite","Tailwind","Framer Motion","Axios","LRU Cache","Vercel","Render"].map(t => (
        <div key={t} className="rounded-xl border p-3 text-sm flex items-center justify-between">
          <span>{t}</span><span className="text-xs text-neutral-500">tool</span>
        </div>
      ))}
    </div>

    <div className="mt-6 rounded-2xl border p-4">
      <p className="text-sm font-semibold mb-1">Design Decisions</p>
      <ul className="list-disc pl-5 text-sm leading-6">
        <li>Chose inverted index + TF-IDF for explainable relevance over opaque vector search for small corpora</li>
        <li>Client keeps UI state minimal; heavy lifting on API for determinism</li>
        <li>Deploy split: UI on Vercel (edge), API on Render (autoscale)</li>
      </ul>
    </div>
  </AnimatedSection>
);
// --- Java Skills ---
const JavaSkills = () => (
  <AnimatedSection id="java">
    <h2 className="text-2xl sm:text-3xl font-bold">Java — Core Skills</h2>

    <div className="mt-6 grid sm:grid-cols-2 bg-white/5 md:grid-cols-3 gap-1">
      <div className="rounded-xl border p-4 dark:bg-neutral-900/40 ">
        <p className="font-semibold ">OOP Basics</p>
        <p className="  ">Encapsulation, Inheritance, Polymorphism</p>
      </div>

      <div className="rounded-xl border p-4 bg-white/5 dark:bg-neutral-900/40">
        <p className="font-semibold">Collections</p>
        <p className="">Lists, Sets, Maps</p>
      </div>

      <div className="rounded-xl border p-4 bg-white/5 dark:bg-neutral-900/40">
        <p className="font-semibold">Exception Handling</p>
        <p className="">Try–Catch, Custom Exceptions</p>
      </div>

      <div className="rounded-xl border p-4 bg-white/5 dark:bg-neutral-900/40">
        <p className="font-semibold">Multithreading</p>
        <p className="">Threads, Synchronization basics</p>
      </div>

      <div className="rounded-xl border p-4 bg-white/5 dark:bg-neutral-900/40">
        <p className="font-semibold">Streams & Lambdas</p>
        <p className="">Functional style, map/filter/reduce</p>
      </div>

      <div className="rounded-xl border p-4 bg-white/5 dark:bg-neutral-900/40">
        <p className="font-semibold">REST APIs</p>
        <p className="">Basic Spring Boot, JSON handling</p>
      </div>
    </div>
  </AnimatedSection>
);

// --- Projects Grid ---
const Projects = () => (
  <AnimatedSection id="projects">
    <h2 className="text-2xl sm:text-3xl font-bold">Selected Projects</h2>
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: "AAISearch",
          desc: "Full-stack search with inverted index + TF-IDF.",
          img: "/aaisearchprojectimage.png",
          href: "https://aaisearchengine.vercel.app/",
        },
        {
          title: "EcoRouteAI Project",
          desc: "Last-mile route optimizer with RL baseline.",
          img: "/ecoroutingaiimage.png",
          href: "https://github.com/gitsish/AI_LAST_MILE_DELIVERY_OPTIMISER",
        },
        {
          title: "Portfolio Website",
          desc: "This site — motion, theming, and a11y.",
          img: "/portfolioimage.png",
          href: "https://aaisha-portfolio-coral.vercel.app/",
        },
        {
          title: "Network Monitor Dashboard",
          desc: "Full-stack network monitoring: active ICMP/HTTP probes, Supabase persistence, and Streamlit dashboard.",
          img: "/networkprobe.png",
          href: "https://github.com/gitsish/network-probe--api",
        },
        {
          title: "PVPSIT-College Management System Website",
          desc: "Full-stack web app to manage students, faculty, courses, and exams with secure authentication and role-based dashboards.",
          img: "/collegemanagementsystemimage.png",
          href: " https://pvpsit-project-2025.onrender.com",
        },
        {
          title: "Brain Tumor Classification (Colab)",
          desc: "Deep learning CNN model on MRI scans, deployed in Google Colab, achieving high accuracy in classifying tumor types.",
          img: "/braintumorimage.png",
          href: "https://github.com/gitsish/BrainTumorClassification-ADeepLearningProject",
        },
      ].map((p) => (
        <a key={p.title} href={p.href} target={p.href.startsWith("http")?"_blank":"_self"} rel="noreferrer" className="group rounded-2xl border overflow-hidden hover:shadow-lg transition">
          <div className="aspect-[16/10] overflow-hidden">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition"/>
          </div>
          <div className="p-4">
            <p className="font-semibold">{p.title}</p>
            <p className="bg-white/10">{p.desc}</p>
          </div>
        </a>
      ))}
    </div>
  </AnimatedSection>
);

//--- Experience / Timeline ---
const Experience = () => (
  <AnimatedSection id="experience">
    <h2 className="text-2xl sm:text-3xl font-bold">Experience & Highlights</h2>
    <div className="mt-6 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-neutral-200  bg-white/10 dark:before:bg-neutral-800">
      {[
        { time: "Aug 2025", title: "Cognizant Digital Nurture 4.0", text: "Selected  and have undergone intensive training in Java, DSA, and full-stack skills with industry projects." },
        { time: "Jul 2025", title: "EcoRouteAI — Sparkathon", text: "Built reinforcement learning baseline with visual analytics and demo pipeline." },
        { time: "May 2025", title: "AAISearch v1", text: "Developed end-to-end search engine with inverted index and TF-IDF ranking." },
        { time: "Apr 2025", title: "Brain Tumor Classification", text: "Created CNN-based deep learning model for MRI scan classification with high accuracy." },
        { time: "Mar 2025", title: "College Management System", text: "Built MERN stack app with secure role-based login and responsive dashboards." },
      ].map((e,i)=> (
        <div key={i} className="pl-12 py-4 relative">
          <div className="absolute left-[14px] mt-2 h-3 w-3 rounded-full bg-indigo-800 " />
          <p className=" bg-white/10">{e.time}</p>
          <p className="font-semibold bg-white/10">{e.title}</p>
          <p className="text-sm bg-white/10">{e.text}</p>
        </div>
      ))}
    </div>
  </AnimatedSection>
);

// --- Contact ---
const Contact = () => (
  <AnimatedSection id="contact">
    <div className="rounded-3xl border border-white/15 p-6 lg:p-10 bg-white/10 backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl font-bold">Let’s Talk</h2>
      <p className="bg-white/10 ">Open to full-time Frontend / Java roles. Based in India (IST).</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="mailto:gaaisha05@gmail.com" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow">Email</a>
        <a href="https://www.linkedin.com/in/aaisha-sultana-guduru-877b21302" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border font-medium">LinkedIn</a>
        <a href="https://github.com/gitsish" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border font-medium">GitHub</a>
      </div>
    </div>
  </AnimatedSection>
);

export default function EnhancedPortfolio() {
  useEffect(()=>{ document.documentElement.classList.add("scroll-smooth"); },[]);
  return (
    <main className="min-h-screen relative text-white">
      <TopProgress />
      <Nav />
      <Hero />
      <AAISearch />
      <JavaSkills />
      <Projects />
      <Experience />
      <Contact />
      <footer className="py-12 text-center text-sm text-neutral-500">© {new Date().getFullYear()} Aaisha Sultana — Built with React, Vite, Tailwind, Framer Motion</footer>
    </main>
  );
}
