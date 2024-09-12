import Image from "next/image";

interface WorkExperienceType {
    url: string;
    position: string;
    company: string;
    duration: string;
    description: string;
}

function WorkExperience({ workExperience }: { workExperience: WorkExperienceType }) {
    return (
        <div className="flex justify-between gap-8">
            <div className="w-24 h-24 overflow-hidden">
                <Image src={"/me.jpg"} className="object-cover object-center w-full h-full" alt="Muhammed" width={80} height={80} />
            </div>
            <div className="flex flex-col ">
                <h2 className="font-[family-name:var(--font-manrope-bold)] text-2xl tracking-tighter">{workExperience.company}</h2>
                <p className="  font-[family-name:var(--font-manrope-semi-bold)] text-lg tracking-tighter">{workExperience.position}</p>
            </div>

        </div>
    );
}

export { WorkExperience };
export type { WorkExperienceType };