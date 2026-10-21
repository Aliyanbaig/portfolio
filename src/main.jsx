import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import './styles.css';

const PROFILE = {
  name: 'Aliyan Baig',
  title: 'UX/UI Designer',
  identity: 'UX/UI design that makes complex products feel effortless.',
  email: 'Aliyanbaig.up@gmail.com',
  phone: '+1 (332) 777-4226',
  portrait: '/images/aliyan-header.png',
  aboutPortrait: '/images/aliyan-about-portrait.png',
};
const BOOKING_URL = '';
const bookingHref = BOOKING_URL || `mailto:${PROFILE.email}?subject=${encodeURIComponent('Book a call')}`;
const bookingTarget = BOOKING_URL ? { target: '_blank', rel: 'noreferrer' } : {};

const socials = [
  ['BEHANCE', 'https://www.behance.net/Aliyan-baig'],
  ['UPWORK', 'https://upwork.com/freelancers/aliyanbaig2'],
  ['LINKEDIN', 'https://www.linkedin.com/in/aliyan-baig/'],
];

const navigation = [
  ['HOME', '/#top'], ['ABOUT', '/#about'], ['WORKS', '/#works'],
  ['SERVICES', '/#services'], ['AWARDS', '/#awards'],
];

const experience = [
  { company: 'AI, Machine Learning & Deep Learning Intern', role: '', date: 'Apr 2026 – Sep 2026', location: 'ZulfiqarAbad, Gilgit' },
  { company: 'Freelance', role: 'UX UI Designer', date: 'Sep 2025 – Present', description: 'Presently working as a UI/UX Designer & Freelancer, responsible for crafting scalable design systems and improving product usability.' },
  { company: 'World Food Programme', role: 'Senior Visual Designer', date: 'Jul 2022 – Sep 2025', location: 'Remote · United States', description: 'Led the design of SURGE Station, a web platform that streamlines the end-to-end emergency staffing process. Managed by WFP’s Global Surge Coordination Unit (GSCU), it enhances deployment coordination and multilateral communication in emergencies.' },
  { company: 'Amenti.HR', role: 'Web Designer', date: 'May 2022 – Jul 2023', location: 'Freelance Remote · United States', description: 'Led website design for Amenti and its clients, contributing to the mission of this faith-based HR consulting firm. Helped create engaging online experiences aligned with its values of prioritizing people and fostering community within organizations.' },
  { company: 'Seveti', role: 'UX UI Designer', date: 'May 2021 – May 2023', location: 'Freelance Remote · United States' },
  { company: 'Arvo', role: 'Web Designer', date: 'Jan 2022 – Jul 2022', location: 'Freelance Remote · United States' },
  { company: 'AAK TELE-SCIENCE, INC', role: 'Web Designer', date: 'Jan 2022 – Jul 2022', location: 'Remote · United States' },
  { company: 'Locomotiva', role: 'UX UI Designer', date: 'Sep 2021 – Jun 2022', location: 'Freelance · Brazil' },
  { company: 'Ovatic Solution', role: 'UX UI Designer', date: 'Aug 2020 – Sep 2021', location: 'Full Time · Rawalpindi' },
  { company: 'Hire Pixels', role: 'UX UI Designer', date: 'Aug 2020 – Dec 2020', location: 'Full Time · Islamabad' },
  { company: 'Uconnect', role: 'UX UI Intern', date: 'Apr 2020 – Jul 2021', location: 'Full Time · Gilgit' },
];

const training = [
  { title: 'Google Professional Certificate Training Programs', date: 'Aug 2023', link: 'https://coursera.org/share/6afb6c8f93b1d9a0792b2c0dcd77e37b', linkLabel: 'View Certificate' },
  { title: 'Crash Course in AI, ML, DL with Python', date: 'Dec 2025 – Mar 2026', org: 'Information Technology Center · By Shoaib Ud Din', description: 'A practical course covering Artificial Intelligence, Machine Learning, and Deep Learning with Python, including data handling, model training, neural networks, and real-world AI projects.' },
  { title: 'Software Technology Park', date: 'Jan 2020 – Apr 2020', org: 'Uconnect' },
];

