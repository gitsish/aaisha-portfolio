// Portfolio.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// --- Simple smooth-scroll helper ---
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// --- Tiny Typewriter (no external deps) ---
const Typewriter = ({ strings = [], typeSpeed = 70, backSpeed = 40, backDelay = 900, loop = true }) => {
  const [text, setText] = useState("");
  const si = useRef(0); // string index
  const pi = useRef(0); // char position
  const deleting = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const current = strings[si.current] || "";
      if (!deleting.current) {
        // typing
        if (pi.current < current.length) {
          pi.current += 1;
          setText(current.slice(0, pi.current));
          timeoutRef.current = setTimeout(tick, typeSpeed);
        } else {
          // finished typing
          deleting.current = true;
          timeoutRef.current = setTimeout(tick, backDelay);
        }
      } else {
        // deleting
        if (pi.current > 0) {
          pi.current -= 1;
          setText(current.slice(0, pi.current));
          timeoutRef.current = setTimeout(tick, Math.max(20, backSpeed));
        } else {
          // finished deleting
          deleting.current = false;
          si.current = (si.current + 1) % strings.length;
          timeoutRef.current = setTimeout(tick, Math.max(80, typeSpeed / 2));
          if (!loop && si.current === 0) {
            // stop if not looping
            clearTimeout(timeoutRef.current);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 500);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strings.join("|"), typeSpeed, backSpeed, backDelay, loop]);

  return <span>{text}<span className="inline-block w-[9px] h-[1.1em] align-middle ml-1 bg-white/80 animate-pulse" /></span>;
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
          ["Network Monitor", "networkmonitor"],
          ["AAISearch", "aaisearch"],
          ["Cloud & Networking", "networking"],
          ["Experience", "experience"],
           ["Certifications", "Certifications"],
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
          <Typewriter
            strings={[
              "Software Engineer",
              "Cloud Network Engineer",
              "Frontend Engineer",
              "Java Developer",
              "Data Science Student",
              "ML Enthusiast",
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
          I build resilient cloud & network systems, fast accessible UIs and scalable Java backends. Explore the Network Monitor Dashboard case study and other projects below.
        </motion.p>
        <div className="mt-6 flex gap-3">
          <a
            href="#networkmonitor"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("networkmonitor");
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 font-medium shadow"
          >
            See Network Monitor Case Study
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("projects");
            }}
            className="px-5 py-2.5 rounded-xl border font-medium"
          >
            All Projects
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Cloud", "Networking", "React", "Vite", "Tailwind", "Framer Motion", "Java", "DSA"].map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        {/* Replace src with your hero image */}
        <img src="/portfolioimage.png" alt="Aaisha Sultana — Cloud & Network Engineer" className="rounded-3xl shadow-2xl w-full object-contain" />
      </motion.div>
    </div>
  </section>
);

