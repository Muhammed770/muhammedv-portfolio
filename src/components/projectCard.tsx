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
        <div className="bg-slate-950 dark:bg-white p-1">
            <div>
                {project.contentType === "photo" ? (
                    <Image src={project.url} alt={project.name} width={900} height={600} />
                ) : (
                    <video src={project.url} controls={false} autoPlay />
                )}
            </div>
            <div className="p``-2">
            <div>
                {project.techStack?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="m-1">
                        {tech}
                    </Badge>
                ))}
            </div>
                <h2 className=" text-white dark:text-slate-950 font-[family-name:var(--font-manrope-bold)] text-[1.65rem] tracking-tighter">{project.name}</h2>
                <p className=" text-gray-200 dark:text-slate-950 font-[family-name:var(--font-manrope-semi-bold)] text-2xl tracking-tighter">{project.description}</p>
            </div>
        </div>
    );
}

export { ProjectCard };
export type { ProjectType };
