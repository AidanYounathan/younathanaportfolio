'use client'
import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react'
import ProjectTagComponent from './ProjectTagComponent';
import ProjectCard from './ProjectCard';

const projectsData = [
    {
      id: 1,
      title: "Caddy Track (Deprecated)",
  description: "Golf club tracking site focused on player stats and club usage. Built with Next.js and TypeScript - it demonstrates full-stack patterns, responsive UI, and integrations for data persistence.",
      image: "/images/CaddyTrack.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AidanYounathan/caddytrackfrontend",
      previewUrl: "https://github.com/AidanYounathan/caddytrackfrontend",
      tech: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
      year: "2022",
      role: "Full-stack Developer",
      highlights: [
        "Player and club tracking dashboard with historical stats",
        "Responsive UI with image previews and interactive charts",
        "Authentication and user profiles",
      ],
    },
    {
      id: 2,
      title: "One Dex",
      description: "Pokedex-style web app that consumes the public Pokemon API. Focused on fast search, filter, and a clean UI built with React + TypeScript.",
      image: "/images/OneDex.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AidanYounathan/younathanapokemonapireactbuild/tree/main/pokemonapi",
      previewUrl: "https://younathanapokemonapireactbuild.vercel.app/",
      tech: ["React", "TypeScript", "REST API", "CSS"],
      year: "2023",
      role: "Front-end Developer",
      highlights: [
        "Search and filter by type, ability and stats",
        "Lightweight client-side caching for snappy navigation",
        "Mobile-friendly grid and card layout",
      ],
    },
    {
      id: 3,
      title: "Most Influential Person",
      description: "A content-driven blog site built with React. Emphasizes accessible typography, SEO-friendly structure, and a simple CMS-friendly content pipeline.",
      image: "/images/MIP.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AidanYounathan/YounathanAInfluentialPersonWebsite",
      previewUrl: "https://younathan-a-influential-person-website.vercel.app/",
      tech: ["React", "Markdown", "CSS"],
      year: "2023",
      role: "Full-stack / Content Engineer",
      highlights: [
        "Content-first layout with fast page loads",
        "Responsive images and accessible markup",
        "Author and tag pages for improved navigation",
      ],
    },
    {
      id: 4,
      title: "Tip Calculator",
      description: "A pixel-perfect implementation of a tip calculator (Frontend Mentor design). Focuses on UX details, validation, and precise layout using Next.js + TypeScript.",
      image: "/images/TipCalc.png",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "https://younathan-a-tip-calculator.vercel.app/",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      year: "2023",
      role: "Front-end Developer",
      highlights: [
        "Accurate tip calculations and responsive inputs",
        "Keyboard-friendly controls and mobile-first design",
      ],
    },
    {
      id: 5,
      title: "Keystone",
  description: "In development - a minimal macOS task tracker focused on daily momentum. Features fast task creation, subtasks, and end-of-day review workflows to move unfinished work forward.",
      image: "/images/IP3.jpg",
      tag: ["All", "App"],
      gitUrl: "/",
      previewUrl: "/",
      tech: ["Prototype"],
      year: "In progress",
      role: "Product / Lead Developer",
      highlights: [
        "Fast keyboard-first task entry",
        "Collapsible subtasks with quick navigation",
      ],
    },
  ];

const ProjectsComponent = () => {

    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    const handleTagChange = (newTag: string) => {
      setTag(newTag);
    };
  
    const filteredProjects = projectsData.filter((project) =>
      project.tag.includes(tag)
    );
  
    const cardVariants = {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    };


  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTagComponent
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTagComponent
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTagComponent
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
        <ProjectTagComponent
          onClick={handleTagChange}
          name="App"
          isSelected={tag === "App"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
                tech={project.tech}
                year={project.year}
                role={project.role}
                highlights={project.highlights}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectsComponent
