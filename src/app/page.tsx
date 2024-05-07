'use client'
import HeroComponent from "@/Components/HeroComponent";
import Image from "next/image";
import NavbarComponent from '@/Components/NavbarComponent'
import AboutMeComponent from "@/Components/AboutMeComponent";
import ProjectsComponent from "@/Components/ProjectsComponent";
import EmailComponent from "@/Components/EmailComponent";
import  FooterComponent  from  "@/Components/FooterComponent"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  bg-[#121212]">
      <NavbarComponent/>
      <div className="container mx-auto mt-24 px-12 py-4">
        <HeroComponent/>
        <AboutMeComponent/>
        <ProjectsComponent/>
        <EmailComponent/>
        <FooterComponent/>
      </div>
      
    </main>
  );
}
