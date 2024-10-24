import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface WorkExperienceType {
    url: string;
    position: string;
    company: string;
    duration: string;
    description: string;
}

function WorkExperience({ workExperience }: { workExperience: WorkExperienceType }) {
    return (
        <div className="flex justify-between gap-8 items-center w-full ">
            <div className="w-20 ">
                <AspectRatio ratio={1/1}>
                    <Image src={workExperience.url} className="object-cover object-center w-full h-full" alt="Muhammed" width={80} height={80} />
                </AspectRatio>
            </div>

            <div className="flex flex-col  flex-1">

                <div className="flex flex-col ">
                    <h2 className="font-[family-name:var(--font-manrope-bold)] text-2xl tracking-tighter">{workExperience.company}</h2>
                    <p className="  font-[family-name:var(--font-manrope-semi-bold)] text-lg tracking-tighter">{workExperience.position}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-black/[.5] dark:text-white/[.6] font-[family-name:var(--font-manrope-medium)] text-sm tracking-tighter">{workExperience.duration}</p>
                    <p className="text-black/[.5] dark:text-white/[.6] font-[family-name:var(--font-manrope-medium)] text-md tracking-tighter">{workExperience.description}</p>
                </div>
            </div>

        </div>
    );
}

export { WorkExperience };
export type { WorkExperienceType };