const projects = [
  { id: 'surge-station', title: 'SURGE Station', org: 'World Food Programme', category: 'Emergency staffing platform · Web design', date: 'Jul 2022 – Sep 2025', href: '/works/surge-station', mark: 'WFP', description: 'A web platform designed to streamline emergency staffing and improve deployment coordination.' },
  { id: 'amenti-hr', title: 'Amenti.HR', org: 'Amenti.HR', category: 'Web design', date: 'May 2022 – Jul 2023', href: '/works/amenti-hr', mark: 'Amenti', description: 'Website design for a faith-based HR consulting firm and its clients.' },
];

const services = [
  ['UX/UI Design', 'User flows, wireframes, mockups, prototyping, UX research and user testing.'],
  ['Web Design', 'Thoughtful web experiences shaped around clear structure and usability.'],
  ['Visual Design', 'Visual communication for digital products and web experiences.'],
  ['Design Systems', 'Scalable design systems and style guides for consistent products.'],
  ['Product Usability', 'Improving product usability through user-focused design decisions.'],
];

function useNewYorkTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(new Date()));
    update();
    const id = window.setInterval(update, 1_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const time = useNewYorkTime();
  useEffect(() => {
    const close = event => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    document.body.classList.toggle('menu-open', open);
    return () => { window.removeEventListener('keydown', close); document.body.classList.remove('menu-open'); };
  }, [open]);
  useEffect(() => {
    const header = document.querySelector('.header');
    const updateContrast = () => {
      const probe = document.elementFromPoint(window.innerWidth / 2, Math.min(window.innerHeight / 2, window.innerHeight - 1));
      header?.classList.toggle('on-dark', Boolean(probe?.closest('.editorial, .visual-feed, .store-teaser, .footer')));
    };
    updateContrast();
    window.addEventListener('scroll', updateContrast, { passive: true });
    window.addEventListener('resize', updateContrast);
    return () => { window.removeEventListener('scroll', updateContrast); window.removeEventListener('resize', updateContrast); };
  }, []);
  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentY = Math.max(0, window.scrollY);
        const delta = currentY - previousY;
        if (currentY < 100 || open) setHidden(false);
        else if (delta > 6 && currentY > 160) setHidden(true);
        else if (delta < -6) setHidden(false);
        previousY = currentY;
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, [open]);
  return <>
    <header className={`header${hidden ? ' is-hidden' : ''}`} id="HOME-01" data-audit="HOME-01" data-store-audit="STORE-00">
      <div className="header-meta" id="HOME-00"><span>NEW YORK TIME</span><i>—</i><time>{time}</time></div>
      <a className="wordmark" href="/#top" aria-label={`${PROFILE.name} home`}>AB<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <div className="header-actions"><a className="email-link" href={bookingHref} {...bookingTarget}>Book a call <ArrowUpRight/></a>
        <button className={`menu-toggle${open ? ' is-open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(value => !value)}><span/><span/></button>
      </div>
    </header>
    <nav className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu" aria-label="Mobile navigation" aria-hidden={!open}>
      <div className="mobile-menu-inner">{navigation.map(([label, href], index) => <a key={label} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}<ArrowUpRight/></a>)}
        <a className="mobile-email" href={bookingHref} {...bookingTarget} tabIndex={open ? 0 : -1}>Book a call <ArrowUpRight/></a>
      </div>
    </nav>
  </>;
}

function Eyebrow({ children, number }) { return <p className="eyebrow">{number && <span className="eyebrow-number">{number}</span>}<i/>{children}</p>; }
function ArrowLink({ href, children, className = '', ...linkProps }) { return <a className={`arrow-link ${className}`} href={href} {...linkProps}>{children}<span><ArrowUpRight/></span></a>; }
function SectionHeading({ label, title, copy, id }) { return <div className="section-heading reveal" id={id}><Eyebrow>{label}</Eyebrow><div className="section-heading-row"><h2>{title}</h2>{copy && <p>{copy}</p>}</div></div>; }

function Hero() {
  return <section className="hero" id="top" data-audit="HOME-02" aria-labelledby="hero-title">
    <div className="hero-image"><img src={PROFILE.portrait} alt="Aliyan Baig" fetchPriority="high"/></div>
    <div className="hero-shade"/>
    <div className="hero-content">
      <p className="hero-intro">Hi, I multidisciplinary<br/>Product designer</p>
      <h1 id="hero-title"><span>Aliyan</span><span>Baig</span></h1>
      <div className="hero-detail" aria-label="New York-based, U.S.-registered design studio">
        <span>New York-based</span>
        <span>U.S.-registered LLC</span>
      </div>
    </div>
    <ArrowLink href={bookingHref} {...bookingTarget} className="hero-cta">Book a call</ArrowLink>
  </section>;
}

function ScrollWordReveal({ children, className = '' }) {
  const ref = useRef(null);
  const words = String(children).split(/\s+/);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const spans = [...node.querySelectorAll('[data-word]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach(span => span.classList.add('is-lit'));
      return;
    }
    let frame = 0;
    const paint = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const start = window.innerHeight * .82;
        const end = window.innerHeight * .28 - rect.height * .25;
        const progress = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, start - end)));
        const active = Math.ceil(progress * spans.length);
        spans.forEach((span, i) => span.classList.toggle('is-lit', i < active));
      });
    };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', paint); window.removeEventListener('resize', paint); };
  }, []);
  return <span ref={ref} className={`scroll-word-reveal ${className}`}>{words.map((word, i) => <React.Fragment key={`${i}-${word}`}><span data-word style={{'--word-index': i}}>{word}</span>{i < words.length - 1 ? ' ' : ''}</React.Fragment>)}</span>;
}

function About() {
  return <section className="about section-pad" id="about" data-audit="HOME-03" aria-labelledby="about-title">
    <div className="about-portrait reveal"><img src={PROFILE.aboutPortrait} alt="Portrait of Aliyan Baig" loading="lazy"/><span>ALIYAN BAIG · UX/UI DESIGN</span></div>
    <div className="about-content"><Eyebrow number="01">WHO I AM!</Eyebrow>
      <h2 id="about-title"><ScrollWordReveal>A UX/UI designer focused on making digital products clear, usable and thoughtful.</ScrollWordReveal></h2>
      <p className="about-description">I’m currently working as a UI/UX Designer & Freelancer, crafting scalable design systems and improving product usability. My work also spans web and visual design, while recent AI/ML training and internship experience are expanding my technical practice.</p>
      <ArrowLink href={`mailto:${PROFILE.email}`}>Email me about a project</ArrowLink>
    </div>
  </section>;
}

function Proof() {
  const items = [
    ['UX/UI', 'User experience', 'Flows, research, wireframes, testing and prototypes.'],
    ['WEB', 'Web & visual design', 'Digital experiences and visual communication.'],
    ['SYSTEMS', 'Design systems', 'Scalable systems and style guides.'],
    ['AI/ML', 'Growing technical practice', 'Recent internship and practical training.'],
  ];
  return <section className="proof section-pad" id="HOME-04" data-audit="HOME-04"><div className="proof-head"><Eyebrow number="02">AREAS OF PRACTICE</Eyebrow><p>Design experience grounded in usability, with a growing technical focus.</p></div><div className="proof-grid">{items.map(([metric, title, copy], i) => <article className="proof-item reveal" style={{'--reveal-delay': `${i * 90}ms`}} key={metric}><span className="proof-index">0{i + 1}</span><strong>{metric}</strong><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>;
}

function Mission() {
  return <section className="mission section-pad" id="HOME-05" data-audit="HOME-05"><div className="mission-copy reveal"><Eyebrow number="03">DESIGN POINT OF VIEW</Eyebrow><h2>Simplicity through design <em>&</em> usability.</h2><p>Thoughtful design brings structure to complexity. I focus on clear interfaces, scalable systems and improving how people use digital products.</p><ArrowLink href="#services">How I work</ArrowLink></div><div className="mission-visual reveal"><img src={PROFILE.portrait} alt="Aliyan Baig, UX/UI designer" loading="lazy"/><div className="mission-caption"><span>MY MISSION</span><strong>Make useful things<br/>easier to use.</strong></div><span className="mission-stamp">UX/UI<br/>·<br/>WEB</span></div></section>;
}

function ProjectVisual({ project }) {
  return <div className={`project-visual project-visual-${project.id}`} aria-hidden="true"><div className="project-visual-top"><span>PROJECT RECORD</span><span>{project.date}</span></div><div className="project-visual-main"><span className="project-monogram">{project.mark}</span><div><span>{project.org}</span><strong>{project.title}</strong><small>{project.category}</small></div></div><div className="project-visual-bottom"><span>UX · WEB · USABILITY</span><ArrowUpRight/></div></div>;
}

function WorkCard({ project, index = 0 }) {
  return <a className="work-card reveal" style={{'--reveal-delay': `${index * 120}ms`}} href={project.href} aria-label={`${project.title}, ${project.category}`}><ProjectVisual project={project}/><div className="work-meta"><div><h3>{project.title}</h3><p>{project.category}</p></div><time>{project.date}</time><span className="work-arrow"><ArrowUpRight/></span></div></a>;
}

function CareerHistory() {
  const [expanded, setExpanded] = useState(false);
  return <div className="career-history" id="career"><div className="career-heading"><Eyebrow>EXPERIENCE</Eyebrow><h3>Selected career history</h3><button type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? 'Show less' : 'View all roles'}<ArrowDown className={expanded ? 'rotated' : ''}/></button></div>
    <div className={`career-list${expanded ? ' expanded' : ''}`}>{experience.map((item, index) => <article className="career-row" key={`${item.company}-${item.date}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{item.company}{item.role && <> <i>/</i> {item.role}</>}</h4><p>{item.date}{item.location ? ` · ${item.location}` : ''}</p>{item.description && <small>{item.description}</small>}</div><ArrowUpRight/></article>)}</div>
  </div>;
}

