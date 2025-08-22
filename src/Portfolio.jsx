import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Award, Code, FolderOpen, Rocket, Star, Cpu, Cloud, Database, ExternalLink, Phone } from "lucide-react";

// ====== Quick Links (edit these) ======
const LINKS = {
  email: "mailto:gaaisha05@gmail.com",
  phone: "tel:+919985140205",
  github: "https://github.com/gitsish",
  linkedin: "https://www.linkedin.com/in/aaisha-sultana-guduru-877b21302",
  leetcode: "https://leetcode.com/u/AAISHASULTANA/",
  codechef: "https://www.codechef.com/users/eblmjo555",
  hackerrank: "https://www.hackerrank.com/profile/22501A4401",
  resume: "/AAISHA_SULTANA_G_RESUME.pdf",
};

// ====== Tiny typewriter with blinking caret (no extra libs) ======
function Typewriter({ words, speed = 80, pause = 1100 }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | deleting
  useEffect(() => {
    const current = words[i % words.length];
    let t;
    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase("deleting"), pause);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), Math.max(40, speed * 0.6));
      } else {
        setI((v) => v + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, i, phase, words, speed, pause]);
  return <span className="border-r-2 pr-1 animate-caret">{text}</span>;
}
function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base color — dark teal/blue */}
      <div className="absolute inset-0 bg-[#102a43]" />

      {/* Layered radial washes */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_1000px_at_20%_-10%,rgba(16,185,129,0.25),transparent_70%),radial-gradient(900px_900px_at_80%_10%,rgba(34,211,238,0.22),transparent_70%),radial-gradient(900px_900px_at_50%_100%,rgba(59,130,246,0.20),transparent_70%)]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to_right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to_bottom,rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Scanning beam */}
      <div className="absolute -inset-x-10 top-32 h-40 bg-[linear-gradient(90deg,transparent,rgba(16,185,129,.28),rgba(34,211,238,.28),transparent)] blur-2xl animate-scan" />

      {/* Floating blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl animate-float-slower" />
    </div>
  );
}


// ====== Data ======
const projects = [
  {
    title: "Early Heart Disease Prediction",
    blurb: "ML research comparing SVM, KNN, ANN, and AdaBoost for risk prediction.",
    stack: ["Python", "scikit-learn", "Pandas"],
    links: [{ href: LINKS.github, label: "Code" }],
  },
  {
    title: "Brain Tumor Classification (CNN)",
    blurb: "Deep learning classifier for MRI tumor subtypes with strong precision.",
    stack: ["Python", "TensorFlow", "OpenCV"],
    links: [{ href: LINKS.github, label: "Code" }],
  },
  {
    title: "E‑Commerce Platform",
    blurb: "Full‑stack capstone for seamless shopping, payments, and admin dashboard.",
    stack: ["React", "Node.js", "MongoDB"],
    links: [{ href: LINKS.github, label: "Demo" }],
  },
  {
    title: "College Management System",
    blurb: "MERN app to manage students, courses, and events.",
    stack: ["MongoDB", "Express", "React", "Node"],
    links: [{ href: LINKS.github, label: "Code" }],
  },
  {
    title: "Last‑Mile Delivery Optimisation",
    blurb: "ML + full‑stack project: route efficiency, cost reduction, emissions.",
    stack: ["Python", "RL/OR", "FastAPI", "React"],
    links: [{ href: LINKS.github, label: "Case Study" }],
  },
  {
    title: "Netflix‑style Recommender",
    blurb: "Collaborative filtering analytics with evaluation dashboard.",
    stack: ["Python", "NumPy", "Matplotlib"],
    links: [{ href: LINKS.github, label: "Notebook" }],
  },
];

const achievements = [
  "SmartInterviews — Diamond Ranked Smart Coder (Global rank 1211/45336)",
  "HackerRank — Gold in Problem Solving & Python",
  "LeetCode 1618+ | CodeChef 1430+ | Codeforces 745+",
  "Second Prize — VRSEC TechnoFest Coding (Nation‑wide)",
  "Flipkart GRID 7.0 — Semi‑finalist",
  "AI4Good Hackathon — Finalist (ongoing)",
  "MSME Hackathon — Finalist (ongoing)",
  "Event coordinator, debate & GD awards; leadership across hackathons",
];

const internships = [
  "AICTE‑IBM SkillsBuild — 6‑week virtual (selected)",
  "AICTE — AWS Cloud Foundations & Data Engineering",
  "AICTE — Google Gen‑AI virtual internship",
  "AICTE — AWS AI & ML virtual internship",
  "AICTE — Palo Alto Cybersecurity virtual internship",
];

const skills = [
  { icon: <Code className="h-4 w-4"/>, name: "JavaScript, Python, Java, C++" },
  { icon: <Cpu className="h-4 w-4"/>, name: "DSA, ML/DL" },
  { icon: <Cloud className="h-4 w-4"/>, name: "Cloud & DevOps (AWS, Docker, K8s)" },
  { icon: <Database className="h-4 w-4"/>, name: "MongoDB, MySQL, PostgreSQL, Firebase" },
  { icon: <Code className="h-4 w-4"/>, name: "MERN, Django/Flask, Spring Boot" },
];

const education = [
  { school: "PRASAD V POTLURI SIDDHARTHA INSTITUTE OF TECHNOLOGY (JNTUK)", detail: "B.Tech CSE (Data Science), CGPA 8.67, 2022–2026 — Vijayawada, A.P." },
  { school: "Sri Chaitanya Jr. College, Vijayawada", detail: "BIE‑AP (2020–2022) — 82%" },
  { school: "V.P. Siddhartha Public School (CBSE), Vijayawada", detail: "Class X (2020) — 93%" },
];

const certifications = [
  "NPTEL Star — Discipline Star Award",
  "NPTEL Elite‑Silver — Soft Skills; Joy of Computing in Python",
  "NPTEL Elite — C++, DBMS, ML, DL, Google Cloud Foundations",
  "Java, Django, Linux — IIT Bombay Spoken Tutorials",
  "Infosys Springboard — Java Certification of Achievement",
];

// ====== UI helpers ======
const TAG = ({ children }) => (
  <span className="px-2.5 py-1 rounded-full border border-emerald-400/30 text-emerald-300/90 bg-emerald-400/10 text-xs">
    {children}
  </span>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-2 text-neutral-400">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] bg-white/5 backdrop-blur ${className}`}>{children}</div>
);

export default function Portfolio() {
  const year = new Date().getFullYear();
  const nav = useMemo(() => ([
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]), []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Background />

      {/* Top Nav */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-white">Aaisha Sultana</a>
          <nav className="hidden md:flex gap-6 text-sm">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-neutral-300 hover:text-emerald-300 transition">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a className="p-2 rounded-full border border-white/15 hover:border-emerald-400/60 transition" href={LINKS.github} aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a className="p-2 rounded-full border border-white/15 hover:border-emerald-400/60 transition" href={LINKS.linkedin} aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            <a className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-orange-500/50 text-orange-300 hover:bg-orange-500/10 transition" href={LINKS.resume}>
              <span>Resume</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-orange-300 to-emerald-300">Aaisha Sultana</span>
            </motion.h1>

            <p className="mt-3 text-2xl md:text-3xl font-semibold text-neutral-200">
              <Typewriter words={["Full‑Stack Developer", "MERN Specialist", "Cloud & DevOps", "Data/ML Enthusiast"]} />
            </p>

            <p className="mt-5 text-neutral-300">
              I build reliable, scalable software and data products across web, ML/DL, and cloud. I love converting ideas into shipped
              features and research into impact.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="px-5 py-2.5 rounded-full border border-emerald-400/60 text-emerald-300 hover:bg-emerald-400/10 font-medium transition">View Projects</a>
              <a href={LINKS.resume} className="px-5 py-2.5 rounded-full border border-orange-500/60 text-orange-300 hover:bg-orange-500/10 font-medium transition">Download Resume</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <TAG>Open to SDE/ML Internships 2025–26</TAG>
              <TAG>Vijayawada • India</TAG>
            </div>
          </div>

          <Card className="md:ml-auto">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-300/30 to-orange-300/30 border border-white/10" />
              <div>
                <h3 className="font-semibold text-xl text-white">What I bring</h3>
                <ul className="mt-2 space-y-1 text-sm text-neutral-300 list-disc pl-5">
                  <li>Full‑stack: React/Node, Django/Flask, Spring Boot</li>
                  <li>ML/DL: scikit‑learn, TensorFlow; data wrangling</li>
                  <li>Cloud & Ops: AWS, Docker, Kubernetes, MLOps</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TAG>Problem Solving</TAG>
                  <TAG>Hackathon‑ready</TAG>
                  <TAG>Team Leadership</TAG>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </header>

      <Section id="about" title="About">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold flex items-center gap-2 text-white"><Rocket className="h-4 w-4 text-orange-300"/> Career Objective</h3>
            <p className="mt-2 text-sm text-neutral-300">
              A dynamic and results‑driven developer with strong full‑stack, ML/DL, and big data foundations — eager to learn fast and
              ship impactful products.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold flex items-center gap-2 text-white"><FolderOpen className="h-4 w-4 text-emerald-300"/> Internships</h3>
            <ul className="mt-2 space-y-2 text-sm text-neutral-300">
              {internships.map((i) => (<li key={i} className="flex gap-2"><span>•</span><span>{i}</span></li>))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold flex items-center gap-2 text-white"><Award className="h-4 w-4 text-orange-300"/> Certifications</h3>
            <ul className="mt-2 space-y-2 text-sm text-neutral-300">
              {certifications.map((c) => (<li key={c} className="flex gap-2"><span>•</span><span>{c}</span></li>))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((s) => (
            <Card key={s.name}>
              <div className="flex items-center gap-3 text-neutral-200">
                <span className="text-emerald-300">{s.icon}</span>
                <span className="font-medium">{s.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects" subtitle="Selected work & capstones">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.title} className="hover:shadow-[0_0_0_1px_rgba(16,185,129,0.25)] hover:border-emerald-400/30 transition">
              <h3 className="font-semibold text-lg text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-md border border-white/15 text-neutral-200">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {p.links?.map((l) => (
                  <a key={l.label} className="inline-flex items-center gap-1 text-sm text-emerald-300 hover:underline" href={l.href}>
                    <ExternalLink className="h-4 w-4" /> {l.label}
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="achievements" title="Achievements">
        <Card>
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {achievements.map((a) => (
              <li key={a} className="flex items-start gap-2 text-neutral-200"><Star className="h-4 w-4 mt-0.5 text-orange-300"/><span>{a}</span></li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="px-3 py-2 rounded-full border border-white/15 text-neutral-200 hover:border-emerald-400/50" href={LINKS.leetcode}>LeetCode</a>
            <a className="px-3 py-2 rounded-full border border-white/15 text-neutral-200 hover:border-emerald-400/50" href={LINKS.codechef}>CodeChef</a>
            <a className="px-3 py-2 rounded-full border border-white/15 text-neutral-200 hover:border-emerald-400/50" href={LINKS.hackerrank}>HackerRank</a>
          </div>
        </Card>
      </Section>

      <Section id="education" title="Education">
        <div className="grid md:grid-cols-3 gap-6">
          {education.map((e) => (
            <Card key={e.school}>
              <h3 className="font-semibold text-white">{e.school}</h3>
              <p className="mt-1 text-sm text-neutral-300">{e.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <Card>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-xl text-white">Let’s build something great.</h3>
              <p className="text-sm text-neutral-300 mt-1">Reach out for opportunities, collaborations, and hackathons.</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href={LINKS.email} className="px-3 py-2 rounded-full border border-emerald-400/50 text-emerald-300 inline-flex items-center gap-2 hover:bg-emerald-400/10"><Mail className="h-4 w-4"/> gaaisha05@gmail.com</a>
                <a href={LINKS.phone} className="px-3 py-2 rounded-full border border-orange-500/50 text-orange-300 inline-flex items-center gap-2 hover:bg-orange-500/10"><Phone className="h-4 w-4"/> +91 99851 40205</a>
              </div>
            </div>
            <div className="flex gap-3">
              <a className="p-2 rounded-full border border-white/15 hover:border-emerald-400/60" href={LINKS.github}><Github className="h-4 w-4"/></a>
              <a className="p-2 rounded-full border border-white/15 hover:border-emerald-400/60" href={LINKS.linkedin}><Linkedin className="h-4 w-4"/></a>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-neutral-400">
          <p>© {year} Aaisha Sultana. Built with React + Tailwind.</p>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-emerald-300">About</a>
            <a href="#projects" className="hover:text-emerald-300">Projects</a>
            <a href={LINKS.resume} className="hover:text-emerald-300">Resume</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
