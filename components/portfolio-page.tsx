"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";

import { Reveal } from "@/components/reveal";

type Feature = {
  title: string;
  description: string;
  accent: string;
  screenLabel: string;
  stat: string;
};

type ProjectCard = {
  title: string;
  eyebrow: string;
  description: string;
  tags?: string[];
  href?: string;
  className: string;
};

type RailPanel = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  desktopSrc?: string;
  desktopAlt?: string;
  mobileSrc?: string;
  mobileAlt?: string;
};

const getLinkProps = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const proofItems = [
  {
    title: "1 flagship product",
    body: "Synq anchors the portfolio with a startup-grade privacy story and a clear product point of view.",
  },
  {
    title: "Secure by design",
    body: "The strongest concepts here start with trust, calm interaction design, and modern authentication thinking.",
  },
  {
    title: "AI + product instinct",
    body: "AI is used as a speed multiplier while the product decisions stay intentional and human-centered.",
  },
  {
    title: "Fast deploy workflow",
    body: "Rapid prototyping, clean implementation, and polished execution from first concept to shipped interface.",
  },
];

const bentoCards: ProjectCard[] = [
  {
    title: "Synq",
    eyebrow: "Private messaging reimagined",
    description:
      "A cinematic messaging concept built around trust, device confidence, and visual restraint.",
    tags: ["E2EE", "Passkeys", "PWA", "Cinematic UI"],
    href: "https://synq-chat.vercel.app/",
    className: "bento-feature",
  },
  {
    title: "Privacy is a feature.",
    eyebrow: "Product philosophy",
    description:
      "Built around trust, local-first ideas, and calmer communication patterns that respect the user.",
    className: "bento-quote",
  },
  {
    title: "Life Planner",
    eyebrow: "Productivity system",
    description:
      "A planner interface focused on clarity, structured action, and quiet motivation instead of clutter.",
    href: "https://life-planner-main.vercel.app/",
    className: "bento-small",
  },
  {
    title: "Portfolio System",
    eyebrow: "Motion and identity",
    description:
      "A reusable visual language for narrative layouts, motion timing, and premium dark-mode product surfaces.",
    className: "bento-small",
  },
  {
    title: "UI Experiments",
    eyebrow: "Interaction studies",
    description:
      "Hover systems, pseudo-3D lighting, and layered transitions designed to make interfaces feel distinctly alive.",
    className: "bento-wide",
  },
  {
    title: "What I'm exploring",
    eyebrow: "Next frontier",
    description:
      "AI workflows, design systems, and startup UX patterns that shorten the distance from idea to meaningful product.",
    className: "bento-small",
  },
];

const features: Feature[] = [
  {
    title: "Private by default",
    description: "A chat system designed around trust, not noise.",
    accent: "rgba(102, 126, 234, 0.9)",
    screenLabel: "Quiet conversations with clear intent.",
    stat: "End-to-end calm",
  },
  {
    title: "Passkeys and device trust",
    description: "Modern authentication flow that feels secure and frictionless.",
    accent: "rgba(0, 102, 255, 0.95)",
    screenLabel: "Security that removes steps, not confidence.",
    stat: "Passwordless entry",
  },
  {
    title: "Local-first intelligence",
    description: "Useful AI boundaries without compromising core privacy ideas.",
    accent: "rgba(246, 79, 89, 0.88)",
    screenLabel: "Helpful intelligence kept in the right lane.",
    stat: "Assistive, not invasive",
  },
  {
    title: "Cinematic interface language",
    description: "Motion, depth, and visual hierarchy used to create feeling without clutter.",
    accent: "rgba(129, 140, 248, 0.95)",
    screenLabel: "Every transition earns its place.",
    stat: "Story-led motion",
  },
];