function SelectedWorks() {
  return <section className="works section-pad" id="works" data-audit="HOME-06"><SectionHeading label="SELECTED WORK" title="Work shaped by people & purpose" copy="A small selection of work and experience described in my CV."/><div className="work-grid">{projects.map((project, index) => <WorkCard key={project.id} project={project} index={index}/>)}</div><CareerHistory/></section>;
}

function EditorialStatement() {
  return <section className="editorial" id="HOME-07" data-audit="HOME-07"><Eyebrow number="04">DESIGN WITH INTENTION</Eyebrow><h2>Thoughtful work.<br/><span>Clear systems.</span><br/>One useful detail<br/><em>at a time.</em></h2><div className="editorial-side">UX/UI DESIGN · WEB DESIGN · PRODUCT USABILITY</div></section>;
}

function Approach() {
  const steps = [
    ['Research & Analysis', 'Explore user needs, project context and the challenges a product needs to address.'],
    ['Define & Ideation', 'Shape the structure through user flows, strategic thinking and early concepts.'],
    ['Execution & Delivery', 'Develop wireframes, mockups and prototypes into a coherent design direction.'],
    ['Evaluation & Testing', 'Use user testing and careful iteration to improve clarity and product usability.'],
  ];
  return <section className="approach section-pad" id="HOME-08" data-audit="HOME-08"><div className="approach-top"><div><Eyebrow number="05">MY APPROACH & PROCESS</Eyebrow><h2>Creative<br/>approach</h2></div><div className="approach-visual reveal"><div className="flow-node node-a">USER NEEDS</div><div className="flow-node node-b">STRUCTURE</div><div className="flow-node node-c">INTERFACE</div><div className="flow-node node-d">USABILITY</div><div className="flow-lines"/><span>RESEARCH · DESIGN · REFINE</span></div></div>
    <div className="approach-list">{steps.map(([title, copy], index) => <article className="approach-row reveal" style={{'--reveal-delay': `${index * 90}ms`}} key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight/></article>)}</div>
  </section>;
}

