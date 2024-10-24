import { ProjectCard, type ProjectType } from "@/components/projectCard";
import BlurFade from "@/components/magicui/blur-fade";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {

    const projects: ProjectType[] = [
        {
            name: "welkin fleet tracking",
            description: "web application for fleet tracking, fuel usage, ac used, live location ...using iot device data",
            contentType: "photo",
            url: "/projects/welkin.png",
            techStack: ["react", "typescript", "chakra ui", "nextauth", "next.js"],
        },
        {
            name: "DynamicWeb",
            description: " A custom CMS using Laravel for dynamic content management. API - based content fetching.",
            contentType: "photo",
            url: "/projects/welkin.png",
            techStack: ["laravel", "PHP", "sqlite", "tailwindcss", "alpine.js", "blade"],
        },
        {
            name: "TickGate",
            description: "NFT ticket verification and a scalable event ticket management system.",
            contentType: "photo",
            url: "/projects/welkin.png",
            techStack: ["web3", "nft", "next.js", "typescript", "tailwindcss", "firebase"],
        },
        {
            name: "IPFY",
            description: "A platform for recording intellectual property using blockchain for transparency and security",
            contentType: "photo",
            url: "/projects/welkin.png",
            techStack: ["web3", "react", "typescript", "tailwindcss", "firebase"],
        },
        {
            name: "Insta Shopee",
            description: "Progressive web apploication using astro,that can be made into ios,android apps.",
            contentType: "photo",
            url: "/projects/welkin.png",
            techStack: ["astro", "nodejs", "tailwindcss", "Strapi CMS", "socket.io", "react"],
        }
    ]

    return (

        <div className="flex items-center justify-center m-4">
            <div className="max-w-xl py-8 flex flex-col gap-8">

                <div className="flex flex-col  items-center">
                    <div className="flex flex-col gap-5">
                        <BlurFade delay={BLUR_FADE_DELAY * 1}>
                            <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
                                projects
                            </h1>
                        </BlurFade>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projects.map((project, id) => (
                                <BlurFade
                                    key={project.name}
                                    delay={BLUR_FADE_DELAY * 2 + id * 0.09}
                                >
                                    <Dialog>
                                        <DialogTrigger className="h-full flex flex-col items-start text-left">
                                            <ProjectCard key={project.name} project={project} />
                                        </DialogTrigger>
                                        <DialogContent className="backdrop:blur-lg">
                                            <ProjectCard key={project.name} project={project} />
                                        </DialogContent>
                                    </Dialog>
                                </BlurFade>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <BlurFade
                                delay={BLUR_FADE_DELAY * 3}
                            >
                            <Button asChild variant={'secondary'}>
                                <Link href={'https://github.com/Muhammed770'}>
                                    See all at GitHub
                                </Link>
                            </Button>
                            </BlurFade>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