// --- Network Monitor Case Study ---
const NetworkMonitor = () => (
  <AnimatedSection id="networkmonitor">
    <div className="flex items-center justify-between gap-6 flex-wrap">
      <h2 className="text-2xl sm:text-3xl font-bold">Network Monitor Dashboard — Case Study</h2>
      <div className="flex gap-2">
        <a href="https://github.com/gitsish/network-probe--api/blob/main/README.md" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border font-medium">
          GitHub
        </a>
        <a
          href="https://github.com/gitsish/NetworkMonitor/blob/main/README.m"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium"
        >
          Project
        </a>
      </div>
    </div>

    <p className="text-neutral-600 dark:text-neutral-300">
      A network monitoring dashboard: active ICMP & HTTP probes, persistence in Supabase, historical playback and a Streamlit dashboard with optional globe visualization.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <img src="/networkprobe.png" alt="Network Monitor UI" className="rounded-2xl border shadow" />
      <div className="space-y-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm font-semibold mb-1">Key Features</p>
          <ul className="list-disc pl-5 text-sm leading-6">
            <li>Active ICMP & HTTP probes with configurable intervals</li>
            <li>Supabase-backed persistence & per-user data</li>
            <li>Historical playback, CSV backfills, and latency heatmaps</li>
            <li>Optional globe visualization loaded lazily to avoid import-time crashes</li>
            <li>Streamlit frontend for quick observability dashboards</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-4">
          <p className="text-sm font-semibold mb-1">Impact</p>
          <ul className="list-disc pl-5 text-sm leading-6">
            <li>Enables quick detection of network degradation and packet loss</li>
            <li>Persistent historical data for incident investigation</li>
            <li>Easy deployment on Railway / Render with a Procfile</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-6 grid md:grid-cols-3 gap-4">
      {["Python", "Streamlit", "Supabase", "ICMP", "HTTP Probing", "Railway", "Prometheus (optional)"].map((t) => (
        <div key={t} className="rounded-xl border p-3 text-sm flex items-center justify-between">
          <span>{t}</span>
          <span className="text-xs text-neutral-500">tool</span>
        </div>
      ))}
    </div>

    <div className="mt-6 rounded-2xl border p-4">
      <p className="text-sm font-semibold mb-1">Design Decisions</p>
      <ul className="list-disc pl-5 text-sm leading-6">
        <li>Separate ingestion (probe runners) from visualization to scale independently</li>
        <li>Use Supabase for quick auth + persistence without managing infra</li>
        <li>Lazy-load heavy visual modules (globe) to avoid import-time failures on deploy</li>
      </ul>
    </div>
  </AnimatedSection>
);

// --- Networking Skills ---
const NetworkingSkills = () => (
  <AnimatedSection id="networking">
    <h2 className="text-2xl sm:text-3xl font-bold">Cloud & Networking — Core Skills</h2>

    <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <div className="rounded-xl border p-4">
        <p className="font-semibold">Networking Fundamentals</p>
        <p className="text-sm">OSI model, TCP/IP, Ethernet</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="font-semibold">IP Addressing</p>
        <p className="text-sm">Subnetting, CIDR, IPv4/IPv6</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="font-semibold">Routing & Switching</p>
        <p className="text-sm">Static routes, VLANs, basic routing</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="font-semibold">Cloud Networking</p>
        <p className="text-sm">VPC, VPN, peering, security groups</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="font-semibold">Network Security</p>
        <p className="text-sm">Firewalls, ACLs, basic IDS/IPS concepts</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="font-semibold">Monitoring & Observability</p>
        <p className="text-sm">Prometheus, logs, alerting basics</p>
      </div>
    </div>
  </AnimatedSection>
);

/* -----------------------------
   SkillsFloating Component
   ----------------------------- */
const SKILL_GROUPS = [
  {
    title: "Software Development",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "Postgres", "Next.js", "Vite", "Webpack"],
  },
  {
    title: "Cloud & Networking",
    skills: ["AWS", "GCP", "Azure", "VPC", "Subnetting", "VPN", "Load Balancing", "CloudFormation", "Terraform"],
  },
  {
    title: "AI / ML",
    skills: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "MLOps", "Data Pipelines", "Model Deployment"],
  },
  {
    title: "DSA",
    skills: ["Arrays", "Graphs", "DP", "Greedy", "Trees", "Heaps", "Two Pointers", "Sliding Window"],
  },
  {
    title: "Data Engineering",
    skills: ["ETL", "Airflow", "Kafka", "Spark", "Snowflake", "BigQuery", "Data Modeling"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "TimescaleDB", "Indexing", "Query Optimization"],
  },
  {
    title: "DevOps & CI/CD",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "Jenkins", "CI/CD Pipelines", "Helm"],
  },
  {
    title: "Observability",
    skills: ["Prometheus", "Grafana", "ELK Stack", "Jaeger", "Logging", "Alerting", "SLO/SLI"],
  },
  {
    title: "Security",
    skills: ["OAuth2", "JWT", "WAF", "Firewall", "TLS/HTTPS", "Security Best Practices", "OWASP"],
  },
  {
    title: "Mobile & Frontend",
    skills: ["React Native", "Flutter", "Responsive UI", "Accessibility (a11y)", "Tailwind", "CSS-in-JS"],
  },
  {
    title: "Computer Vision",
    skills: ["OpenCV", "CNNs", "Image Augmentation", "Object Detection", "Segmentation"],
  },
  {
    title: "Natural Language Processing",
    skills: ["Transformers", "spaCy", "Text Preprocessing", "Sentiment Analysis", "Tokenization"],
  },
  {
    title: "Testing & Quality",
    skills: ["Jest", "React Testing Library", "PyTest", "Unit Tests", "Integration Tests", "E2E (Cypress)"],
  },
  {
    title: "Distributed Systems",
    skills: ["CAP Theorem", "Consensus (Raft/Paxos)", "Message Queues", "Event-driven Design"],
  },
  {
    title: "Tools & Productivity",
    skills: ["Git", "VS Code", "Postman", "Figma", "Notion", "Slack", "Linux CLI"],
  },
  {
    title: "Soft Skills",
    skills: ["System Design", "Product Thinking", "Mentoring", "Technical Writing", "Agile/Scrum"],
  },
];

