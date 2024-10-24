import Image from "next/image";
import { Badge } from "./ui/badge";
interface ProjectType {
    name: string;
    description: string;
    contentType: "photo" | "video";
    url: string;
    techStack?: string[];
}


function ProjectCard({ project }: { project: ProjectType }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-2 h-full flex flex-col border border-black dark:border-white">
            <div className="border border-black dark:border-white p-[2px]">
                {project.contentType === "photo" ? (
                    <Image src={project.url} alt={project.name} width={900} height={600} />
                ) : (
                    <video src={project.url} controls={false} autoPlay />
                )}
            </div>
            <div className="p-2 gap-1 flex flex-col justify-between flex-1">
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
export type { ProjectType };
