'use client'
import Image from 'next/image'
import React, { useState, useTransition } from 'react'
import AboutMeImage from '../../public/images/AboutMeImage.jpg'
import TabButtonComponent from './TabButtonComponent'



const TAB_DATA = [
    {
        title: "Technologies",
        id: "Technologies",
        content: (
            <p>HTML, C#, CSS, TypeScript, PHP, JavaScript, Java, MySQL, React, React Native, Bootstrap,
            Tailwind, Unity, .NET Core</p>
        ),
    },
    {
        title: "Productivity",
        id: "Productivity",
        content: (
            <p>.NET, Azure Cloud Services, Vercel, Slack, Notion, Postman, GitHub,
            VS Code, Figma, Jira</p>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        content: (
            <p>Learn TypeScript, Learn Intermediate JavaScript, Learn React, Learn React Intro, </p>
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
            <div className="md:grid md:grid-cols-2 py-8 px-4 sm:py-16 ">
                <Image src={AboutMeImage} alt='Coding' width={500} height={500} />
                <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
                    <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                    <p className="text-base lg:text-lg">
                        I am a full stack web developer with a passion for creating
                        interactive and responsive web applications. I have experience
                        working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
                        Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
                        looking to expand my knowledge and skill set. I am a team player and
                        I am excited to work with others to create amazing applications.
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
                    <div className="mt-2 flex">
                        {TAB_DATA.find((t) => t.id === tab)?.content}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutMeComponent
