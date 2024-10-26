import { ProjectCard } from "@/components/projectCard";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFadeIcon from "@/components/magicui/blur-fade-icon";
import { WorkExperience} from "@/components/workExperience";
import { Education } from "@/components/education";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { projects, workExperience, education } from "@/data/resume";
import { personalInfo } from "@/data/resume";
const BLUR_FADE_DELAY = 0.04;

export default function Home() {

  return (

    <div className="flex items-center justify-center m-4">
      <div className="max-w-xl py-8 flex flex-col gap-8">
        <div className="flex justify-between">

          <div className="flex flex-col max-w-md">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-5xl font-[family-name:var(--font-manrope-bold)] tracking-tighter"
              yOffset={8}
              text={personalInfo.intro}
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-2xl font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter"
              yOffset={8}
              text={personalInfo.about}
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="w-24 h-24">
              <Image src={"/me.jpg"} className="object-cover object-center w-full h-full  " alt="Muhammed" width={80} height={80} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((project, id) => (
                <BlurFade
                  key={project.name}
                  delay={BLUR_FADE_DELAY * 3 + id * 0.09}
                >
                  <Dialog>
                    <DialogTrigger className="h-full flex flex-col items-start text-left">
                      <ProjectCard key={project.name} project={project} isModal={false}/>
                    </DialogTrigger>
                    <DialogContent className="backdrop:blur-lg">
                      <ProjectCard key={project.name} project={project} isModal/>
                    </DialogContent>
                  </Dialog>
                </BlurFade>
              ))}
            </div>
          </div>
          
          <div className="flex items-start gap-1">
            <Link href="/projects" className="flex gap-2">
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 5}
                className="text-lg font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter text-clip"
                yOffset={8}
                text={"see more"}
              />
              <BlurFadeIcon
                delay={BLUR_FADE_DELAY * 6}
                icon={<FaChevronDown />}
              />
            </Link>

          </div>
        </div>
        <div>

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
        </div>

        <div>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
              education
            </h1>
          </BlurFade>
          {education.map((edu, id) => (
            <BlurFade
              key={edu.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <Education key={edu.school} education={edu} />
            </BlurFade>
          ))}
        </div>

      </div>
    </div>
  );
}