function Services() {
  return <section className="services section-pad" id="services" data-audit="HOME-09"><SectionHeading label="CREATIVE TOOLBOX" title="Services I provide" copy="UX/UI, web and visual design with a focus on product usability."/><div className="service-list">{services.map(([title, copy], index) => <article className="service-row reveal" style={{'--reveal-delay': `${index * 80}ms`}} key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight/></article>)}</div><ArrowLink href={`mailto:${PROFILE.email}`} className="services-cta">Discuss a project</ArrowLink></section>;
}

function VisualFeed() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const runner = section?.querySelector('.feed-scrollspace');
    if (!section || !runner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = runner.getBoundingClientRect();
        const span = rect.height + window.innerHeight;
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / span));
        section.style.setProperty('--feed-progress', progress.toFixed(4));
        section.style.setProperty('--feed-scale', (3.88 + progress * 3.12).toFixed(4));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); section.style.removeProperty('--feed-progress'); };
  }, []);
  return <section className="visual-feed" id="HOME-10" data-audit="HOME-10" ref={sectionRef}>
    <div className="feed-sticky"><Eyebrow number="06">VISUAL FEED</Eyebrow><div className="feed-heading"><h2>Visual</h2><div className="feed-video-frame"><video src="https://Grainient.b-cdn.net/FRAMER%20_%20TEMPLATE/velora2.mp4" autoPlay loop muted playsInline aria-label="Abstract visual design motion"/><span>ALIYAN BAIG · DESIGN PRACTICE</span></div><h2>Feed</h2></div></div>
    <div className="feed-scrollspace" aria-hidden="true"/>
  </section>;
}