const railPanels: RailPanel[] = [
  {
    title: "Synq",
    description:
      "A messaging concept where privacy, modern auth, and cinematic pacing come together in one flagship product story.",
    tags: ["Messaging", "Security", "Product Design"],
    href: "https://synq-chat.vercel.app/",
    desktopSrc: "/projects/synq-desktop.png",
    desktopAlt: "Synq desktop messaging workspace preview.",
    mobileSrc: "/projects/synq-mobile.jpeg",
    mobileAlt: "Synq mobile messaging experience preview.",
  },
  {
    title: "Life Planner",
    description:
      "A planner dashboard that favors mental clarity, strong information hierarchy, and a calm daily workflow.",
    tags: ["Dashboard", "Planning", "Systems"],
    href: "https://life-planner-main.vercel.app/",
    desktopSrc: "/projects/life-planner-desktop.png",
    desktopAlt: "Life Planner desktop dashboard preview.",
    mobileSrc: "/projects/life-planner-mobile.jpeg",
    mobileAlt: "Life Planner mobile dashboard preview.",
  },
  {
    title: "Design Systems",
    description:
      "Typography, spacing, motion, and reusable surface rules built to make interfaces feel coherent at every layer.",
    tags: ["UI Systems", "Tokens", "Visual Language"],
    href: "#stack",
  },
  {
    title: "Creative Experiments",
    description:
      "Trailer-like concepts, interactive transitions, and interface studies that push presentation beyond the generic web.",
    tags: ["Motion", "Interaction", "Concepts"],
    href: "#projects",
  },
  {
    title: "Future Builds",
    description:
      "AI-native tools, startup-grade apps, and privacy-first experiences that are still in sketch mode but moving quickly.",
    tags: ["AI Workflow", "Startup UX", "Future Ideas"],
    href: "#contact",
  },
];

const stackGroups = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind-minded systems", "Type-safe UI architecture"],
  },
  {
    label: "Design",
    items: ["Motion systems", "Typography direction", "Dark-luxury surfaces", "Narrative layouts"],
  },
  {
    label: "Product",
    items: ["SaaS UX", "Privacy-first flows", "Startup taste", "Feature clarity"],
  },
  {
    label: "Workflow",
    items: ["AI-assisted building", "Rapid prototyping", "Shipping loops", "Deployment readiness"],
  },
];