/* -----------------------------
  Improved SkillsFloating - fade-in / fade-out bubbles
  ----------------------------- */

const generateFloatProps = (index) => {
  const delayBase = (index % 8) * 0.12;
  const size = 0.9 + (index % 5) * 0.08;
  const xRange = [-28, 28];
  const yRange = [-14, 14];

  // randomize motion to avoid perfect sync
  const rand = (n) => Math.random() * n;
  return {
    initial: { x: 0, y: 0, scale: 0.98 },
    animateXY: {
      x: [
        xRange[0] * (0.6 + rand(0.8)),
        xRange[1] * (0.6 + rand(0.8)),
        xRange[0] * (0.6 + rand(0.8)),
      ],
      y: [
        yRange[0] * (0.6 + rand(0.8)),
        yRange[1] * (0.6 + rand(0.8)),
        yRange[0] * (0.6 + rand(0.8)),
      ],
      rotate: [-3 + rand(6), 3 - rand(6), -2 + rand(4)],
      scale: [0.98, 1.03, 0.99],
    },
    motionTransition: {
      duration: 10 + Math.random() * 8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delayBase,
    },
    styleScale: size,
    // opacity animation params are added in Bubble
  };
};

const Bubble = ({ label, index, visibleProbability = 0.55 }) => {
  const props = generateFloatProps(index);

  // decide base delay & duration for opacity cycle
  const opacityDelay = (index % 7) * 0.25 + Math.random() * 2.2; // spread starting times
  const opacityDuration = 6 + Math.random() * 6; // how long one appear/disappear cycle lasts

  // probability tweak: lower value -> fewer bubbles visible on average
  // we still animate opacity for all, but scale the visible plateau
  const visiblePlateau = visibleProbability; // 0..1 - higher = longer visible phase
  // map to time fractions for keyframes (0..1)
  // We'll produce keyframe times [0, tOnStart, tOnEnd, 1] where visible plateau lives between tOnStart and tOnEnd
  const tOnStart = 0.12 + (1 - visiblePlateau) * 0.35 * Math.random();
  const tOnEnd = tOnStart + 0.25 + visiblePlateau * 0.5;

  const onActivate = () => {
    if (typeof window !== "undefined") console.log("Activated skill:", label);
  };
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <motion.button
      aria-label={`Skill: ${label}`}
      className="absolute flex items-center justify-center rounded-full border bg-white/28 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-lg select-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      initial={props.initial}
      animate={{
        // merge XY motion and opacity keyframes
        ...props.animateXY,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        ...props.motionTransition,
        // explicit opacity timing: match duration & offset
        opacity: {
          duration: opacityDuration,
          repeat: Infinity,
          repeatType: "loop",
          delay: opacityDelay,
          ease: "easeInOut",
          times: [0, tOnStart, tOnEnd > 0.98 ? 0.98 : tOnEnd, 1],
        },
      }}
      whileHover={{ scale: 1.08, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
      onClick={onActivate}
      onKeyDown={onKey}
      style={{
        transform: `translate(-50%, -50%) scale(${props.styleScale})`,
      }}
      tabIndex={0}
      type="button"
    >
      {label}
    </motion.button>
  );
};

function SkillsFloating({ height = 900 }) {
  // expanded centers (16 positions) to match your large SKILL_GROUPS
  const centers = [
    { left: "12%", top: "20%" },
    { left: "50%", top: "14%" },
    { left: "88%", top: "20%" },
    { left: "12%", top: "38%" },
    { left: "50%", top: "36%" },
    { left: "88%", top: "38%" },
    { left: "8%", top: "60%" },
    { left: "30%", top: "74%" },
    { left: "50%", top: "70%" },
    { left: "72%", top: "74%" },
    { left: "92%", top: "60%" },
    { left: "30%", top: "46%" },
    { left: "70%", top: "46%" },
    { left: "42%", top: "26%" },
    { left: "58%", top: "26%" },
    { left: "50%", top: "82%" },
  ];

  // responsive fallback: for small screens, stack clusters vertical-ish
  const getCenterStyle = (gi) => {
    if (typeof window !== "undefined" && window.innerWidth < 720) {
      // vertical list spread
      const left = "50%";
      const top = `${20 + ((gi % 8) * 9)}%`;
      return { left, top, transform: "translate(-50%, -50%)" };
    }
    const center = centers[gi % centers.length] || { left: "50%", top: "50%" };
    return { left: center.left, top: center.top, transform: "translate(-50%, -50%)" };
  };

  // tune how many bubbles appear on average (0..1)
  const visibleProbability = 0.5; // 0.3 = fewer visible, 0.7 = more visible

  return (
    <section id="skills-floating" className="relative w-full">
      <div className="mx-auto px-4" style={{ maxWidth: "1400px" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Highlighted Skills</h2>
            <p className="text-sm mt-1 text-muted-foreground">Interactive floating skill clusters — click / hover to focus.</p>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs text-gray-500">Hover bubbles for emphasis</span>
          </div>
        </div>

        <div
          className="relative mt-6 rounded-2xl border border-gray-200/40 bg-gradient-to-b from-white/12 to-white/6 overflow-hidden"
          style={{ width: "100%", height }}
        >
          {/* soft background shapes for depth */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute rounded-full opacity-24"
              style={{ width: 420, height: 420, background: "linear-gradient(135deg,#475569,#60a5fa)", left: -80, top: -60 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full opacity-18"
              style={{ width: 300, height: 300, background: "linear-gradient(135deg,#10b981,#34d399)", right: -80, bottom: -40 }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* clusters */}
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.title} className="absolute" style={getCenterStyle(gi)}>
              <div className="relative w-[320px] h-[180px]">
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 * gi, duration: 0.45 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow"
                >
                  {group.title}
                </motion.div>

                {group.skills.map((s, i) => {
                  const angle = (i / group.skills.length) * Math.PI * 2;
                  const radius = 58 + (i % 3) * 22; // slightly larger radii to reduce overlap
                  const left = 50 + Math.round(Math.cos(angle) * radius);
                  const top = 50 + Math.round(Math.sin(angle) * radius);

                  return (
                    <div key={s} style={{ left: `${left}%`, top: `${top}%`, position: "absolute" }}>
                      <Bubble label={s} index={gi * 10 + i} visibleProbability={visibleProbability} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="sr-only">This section shows clusters of skills as animated floating bubbles. Use keyboard to focus and Enter to interact.</p>
      </div>
    </section>
  );
}

/* -----------------------------
   Projects Grid
   ----------------------------- */
const Projects = () => (
  <AnimatedSection id="projects">
    <h2 className="text-2xl sm:text-3xl font-bold">Selected Projects</h2>
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          title: "Network Monitor Dashboard",
          desc: "Full-stack network monitoring: active ICMP/HTTP probes, Supabase persistence, and Streamlit dashboard.",
          img: "/networkprobe.png",
          href: "https://github.com/gitsish/network-probe--api",
        },
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
          title: "PVPSIT-College Management System Website",
          desc: "Full-stack web app to manage students, faculty, courses, and exams with secure authentication and role-based dashboards.",
          img: "/collegemanagementsystemimage.png",
          href: "https://pvpsit-project-2025.onrender.com",
        },
        {
          title: "Brain Tumor Classification (Colab)",
          desc: "Deep learning CNN model on MRI scans, deployed in Google Colab, achieving high accuracy in classifying tumor types.",
          img: "/braintumorimage.png",
          href: "https://github.com/gitsish/BrainTumorClassification-ADeepLearningProject",
        },
      ].map((p) => (
        <a key={p.title} href={p.href} target={p.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" className="group rounded-2xl border overflow-hidden hover:shadow-lg transition">
          <div className="aspect-[16/10] overflow-hidden">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" />
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

/* -----------------------------
   Updated Experience (toggle + awards + cert carousel)
   ----------------------------- */

const CERTIFICATES = [
  { src: "/nptel.png", alt: "NPTEL Discipline Star Award" },
  { src: "/flipkart.png", alt: "Flipkart Semifinalist" },
  { src: "/walmart.png", alt: "Walmart Sparkathon — Participation / Prize" },
  { src: "/vrsec.png", alt: "VRSEC Coding Competition — 2nd Prize" },
  { src: "/aiforgood.png", alt: "NIAT AIFORGOOD HACKATHON FINALIST" },
  // add more certificate images here
];

const DEFAULT_BG = "/carousel-bg.png"; // put carousel-bg.png in public/

const Experience = () => {
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % CERTIFICATES.length);
    }, 4500);
    return () => clearInterval(autoplayRef.current);
  }, []);

  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % CERTIFICATES.length);
    }, 4500);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + CERTIFICATES.length) % CERTIFICATES.length);
    resetAutoplay();
  };
  const next = () => {
    setIndex((i) => (i + 1) % CERTIFICATES.length);
    resetAutoplay();
  };
  const goto = (i) => {
    setIndex(i);
    resetAutoplay();
  };

  const timeline = [
    { time: "Aug 2025", title: "Cognizant Digital Nurture 4.0", text: "Selected and have undergone intensive training in Java, DSA, and full-stack skills with industry projects." },
    { time: "Jul 2025", title: "EcoRouteAI — Sparkathon", text: "Built reinforcement learning baseline with visual analytics and demo pipeline. (Walmart Sparkathon participation / recognition)" },
    { time: "May 2025", title: "AIFORGOOD NIAT Hackathon — Finalist", text: "Reached the finals for building an intelligent retail/fulfillment solution under timeboxed constraints." },
    { time: "May 2025", title: "Flipkart Hackathon — Semifinalist", text: "Reached the semifinals for building an intelligent retail/fulfillment solution under timeboxed constraints." },
    { time: "Apr 2025", title: "VRSEC Coding Competition — 2nd Prize", text: "Awarded 2nd prize for an immersive VR simulation project demonstrating interactive UX and optimization." },
    { time: "Mar 2025", title: "NPTEL — Discipline Star Award", text: "Awarded NPTEL Discipline Star for outstanding performance across multiple online courses." },
    { time: "Mar 2025", title: "Brain Tumor Classification", text: "Created CNN-based deep learning model for MRI scan classification with high accuracy." },
    { time: "Mar 2025", title: "College Management System", text: "Built MERN stack app with secure role-based login and responsive dashboards." },
  ];

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Experience & Awards</h2>
          <p className="text-sm text-neutral-400 mt-1">Major milestones, hackathon recognition and awards.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((o) => !o)}
            className="px-4 py-2 rounded-lg border hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-expanded={open}
            aria-controls="experience-details"
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <motion.div
        id="experience-details"
        initial={{ height: 0, opacity: 0 }}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden mt-6"
      >
        {/* Timeline */}
        <div className="relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800">
          {timeline.map((e, i) => (
            <div key={i} className="pl-12 py-4 relative">
              <div className="absolute left-[14px] mt-2 h-3 w-3 rounded-full bg-indigo-800 dark:bg-indigo-400" />
              <p className="text-xs text-neutral-400">{e.time}</p>
              <p className="font-semibold mt-1">{e.title}</p>
              <p className="text-sm text-neutral-300 mt-1">{e.text}</p>
            </div>
          ))}
        </div>

        {/* Awards summary */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4">
            <p className="font-semibold">Highlighted Awards</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li><strong>NPTEL Discipline Star</strong> — National recognition; awarded for top performance across multiple NPTEL online courses.</li>
              <li><strong>AIFORGOOD NIAT Hackathon — Finalist</strong> — Reached top 10% teams all over India (Finals) for an intelligent Blood Warriors prototype.</li>
              <li><strong>Flipkart Hackathon — Semifinalist</strong> — Reached top teams (semifinals) for an intelligent retail/fulfillment prototype.</li>
              <li><strong>Walmart Sparkathon</strong> — Participated and showcased EcoRouteAI RL baseline; received recognition among top submissions.</li>
              <li><strong>VRSEC National TechFest — 2nd Prize</strong> — Awarded Top Coder among brilliant Coders in Competitive Coding Competition.</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="font-semibold">Impact & Notes</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>Consistent focus on practical, deployable projects: monitoring systems, ML models, and optimization pipelines.</li>
              <li>Hackathon experience under tight timelines, with prototype-level deliverables and demos.</li>
              <li>Awards and recognitions reflect both technical depth and product thinking.</li>
            </ul>
          </div>
        </div>

        {/* Certificate carousel */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Certificates & Photos</h3>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border bg-black/10">
              <div className="relative w-full h-[360px] flex items-center justify-center">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundImage: `url("${CERTIFICATES[index]?.bg || DEFAULT_BG}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <img
                    src={CERTIFICATES[index].src}
                    alt={CERTIFICATES[index].alt}
                    className="relative z-10 max-h-[88%] max-w-[92%] object-contain shadow-lg rounded"
                    draggable={false}
                  />
                </motion.div>

                {!CERTIFICATES[index]?.bg && (
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.08))",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Prev / Next */}
            <button onClick={prev} aria-label="Previous certificate" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 shadow hover:bg-white/20 focus:outline-none">‹</button>
            <button onClick={next} aria-label="Next certificate" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 shadow hover:bg-white/20 focus:outline-none">›</button>

            {/* Thumbnails */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {CERTIFICATES.map((c, i) => (
                <button key={c.src} onClick={() => goto(i)} className={`w-12 h-12 rounded overflow-hidden border ${i === index ? "ring-2 ring-indigo-500" : ""}`} aria-label={`View ${c.alt}`}>
                  <img src={c.src} alt={c.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-neutral-400 text-center">Use ← → arrows, dots, or thumbnails to navigate. Autoplay enabled.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};


// --- Contact ---
const Contact = () => (
  <AnimatedSection id="contact">
    <div className="rounded-3xl border border-white/15 p-6 lg:p-10 bg-white/10 backdrop-blur-md">
      <h2 className="text-2xl sm:text-3xl font-bold">Let’s Talk</h2>
      <p className="bg-white/10 ">Open to full-time Software Development,Cloud & Network roles and Frontend/Java positions. Based in India (IST).</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="mailto:gaaisha05@gmail.com" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow">Email</a>
        <a href="https://www.linkedin.com/in/aaisha-sultana-guduru-877b21302" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border font-medium">LinkedIn</a>
        <a href="https://github.com/gitsish" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border font-medium">GitHub</a>
      </div>
    </div>
  </AnimatedSection>
);

export default function EnhancedPortfolio() {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);
  return (
    <main className="min-h-screen relative text-white">
      <TopProgress />
      <Nav />
      <Hero />
      <NetworkMonitor />
      <NetworkingSkills />

      {/* <-- Floating skill clusters inserted here --> */}
      <SkillsFloating height={420} />

      <Projects />
      <Experience />
      <Contact />
      <footer className="py-12 text-center text-sm text-neutral-500">© {new Date().getFullYear()} Aaisha Sultana — Built with React, Vite, Tailwind, Framer Motion</footer>
    </main>
  );
}
