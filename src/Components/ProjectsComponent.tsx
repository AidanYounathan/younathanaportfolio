'use client'
import { motion, useInView } from 'framer-motion';
import React, { useRef, useState } from 'react'
import ProjectTagComponent from './ProjectTagComponent';
import ProjectCard from './ProjectCard';

const projectsData = [
    {
      id: 1,
      title: "Caddy Track",
      description: "Golf Club Tracking Site / Full Stack Project built in NextJS with TS",
      image: "/images/CaddyTrack.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AidanYounathan/caddytrackfrontend",
      previewUrl: "https://caddytrackfrontend.vercel.app",
    },
    {
      id: 2,
      title: "One Dex",
      description: "Pokedex web app using Pokemon API in React with TS",
      image: "/images/OneDex.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AidanYounathan/younathanapokemonapireactbuild/tree/main/pokemonapi",
      previewUrl: "https://younathanapokemonapireactbuild.vercel.app/",
    },
    {
      id: 3,
      title: "Most Influential Person",
      description: "Blog website built in React",
      image: "/images/MIP.png",
      tag: ["All", "Web"],
      gitUrl: "https://github.com/AidanYounathan/YounathanAInfluentialPersonWebsite",
      previewUrl: "https://younathan-a-influential-person-website.vercel.app/",
    },
    {
      id: 4,
      title: "Tip Calculator",
      description: "Simple Tip Calcultor built in NextJS with TS (Design Provided by Frontend Mentor)",
      image: "/images/TipCalc.png",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "https://younathan-a-tip-calculator.vercel.app/",
    },
    {
      id: 5,
      title: "Daily Dose",
      description: "In Development ",
      image: "/images/IP3.jpg",
      tag: ["All", "Mobile"],
      gitUrl: "/",
      previewUrl: "/",
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
            />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectsComponent
