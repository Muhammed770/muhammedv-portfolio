import { ProjectCard, type ProjectType } from "@/components/projectCard";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFadeIcon from "@/components/magicui/blur-fade-icon";
import { WorkExperience, type WorkExperienceType } from "@/components/workExperience";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const BLUR_FADE_DELAY = 0.04;

export default function Home() {

  const workExperience: WorkExperienceType[] = [
    {
      url: "/work-experience/welkiniot.png",
      position: "frontend engineer",
      company: "welkin embedded solutions pvt ltd",
      duration: "2023 - 2024",
      description: "Developed the front-end architecture and UI design for a fleet tracking application using NextJS and TypeScript, integrated with the company's in-house IoT device.",
    },
  ]
  const projects: ProjectType[] = [
    {
      name: "welkin fleet tracking",
      description: "web application for fleet tracking, fuel usage, ac used, live location ...using iot device data",
      contentType: "photo",
      url: "/projects/welkin.png",
      techStack: ["react", "typescript", "chakra ui", "nextauth", "next.js"],
    },
    {
      name: "project 2",
      description: "this is a project",
      contentType: "photo",
      url: "/projects/welkin.png",
      techStack: ["next.js", "typescript", "tailwindcss"],
    },
    {
      name: "project 3",
      description: "web application for fleet tracking, fuel usage, ac used, live location ...using iot device data",
      contentType: "photo",
      url: "/projects/welkin.png",
      techStack: ["react", "typescript", "tailwindcss"],
    },
    {
      name: "project 3",
      description: "web application for fleet tracking, fuel usage, ac used, live location ...using iot device data",
      contentType: "photo",
      url: "/projects/welkin.png",
      techStack: ["react", "typescript", "tailwindcss"],
    },
  ]

  return (

    <div className="flex items-center justify-center ">
      <div className="max-w-xl py-8 flex flex-col gap-8">
        <div className="flex justify-between">

          <div className="flex flex-col w-[80%]">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-5xl font-[family-name:var(--font-manrope-bold)] tracking-tighter"
              yOffset={8}
              text={`hi, i’m muhammed.`}
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-2xl font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter"
              yOffset={8}
              text={"computer science engineer, building web apps and full-stack applications."}
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="w-24 h-24">
              <Image src={"/me.jpg"} className="object-cover object-center w-full h-full" alt="Muhammed" width={80} height={80} />
            </div>
          </BlurFade>
        </div>

        <div className="flex flex-col  items-center">
          <div className="flex flex-col gap-5">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
                projects
              </h1>
            </BlurFade>
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project, id) => (
                <BlurFade
                  key={project.name}
                  delay={BLUR_FADE_DELAY * 3 + id * 0.09}
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
          </div>
          <div className="flex items-start gap-1">
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 4}
              className="text-lg font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter text-clip"
              yOffset={8}
              text={"see more"}
            />
            <BlurFadeIcon
              delay={BLUR_FADE_DELAY * 5}
              icon={<FaChevronDown />}
            />

          </div>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
            work experience
          </h1>
        </BlurFade>

        {workExperience.map((work, id) => (
          <BlurFade
            key={work.company}
            delay={BLUR_FADE_DELAY * 7 + id * 0.05}
          >
            <WorkExperience key={work.company} workExperience={work} />
          </BlurFade>
        ))}


        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
            education
          </h1>
        </BlurFade>
      </div>
    </div>
  );
}
