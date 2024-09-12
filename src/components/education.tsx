import Image from "next/image";

interface EducationType {
    url: string;
    degree: string;
    school: string;
    duration: string;
    description?: string;
}
function Education({ education }: { education: EducationType }) {
    return (
        <div className="flex justify-between gap-8">
            <div className="w-24 h-24 overflow-hidden">
                <Image src={education.url} className="object-cover object-center w-full h-full" alt="Muhammed" width={80} height={80} />
            </div>
            <div className="flex flex-col ">
                <h2 className="font-[family-name:var(--font-manrope-bold)] text-2xl tracking-tighter">{education.school}</h2>
                <p className="  font-[family-name:var(--font-manrope-semi-bold)] text-lg tracking-tighter">{education.degree}</p>
            </div>

        </div>
    );
}

export { Education };
export type { EducationType };