function TestimonialStyleStories() {
  const stories = useMemo(() => projects.map(project => ({ title: project.org, text: project.description, detail: `${project.title} · ${project.category}`, date: project.date })), []);
  const [index, setIndex] = useState(0);
  const pointerStart = useRef(null);
  const story = stories[index];
  const move = amount => setIndex(value => (value + amount + stories.length) % stories.length);
  return <section className="stories section-pad" id="HOME-11" data-audit="HOME-11"><div className="stories-heading"><Eyebrow number="07">PROJECT CONTEXTS</Eyebrow><h2>Work that starts<br/>with a real need.</h2><p>A closer look at the context behind selected work described in my CV.</p></div><div className="story-panel" key={index} aria-live="polite" aria-roledescription="slide" onKeyDown={event => { if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1); }} onPointerDown={event => { pointerStart.current = event.clientX; }} onPointerUp={event => { if (pointerStart.current === null) return; const delta = event.clientX - pointerStart.current; pointerStart.current = null; if (Math.abs(delta) > 55) move(delta < 0 ? 1 : -1); }} tabIndex="0"><div className="story-mark" aria-hidden="true">0{index + 1}</div><div className="story-content"><span className="story-date">{story.date}</span><p className="story-summary">{story.text}</p><div className="story-footer"><div><strong>{story.title}</strong><span>{story.detail}</span></div><div className="slider-controls"><button aria-label="Previous project context" onClick={() => move(-1)}><ArrowLeft/></button><button aria-label="Next project context" onClick={() => move(1)}><ArrowRight/></button></div></div></div><div className="story-count"><span>0{index + 1}</span> / 0{stories.length}</div></div></section>;
}

