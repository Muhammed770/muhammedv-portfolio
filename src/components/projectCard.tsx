import Image from "next/image";
import { Badge } from "./ui/badge";
import { AspectRatio } from "./ui/aspect-ratio";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
interface CarouselContentType {
    photo?: string;
    video?: string;
}
interface ProjecCardtType {
    name: string;
    description: string;
    carousel: CarouselContentType[];
    techStack?: string[];
    demoVideo?: string;
    liveLink?: string;
    githubLink?: string;
    devfolioLink?: string;
}


function ProjectCard({ project, isModal }: { project: ProjecCardtType, isModal?: boolean }) {

 

    return (
        <div className="bg-white dark:bg-zinc-900 p-2 h-full flex flex-col items-start border border-black dark:border-white">

            <div className="border border-black dark:border-white w-full overflow-hidden ">
                {
                    isModal ? <Carousel
                     
                    >
                        <CarouselContent>
                            {project.carousel.map((item, index) => (
                                <CarouselItem key={index}>
                                    {item.photo && (
                                        <div className="w-full">
                                            <AspectRatio ratio={16 / 9} className="overflow-hidden ">
                                                <Image src={item.photo} alt={"project screenshot"} width={900} height={600} className="object-cover object-center w-full h-full" />
                                            </AspectRatio>
                                        </div>
                                    )}
                                    {item.video && (<div className="w-full ">
                                        <AspectRatio ratio={16 / 9} className=" youtube-container">
                                            <iframe
                                                className="object-cover object-center w-full h-full"
                                                src={`${item.video}&autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0`} title="YouTube video player"  allowFullScreen={false}>
                                            </iframe>
                                        </AspectRatio>
                                    </div>)}
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="ml-14 max-sm:hidden rounded-none bg-white dark:bg-black " />
                        <CarouselNext className="mr-14 max-sm:hidden rounded-none backdrop-invert-0 bg-white dark:bg-black" />

                    </Carousel> : (
                        project.carousel[0].photo ? <AspectRatio ratio={16 / 9} className="overflow-hidden ">
                                <Image src={project.carousel[0].photo} alt={"project screenshot"} width={900} height={600} className="object-cover object-center w-full h-full "/>
                        </AspectRatio> : <AspectRatio ratio={16 / 9} className="youtube-container">
                            <iframe
                                        className="object-cover object-center w-full h-full"
                                src={`${project.carousel[0].video}&autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0`} title="YouTube video player"  allowFullScreen={false}>
                            </iframe>
                        </AspectRatio>
                    )
                }
            </div>
            <div className="p-2 gap-1 flex flex-col items-start justify-between flex-1 w-full">
                {isModal && <div className="flex flex-row-reverse w-full gap-4 ">
                    {project.demoVideo && (
                        <a href={project.demoVideo} target="_blank" rel="noopener noreferrer">
                            <Badge variant={'secondary'}>Demo</Badge>
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <Badge>Live</Badge>
                        </a>
                    )}
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Badge>GitHub</Badge>
                        </a>
                    )}
                    {project.devfolioLink && (
                        <a href={project.devfolioLink} target="_blank" rel="noopener noreferrer">
                            <Badge>Devfolio</Badge>
                        </a>
                    )}
                </div>}
                <div>
                    <h2 className="  font-[family-name:var(--font-manrope-bold)] text-[1.65rem] tracking-tighter">{project.name}</h2>
                    <p className="text-black/[.5] dark:text-white/[.6] font-[family-name:var(--font-manrope-semi-bold)] text-xl tracking-tighter">{project.description}</p>
                </div>
                <div className="">
                    {project.techStack?.map((tech) => (
                        <Badge key={tech}  >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { ProjectCard };
export type { ProjecCardtType };

