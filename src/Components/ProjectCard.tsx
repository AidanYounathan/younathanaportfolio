'use client'
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

interface ProjectCardProps {
    imgUrl: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl: string;
    tech?: string[];
    year?: string;
    role?: string;
    highlights?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imgUrl, title, description, gitUrl, previewUrl, tech = [], year, role, highlights = [] }) => {
    return (
        <div>
            <div className="h-52 md:h-72 rounded-t-xl relative group overflow-hidden">
                <Image src={imgUrl} alt={`${title} screenshot`} fill className="object-cover object-center" />
                <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
                    <Link
                        href={gitUrl} target='_blank'
                        className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                    >
                        <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
                    </Link>
                    <Link
                        href={previewUrl} target='_blank'
                        className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                    >
                        <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
                    </Link>
                </div>
            </div>
            <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
                <h5 className="text-xl font-semibold mb-2">{title}</h5>
                {year || role ? (
                    <div className="text-sm text-[#ADB7BE] mb-2">{year ? year : ''}{year && role ? ' · ' : ''}{role ? role : ''}</div>
                ) : null}
                <p className="text-[#ADB7BE] mb-3">{description}</p>
                {tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tech.map((t) => (
                            <span key={t} className="text-xs px-2 py-1 bg-[#0f1724] rounded-full border border-slate-700">{t}</span>
                        ))}
                    </div>
                )}
                {highlights.length > 0 && (
                    <ul className="list-disc ml-5 text-[#ADB7BE]">
                        {highlights.slice(0,3).map((h) => (
                            <li key={h} className="text-sm text-white">{h}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default ProjectCard
