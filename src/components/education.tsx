import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

interface EducationType {
    url: string;
    degree: string;
    school: string;
    duration?: string;
    description?: string;
}
function Education({ education }: { education: EducationType }) {
    return (
        <div>
            {education.duration  && <p className="text-black/[.5] text-right dark:text-white/[.6] font-[family-name:var(--font-manrope-medium)] text-sm tracking-tighter">{education.duration}</p>}
            <div className="flex justify-between gap-8  w-full ">
                <div className="w-16 mt-3">
                    <AspectRatio ratio={1 / 1}>
                        <Image src={education.url} className="object-cover rounded-full  object-center w-full h-full" alt="school logo" width={80} height={80} />
                    </AspectRatio>
                </div>
                <div className="flex flex-col  flex-1">
                    <h2 className="font-[family-name:var(--font-manrope-bold)] text-2xl tracking-tighter">{education.school}</h2>
                    <p className="  font-[family-name:var(--font-manrope-semi-bold)] text-lg tracking-tighter">{education.degree}</p>
                </div>
                <div className="flex flex-col gap-2">
                    {education.description && <p className="text-black/[.5] dark:text-white/[.6] font-[family-name:var(--font-manrope-medium)] text-md tracking-tighter">{education.description}</p>}
                </div>
            </div>
        </div>
    );
}

export { Education };
export type { EducationType };