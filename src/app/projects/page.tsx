import { ProjectCard } from "@/components/projectCard";
import BlurFade from "@/components/magicui/blur-fade";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projects } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
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
                                            <ProjectCard key={project.name} project={project} isModal/>
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
