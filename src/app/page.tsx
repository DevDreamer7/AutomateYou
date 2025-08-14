
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mail, Linkedin, Github, Download, Briefcase, GraduationCap } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import React, { useRef, useEffect } from 'react';
import { useScrollSpy } from '@/hooks/use-scrollspy';
import { cn } from '@/lib/utils';

const skills = [
  { name: 'n8n', level: 95 },
  { name: 'API Integration', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'JavaScript / TypeScript', level: 80 },
  { name: 'Webhooks & Automation Workflows', level: 95 },
  { name: 'Database Management', level: 75 },
];

const projects = [
  {
    title: 'Automated Client Onboarding',
    description: 'A complete n8n workflow to automate new client onboarding, from contract signing to project setup in Asana.',
    image: 'https://placehold.co/600x400.png',
    hint: 'workflow diagram',
  },
  {
    title: 'E-commerce Order Sync',
    description: 'Syncs orders between Shopify and a custom CRM via API, ensuring real-time data consistency.',
    image: 'https://placehold.co/600x400.png',
    hint: 'data flow',
  },
  {
    title: 'Daily Reporting Bot',
    description: 'A Python script deployed with n8n that aggregates daily sales data and sends a formatted report to Slack.',
    image: 'https://placehold.co/600x400.png',
    hint: 'slack notification',
  },
];

const certifications = [
  {
    title: 'n8n Pro Certification',
    issuer: 'n8n.io',
    icon: <Briefcase className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Advanced API Integration',
    issuer: 'Automation Academy',
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
  },
    {
    title: 'Python for Automation',
    issuer: 'Coursera',
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
  },
];

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Home() {
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const activeId = useScrollSpy(
    sectionRefs.map((ref) => ref.current),
    { rootMargin: '0% 0% -50% 0%' }
  );
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll('.fade-in-up');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-blob -z-10"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-2000 -z-10"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-primary/10 rounded-full mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-4000 -z-10"></div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <a href="#home" className="text-xl font-headline font-bold text-primary">AutomateYou</a>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "transition-colors hover:text-primary",
                  activeId === link.href.substring(1) && "text-primary font-semibold scale-110"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" ref={useRef<HTMLDivElement>(null)} className="container mx-auto flex flex-col items-center justify-center text-center min-h-[calc(100vh-56px)] px-4 py-20">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 animate-fade-in-up">
            Alex Doe
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8 animate-fade-in-up [animation-delay:150ms]">
            Automation Specialist / <span className="text-primary">n8n Expert</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up [animation-delay:300ms]">
            <Button size="lg" asChild>
              <a href="#contact">
                Hire Me
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
               <a href="/alex-doe-cv.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
          <div className="flex items-center gap-6 mt-12 animate-fade-in-up [animation-delay:450ms]">
            <a href="mailto:alex.doe@example.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="h-6 w-6" /></a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></a>
            <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-6 w-6" /></a>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" ref={sectionRefs[0]} className="py-20 lg:py-32 fade-in-up">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-4xl font-bold text-center mb-12">About Me</h2>
            <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm p-8 shadow-lg shadow-primary/10 border-primary/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a passionate Automation Specialist with deep expertise in n8n, helping businesses streamline their operations, eliminate repetitive tasks, and build powerful, integrated systems. With a strong background in API integration and process optimization, I design and implement robust automation workflows that save time, reduce errors, and unlock new efficiencies.
              </p>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={sectionRefs[1]} className="py-20 lg:py-32 bg-card/20 fade-in-up">
           <div className="container mx-auto px-4">
             <h2 className="font-headline text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
             <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-end mb-2">
                     <h3 className="text-lg font-medium">{skill.name}</h3>
                     <p className="text-sm text-primary font-mono">{skill.level}%</p>
                  </div>
                   <Progress value={skill.level} className="h-3 bg-primary/20" />
                </div>
              ))}
            </div>
           </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" ref={sectionRefs[2]} className="py-20 lg:py-32 fade-in-up">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-4xl font-bold text-center mb-12">Projects & Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.title} className="bg-card/50 backdrop-blur-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 border-primary/20">
                  <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-auto object-cover" data-ai-hint={project.hint} />
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Education & Certificates Section */}
        <section id="education" ref={sectionRefs[3]} className="py-20 lg:py-32 bg-card/20 fade-in-up">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-4xl font-bold text-center mb-12">Education & Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <Card key={cert.title} className="p-6 flex flex-col items-center text-center bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 border-primary/20">
                  <div className="mb-4">{cert.icon}</div>
                  <CardTitle className="font-headline text-xl mb-1">{cert.title}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={sectionRefs[4]} className="py-20 lg:py-32 fade-in-up">
          <div className="container mx-auto px-4">
            <ContactForm />
          </div>
        </section>

      </main>

      <footer className="border-t border-border/40 py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alex Doe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