export function PortfolioPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [railProgress, setRailProgress] = useState(0);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railSectionRef = useRef<HTMLElement | null>(null);
  const railViewportRef = useRef<HTMLDivElement | null>(null);
  const railTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    let rafId = 0;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);

      const section = railSectionRef.current;
      const viewport = railViewportRef.current;
      const track = railTrackRef.current;

      if (!section || !viewport || !track) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const maxTranslate = Math.max(track.scrollWidth - viewport.offsetWidth, 0);

      if (scrollable <= 0 || maxTranslate <= 0) {
        setRailProgress(0);
        return;
      }

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setRailProgress(progress);
    };

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    lenis.on("scroll", updateScrollState);
    updateScrollState();
    rafId = window.requestAnimationFrame(raf);
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("resize", updateScrollState);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observers = featureRefs.current
      .filter((node): node is HTMLDivElement => Boolean(node))
      .map((node, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveFeature(index);
            }
          },
          {
            threshold: 0.55,
            rootMargin: "-15% 0px -20% 0px",
          },
        );

        observer.observe(node);
        return observer;
      });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const railOffset = useMemo(() => {
    const viewport = railViewportRef.current;
    const track = railTrackRef.current;

    if (!viewport || !track) {
      return 0;
    }

    return railProgress * Math.max(track.scrollWidth - viewport.offsetWidth, 0);
  }, [railProgress]);

  return (
    <main className="page-shell">
      <div className="site-noise" aria-hidden="true" />
      <header className={`site-nav ${isScrolled ? "site-nav-scrolled" : ""}`}>
        <div className="nav-brand">Korvynn</div>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="#contact">
          Let&apos;s Talk
        </Link>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="section-frame hero-frame">
          <Reveal className="eyebrow-pill" delay={80}>
            Student Engineer / AI/ML Student
          </Reveal>
          <div className="hero-copy">
            <h1
              className="hero-title"
              aria-label="I design and ship product-focused web apps that feel fast, intentional, and built for real users."
            >
              {[
                "I",
                "design",
                "and",
                "ship",
                "product-focused",
                "web",
                "apps",
                "that",
                "feel",
                "fast,",
                "intentional,",
                "and",
              ].map(
                (word, index) => (
                  <span
                    key={word}
                    className="hero-word"
                    style={{ animationDelay: `${120 + index * 90}ms` }}
                  >
                    {word}
                  </span>
                ),
              )}
              <span className="hero-gradient">built for real users.</span>
            </h1>
            <Reveal as="p" className="hero-subtext" delay={280}>
              From secure messaging to immersive interfaces, I design and ship
              products with startup-level polish, motion, and intent.
            </Reveal>
            <Reveal className="hero-actions" delay={360}>
              <Link className="button-primary" href="#synq-story">
                View Synq
              </Link>
              <Link className="button-secondary" href="#projects">
                See Projects
              </Link>
            </Reveal>
            <Reveal className="hero-trust" delay={460}>
              <span>Privacy-first</span>
              <span>Motion-led UI</span>
              <span>AI-assisted builder</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-frame proof-section" aria-label="Proof strip">
        {proofItems.map((item, index) => (
          <Reveal key={item.title} className="proof-card" delay={index * 80}>
            <div className="proof-icon" aria-hidden="true" />
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </section>

      <section className="section-frame section-spacing" id="projects">
        <Reveal className="section-intro" delay={80}>
          <span className="section-eyebrow">Selected Work</span>
          <h2>Products, interfaces, and experiments.</h2>
          <p>
            A curated set of projects built around clarity, privacy, motion, and
            strong product instinct.
          </p>
        </Reveal>

        <div className="bento-grid">
          {bentoCards.map((card, index) => (
            <Reveal
              key={card.title}
              className={`bento-card ${card.className}`}
              delay={index * 90}
            >
              <span className="card-eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              {card.tags ? (
                <div className="card-tags">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
              {card.href ? (
                <Link className="card-link" href={card.href} {...getLinkProps(card.href)}>
                  View case study
                </Link>
              ) : null}
              {card.title === "Synq" ? (
                <div className="synq-preview" aria-hidden="true">
                  <div className="synq-preview-window">
                    <span className="synq-dot" />
                    <span className="synq-dot" />
                    <span className="synq-dot" />
                  </div>
                  <div className="synq-bubble synq-bubble-left">
                    Local-first by instinct
                  </div>
                  <div className="synq-bubble synq-bubble-right">
                    Passkey sign-in
                  </div>
                  <div className="synq-bubble synq-bubble-left">
                    Secure room active
                  </div>
                </div>
              ) : null}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-frame story-section" id="synq-story">
        <Reveal className="section-intro story-intro">
          <span className="section-eyebrow">Synq Story</span>
          <h2>Security, clarity, and feeling in the same product frame.</h2>
        </Reveal>

        <div className="story-layout">
          <div className="story-visual-column">
            <div className="story-visual-sticky">
              <div className="story-progress">
                {features.map((feature, index) => (
                  <span
                    key={feature.title}
                    className={index === activeFeature ? "story-progress-active" : ""}
                  />
                ))}
              </div>
              <div className="device-shell">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`device-screen ${
                      index === activeFeature ? "device-screen-active" : ""
                    }`}
                    style={{ ["--screen-accent" as string]: feature.accent }}
                  >
                    <div className="device-topbar">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="device-content">
                      <div className="device-card">
                        <span className="device-stat">{feature.stat}</span>
                        <h3>{feature.title}</h3>
                        <p>{feature.screenLabel}</p>
                      </div>
                      <div className="device-feed">
                        <div className="device-line device-line-wide" />
                        <div className="device-line" />
                        <div className="device-pill">{index + 1}.0 Secure Layer</div>
                        <div className="device-line device-line-wide" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="story-copy-column">
            {features.map((feature, index) => (
              <Reveal
                key={feature.title}
                className={`feature-block ${
                  index === activeFeature ? "feature-block-active" : ""
                }`}
              >
                <div
                  ref={(node) => {
                    featureRefs.current[index] = node;
                  }}
                >
                  <span className="feature-count">0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="rail-section"
        aria-label="Horizontal portfolio rail"
        ref={railSectionRef}
      >
        <div className="rail-sticky">
          <div className="section-frame rail-heading">
            <Reveal className="section-intro">
              <span className="section-eyebrow">Portfolio Rail</span>
              <h2>Work presented like a moving product narrative.</h2>
            </Reveal>
          </div>
          <div className="rail-viewport" ref={railViewportRef}>
            <div
              className="rail-track"
              ref={railTrackRef}
              style={{ transform: `translate3d(${-railOffset}px, 0, 0)` }}
            >
              {railPanels.map((panel, index) => (
                <article key={panel.title} className="rail-panel">
                  <div className="rail-preview">
                    <div
                      className={`rail-preview-card rail-preview-card-main${
                        panel.desktopSrc ? " rail-preview-card-has-image" : ""
                      }`}
                    >
                      {panel.desktopSrc ? (
                        <>
                          <Image
                            src={panel.desktopSrc}
                            alt={panel.desktopAlt ?? `${panel.title} desktop preview`}
                            fill
                            className="rail-preview-image rail-preview-image-desktop"
                            sizes="(max-width: 1024px) 82vw, 46vw"
                          />
                          <div className="rail-preview-image-sheen" aria-hidden="true" />
                        </>
                      ) : (
                        <span className="rail-preview-label">Preview 0{index + 1}</span>
                      )}
                    </div>
                    <div
                      className={`rail-preview-card rail-preview-card-side${
                        panel.mobileSrc ? " rail-preview-card-has-image" : ""
                      }`}
                    >
                      {panel.mobileSrc ? (
                        <Image
                          src={panel.mobileSrc}
                          alt={panel.mobileAlt ?? `${panel.title} mobile preview`}
                          fill
                          className="rail-preview-image rail-preview-image-mobile"
                          sizes="180px"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="rail-copy">
                    <span className="card-eyebrow">{panel.title}</span>
                    <h3>{panel.title}</h3>
                    <p>{panel.description}</p>
                    <div className="card-tags">
                      {panel.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link className="card-link" href={panel.href} {...getLinkProps(panel.href)}>
                      Explore project
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="section-frame rail-progress-wrap">
            <div className="rail-progress-bar">
              <span style={{ transform: `scaleX(${Math.max(railProgress, 0.06)})` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame section-spacing about-section" id="about">
        <Reveal className="about-heading">
          <span className="section-eyebrow">Philosophy</span>
          <h2>I care about products that feel intentional.</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-copy" delay={120}>
            <p>
              I use AI as both a creative and execution tool, but the goal is
              never novelty for its own sake. The work should still feel calm,
              deliberate, and worth trusting.
            </p>
            <p>
              I think like a builder, not just a coder. That means caring about
              the interface feel, the product framing, and whether a feature
              actually earns its place in the experience.
            </p>
            <p>
              I'm moving toward startup environments, internships, and
              product-building roles where engineering and design taste need to
              coexist.
            </p>
          </Reveal>
          <Reveal className="about-list" delay={220}>
            <span>Currently building: secure, product-driven web applications.</span>
            <span>
              Interested in: product engineering, frontend systems, startup
              design
            </span>
            <span>Based in: India</span>
          </Reveal>
        </div>
      </section>

      <section className="section-frame section-spacing stack-section" id="stack">
        <Reveal className="section-intro">
          <span className="section-eyebrow">Stack</span>
          <h2>Taste over buzzwords.</h2>
          <p>
            The toolkit matters, but the real differentiator is how the system,
            experience, and shipping loop fit together.
          </p>
        </Reveal>
        <div className="stack-grid">
          {stackGroups.map((group, index) => (
            <Reveal key={group.label} className="stack-card" delay={index * 90}>
              <h3>{group.label}</h3>
              <div className="stack-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-frame cta-section section-spacing" id="contact">
        <Reveal className="cta-card">
          <span className="section-eyebrow">Contact</span>
          <h2>Let&apos;s build something unforgettable.</h2>
          <p>
            I'm focused on product design, frontend experiences, and
            startup-ready web builds.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="mailto:numaanbinhusain@gmail.com">
              Contact Me
            </Link>
            <Link
              className="button-secondary"
              href="https://github.com/iamkorvynn"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </Link>
          </div>
          <p className="cta-note">
            Open to internships, collaborations, and product work.
          </p>
        </Reveal>
      </section>

      <footer className="section-frame site-footer">
        <div>
          <strong>Korvynn</strong>
          <p>Product-minded frontend builder for privacy-first digital experiences.</p>
        </div>
        <div className="footer-links">
          <Link href="https://github.com/iamkorvynn" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/numaan-bin-husain/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
          <Link href="mailto:numaanbinhusain@gmail.com">Email</Link>
        </div>
        <span className="footer-signature">
          Built with intent, motion, and late-night obsession.
        </span>
      </footer>
    </main>
  );
}