function Recognition() {
  return <section className="recognition section-pad" id="awards" data-audit="HOME-12"><div className="recognition-heading"><Eyebrow number="08">TRAINING & LEARNING</Eyebrow><h2>Learning that<br/>keeps expanding.</h2><p>Professional certificate training and practical AI/ML education extend a design-led practice.</p></div><div className="recognition-list">{training.map((item, index) => <article className="recognition-row reveal" key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.date}{item.org ? ` · ${item.org}` : ''}</p>{item.description && <small>{item.description}</small>}{item.link && <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel}<ArrowUpRight/></a>}</div><ArrowUpRight/></article>)}</div></section>;
}

function StoreTeaser() {
  return <section className="store-teaser section-pad" id="HOME-13" data-audit="HOME-13"><SectionHeading label="DESIGN OFFERINGS" title="Ways to work together" copy="UX/UI, web and visual design offerings. Get in touch to discuss a project."/><div className="offering-grid">{services.slice(0, 3).map(([title, copy], index) => <a className="offering-card reveal" style={{'--reveal-delay': `${index * 110}ms`}} href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`Project enquiry: ${title}`)}`} key={title}><span>0{index + 1} / DESIGN OFFERING</span><h3>{title}</h3><p>{copy}</p><span className="offering-action">Enquire <ArrowUpRight/></span></a>)}</div><ArrowLink href="/store" className="store-link">Explore offerings</ArrowLink></section>;
}

function ContactCTA() {
  return <section className="contact-cta section-pad" id="HOME-14" data-audit="HOME-14"><div className="contact-image reveal"><img src={PROFILE.portrait} alt="Aliyan Baig" loading="lazy"/><span>ALIYAN BAIG · UX/UI</span></div><div className="contact-copy"><Eyebrow number="09">LET’S CONNECT</Eyebrow><h2>Let’s create something thoughtful together.</h2><p>Get in touch about UX/UI design, web design, design systems or product usability.</p><ArrowLink href={`mailto:${PROFILE.email}`}>{PROFILE.email}</ArrowLink><a className="phone-link" href="tel:+13327774226">{PROFILE.phone}</a></div></section>;
}

function Footer() {
  return <footer className="footer" id="HOME-15" data-audit="HOME-15" data-store-audit="STORE-03"><div className="footer-top"><a className="footer-wordmark" href="/#top">Aliyan Baig<span>.</span></a><p>{PROFILE.identity}</p><a href={`mailto:${PROFILE.email}`} className="footer-email">{PROFILE.email}<ArrowUpRight/></a></div><div className="footer-columns"><div><Eyebrow>QUICK LINKS</Eyebrow>{navigation.slice(1).map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><div><Eyebrow>PROFESSIONAL</Eyebrow>{socials.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label}<ArrowUpRight/></a>)}</div><div><Eyebrow>CONTACT</Eyebrow><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a><a href="tel:+13327774226">{PROFILE.phone}</a><span>English</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>{PROFILE.title}</span><a href="/#top">BACK TO TOP ↑</a></div></footer>;
}

function Home() {
  return <><Header/><main><Hero/><About/><Proof/><Mission/><SelectedWorks/><EditorialStatement/><Approach/><Services/><VisualFeed/><TestimonialStyleStories/><Recognition/><StoreTeaser/><ContactCTA/></main><Footer/></>;
}

function StorePage() {
  return <><Header/><main className="store-page"><section className="store-hero section-pad" id="STORE-01" data-audit="STORE-01"><Eyebrow>DESIGN OFFERINGS · ALIYAN BAIG</Eyebrow><h1>Thoughtful digital experiences, shaped around people.</h1><p>UX/UI and web design work, supported by scalable design systems and a focus on product usability.</p><ArrowLink href={`mailto:${PROFILE.email}`}>Enquire about a project</ArrowLink><div className="store-portrait"><img src={PROFILE.portrait} alt="Aliyan Baig"/><span>UX/UI DESIGN · WEB DESIGN</span></div></section><section className="store-products section-pad" id="STORE-02" data-audit="STORE-02"><SectionHeading label="WAYS TO WORK TOGETHER" title="Design services" copy="UX/UI, web and visual design services. Contact me to discuss your project."/><div className="offering-grid">{services.map(([title, copy], index) => <a className="offering-card reveal" href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`Project enquiry: ${title}`)}`} key={title}><span>0{index + 1} / SERVICE</span><h3>{title}</h3><p>{copy}</p><span className="offering-action">Enquire <ArrowUpRight/></span></a>)}</div></section></main><Footer/></>;
}

