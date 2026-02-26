'use client'
import Image from 'next/image'
import React, { useState, useTransition } from 'react'
import AboutMeImage from '../../public/images/AboutMeImage.jpg'
import TabButtonComponent from './TabButtonComponent'
import { CheckIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'



const TAB_DATA = [
    {
        title: "Technologies",
        id: "Technologies",
        content: (
            <div className="mt-4">
                <div className="flex flex-wrap gap-3">
                    {[
                        'TypeScript','JavaScript','React','Next.js','Node.js','Express','PostgreSQL','MySQL','Tailwind CSS','C#','.NET Core','Unity','Git'
                    ].map((tech) => (
                        <span key={tech} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1724] text-sm text-white border border-slate-700">
                            <ComputerDesktopIcon className="h-4 w-4 text-[#ADB7BE]" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Productivity",
        id: "Productivity",
        content: (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['.NET','Azure Cloud Services','Vercel','Slack','Notion','Postman','GitHub','VS Code','Figma','Jira'].map(item => (
                    <div key={item} className="flex items-start gap-2 text-[#ADB7BE]">
                        <CheckIcon className="h-5 w-5 text-primary-500 mt-1" />
                        <span className="text-white">{item}</span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <div className="mt-4">
                <ul className="list-none space-y-2 text-[#ADB7BE]">
                    {['Learn TypeScript','Learn Intermediate JavaScript','Learn React','Learn React Intro'].map(cert => (
                        <li key={cert} className="flex items-center gap-3">
                            <span className="inline-block w-2 h-2 bg-primary-500 rounded-full" />
                            <span className="text-white">{cert}</span>
                        </li>
                    ))}
                </ul>
            </div>
        ),
    },
];


const AboutMeComponent = () => {
    const [tab, setTab] = useState("Technologies");
    const [isPending, startTransition] = useTransition();

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    };
    return (
        <section className='text-white'>
            <div className="md:grid md:grid-cols-2 py-8 px-4 sm:py-16 gap-8 items-center">
                <div className="w-full flex justify-center">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <Image src={AboutMeImage} alt='Coding' width={520} height={520} className="object-cover object-center" />
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                    <p className="text-base lg:text-lg">
                        I build production web applications using TypeScript, Next.js, React, Node.js, and PostgreSQL. I focus on shipping maintainable code, improving performance, and delivering accessible user experiences. I enjoy collaborating with product and design teams to turn ideas into measurable features and improving systems through testing and observability.
                    </p>
                    <div className="flex justify-start mt-8">
                        <TabButtonComponent
                            selectTab={() => handleTabChange("Technologies")}
                            active={tab === "Technologies"}
                        >
                            {" "}
                            Technologies{" "}
                        </TabButtonComponent>
                        <TabButtonComponent
                            selectTab={() => handleTabChange("Productivity")}
                            active={tab === "Productivity"}
                        >
                            {" "}
                            Productivity{" "}
                        </TabButtonComponent>
                        <TabButtonComponent
                            selectTab={() => handleTabChange("certifications")}
                            active={tab === "certifications"}
                        >
                            {" "}
                            Certifications{" "}
                        </TabButtonComponent>
                    </div>
                    <div className="mt-4">
                        {TAB_DATA.find((t) => t.id === tab)?.content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutMeComponent
