import { ProjectCard } from "@/components/projectCard";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFadeIcon from "@/components/magicui/blur-fade-icon";
import { WorkExperience } from "@/components/workExperience";
import { Education } from "@/components/education";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { projects, workExperience, education } from "@/data/resume";
import { personalInfo } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { getAllNotes } from "@/lib/notes";
const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  const notes = getAllNotes().slice(0, 2); // Get latest 2 notes

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (

    <div className="flex items-center justify-center mb-4">
      <div className="w-full max-w-xl py-8 flex flex-col gap-8 px-4 sm:px-0">
        <div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">

            <div className="flex flex-col max-w-md">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl md:text-5xl font-[family-name:var(--font-manrope-bold)] tracking-tighter"
                yOffset={8}
                text={personalInfo.intro}
              />
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-xl md:text-2xl font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter"
                yOffset={8}
                text={personalInfo.about}
              />
              <div className="flex items-center justify-start gap-4">
                {personalInfo.socials.map((social, id) => (
                  <Link key={social.name} href={social.url}  >
                    <BlurFadeIcon
                      key={social.name}
                      delay={BLUR_FADE_DELAY * 9 + id * 0.05}
                      icon={social.icon}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <Image src={"/me.png"} className="object-cover object-center w-full h-full rounded-full" alt="Muhammed" width={80} height={80} />
              </div>
            </BlurFade>
          </div>

        </div>



        <div className="flex flex-col  items-center">
          <div className="flex flex-col gap-5">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
                projects
              </h1>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((project, id) => (
                <BlurFade
                  key={project.name}
                  delay={BLUR_FADE_DELAY * 6 + id * 0.09}
                >
                  <Dialog>
                    <DialogTrigger className="h-full flex flex-col items-start text-left">
                      <ProjectCard key={project.name} project={project} isModal={false} />
                    </DialogTrigger>
                    <DialogContent className="backdrop:blur-lg">
                      <ProjectCard key={project.name} project={project} isModal />
                    </DialogContent>
                  </Dialog>
                </BlurFade>
              ))}
            </div>
          </div>

          <div className="flex mt-2 gap-1 items-center">
            <Link href="/projects" className="flex gap-2">
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 7}
                className="text-lg font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter text-clip"
                yOffset={8}
                text={"see more"}
              />
              <BlurFadeIcon
                delay={BLUR_FADE_DELAY * 8}
                icon={<FaChevronDown />}
              />
            </Link>

          </div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-5">
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
                  notes
                </h1>
              </BlurFade>
              {notes.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {notes.map((note, id) => (
                    <BlurFade
                      key={note.slug}
                      delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                    >
                      <Link
                        href={`/notes/${note.slug}`}
                        className="block group"
                      >
                        <h2 className="text-2xl font-[family-name:var(--font-manrope-bold)] tracking-tighter mb-1 group-hover:underline transition-all">
                          {note.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(note.date)}
                        </p>
                      </Link>
                    </BlurFade>
                  ))}
                </div>
              ) : null}
              <div className="flex mt-2 gap-1 items-center justify-center">
                <Link href="/notes" className="flex gap-2">
                  <BlurFadeText
                    delay={BLUR_FADE_DELAY * 3}
                    className="text-lg font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter text-clip"
                    yOffset={8}
                    text={"see more"}
                  />
                  <BlurFadeIcon
                    delay={BLUR_FADE_DELAY * 4}
                    icon={<FaChevronDown />}
                  />
                </Link>
              </div>
            </div>
          </div>


          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
              skills
            </h1>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {
              personalInfo.skills.map((skills, id) => (
                <BlurFade
                  key={skills}
                  delay={BLUR_FADE_DELAY * 9 + id * 0.05}
                >
                  <Badge key={skills} variant={'default'}>{skills}</Badge>
                </BlurFade>
              ))
            }
          </div>
        </div>

        <div>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
              work experience
            </h1>
          </BlurFade>

          {workExperience.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 11 + id * 0.05}
            >
              <WorkExperience key={work.company} workExperience={work} />
            </BlurFade>
          ))}
        </div>

        <div>
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
              education
            </h1>
          </BlurFade>
          {education.map((edu, id) => (
            <BlurFade
              key={edu.school}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
              <Education key={edu.school} education={edu} />
            </BlurFade>
          ))}
        </div>

        <div>
          <BlurFade delay={BLUR_FADE_DELAY * 12} className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-[family-name:var(--font-manrope-bold)] tracking-tighter ">
              get in touch
            </h1>
            <h1 className="text-md font-[family-name:var(--font-manrope-semi-bold)] tracking-tighter ">
              Shoot me a message on <Link href="https://dub.sh/muhammed770-in" className=" underline underline-offset-1">linkedin here</Link>
            </h1>
          </BlurFade>


          <div className="flex items-center justify-center gap-4">
            {personalInfo.socials.map((social, id) => (
              <Link key={social.name} href={social.url}  >
                <BlurFadeIcon
                  key={social.name}
                  delay={BLUR_FADE_DELAY * 13 + id * 0.05}
                  icon={social.icon}
                />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