function ProjectDetail({ project }) {
  const isSurge = project.id === 'surge-station';
  return <><Header/><main className="detail-page"><section className="detail-hero section-pad"><Eyebrow>{project.org} · {project.date}</Eyebrow><h1>{project.title}</h1><p>{project.category}</p><ProjectVisual project={project}/></section><section className="detail-body section-pad"><Eyebrow>PROJECT CONTEXT</Eyebrow><h2>{project.description}</h2><div className="detail-facts"><div><span>Organization</span><strong>{project.org}</strong></div><div><span>Role</span><strong>{isSurge ? 'Senior Visual Designer' : 'Web Designer'}</strong></div><div><span>Period</span><strong>{project.date}</strong></div><div><span>Contribution</span><strong>{isSurge ? 'Led design of the web platform' : 'Led website design for the organization and its clients'}</strong></div></div>{isSurge && <p className="detail-note">Managed by WFP’s Global Surge Coordination Unit (GSCU), SURGE Station enhances deployment coordination and multilateral communication in emergencies. No project screenshots were available in the supplied portfolio materials, so this page does not show unrelated imagery.</p>}</section><section className="detail-cta section-pad"><Eyebrow>MORE ABOUT THE WORK</Eyebrow><h2>Explore selected work</h2><ArrowLink href="/#works">Back to selected work</ArrowLink></section></main><Footer/></>;
}

function NotFound() { return <><Header/><main className="not-found section-pad"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>This page isn’t part of Aliyan’s portfolio.</h1><ArrowLink href="/">Return home</ArrowLink></main><Footer/></>; }

function AppMeta({ path }) {
  useEffect(() => {
    const project = projects.find(item => path === item.href);
    const isStore = path === '/store';
    const title = project ? `${project.title} — ${PROFILE.name}` : isStore ? `Design Offerings — ${PROFILE.name}` : `${PROFILE.name} — ${PROFILE.title}`;
    const description = project?.description || (isStore ? 'UX/UI design services by Aliyan Baig.' : 'Aliyan Baig is a UX/UI Designer creating clear, intuitive digital experiences.');
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    for (const [selector, value] of [['meta[property="og:title"]', title], ['meta[property="og:description"]', description], ['meta[name="twitter:title"]', title], ['meta[name="twitter:description"]', description]]) document.querySelector(selector)?.setAttribute('content', value);
  }, [path]);
  return null;
}

function RevealObserver() {
  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { elements.forEach(element => element.classList.add('is-visible')); return; }
    // Lower threshold keeps tall portrait/reveal elements reachable on short mobile viewports.
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: 0.15 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        root.style.setProperty('--hero-scroll-shift', `${-Math.min(120, y * .2)}px`);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); root.style.removeProperty('--hero-scroll-shift'); };
  }, []);
  return null;
}

function App() {
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, '') || '/';
  const project = projects.find(item => item.href === path);
  useEffect(() => { if (!window.location.hash) return; const id = window.location.hash.slice(1); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })); }, [path]);
  return <><AppMeta path={path}/>{project ? <ProjectDetail project={project}/> : path === '/' ? <Home/> : path === '/store' ? <StorePage/> : <NotFound/>}<RevealObserver/><ScrollMotion/></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
