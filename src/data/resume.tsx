import { WorkExperienceType } from "@/components/workExperience";
import { EducationType } from "@/components/education";
import { ProjecCardtType } from "@/components/projectCard";

interface PersonalInfoType {
    name: string;
    intro: string;
    about: string;
    email: string;
    location: string;
    socials: {
        name: string;
        url: string;
        icon: JSX.Element;
    }[];
    skills: string[];
}
export const personalInfo: PersonalInfoType = {
    name: "Muhammed Vengalath",
    intro: "hi, i’m muhammed.",
    about: "Computer Science Engineer, building web apps and full-stack applications.",
    email: "muhammedvengalath@gmail.com",
    location:"Dubai, UAE",
    socials: [
        {
            name: "github",
            url: "https://dub.sh/muhammed770-github",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-4.243 1.5-4.243-2.5-6-3m12 0c-1.757 1-1.757 4.5-6 3m6-3l-6 3-6-3" />
            </svg>
        },
        {
            name: "linkedin",
            url: "https://dub.sh/muhammed770-in",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10v4a2 2 0 01-2 2h-4v-6h4a1 1 0 011-1V8a1 1 0 00-1-1c-1.333 0-2 .667-3 1v4a1 1 0 01-1 1H9a1 1 0 01
            -1-1V8a1 1 0 00-1-1 3 3 0 00-3 3v6a3 3 0 003 3h4a3 3 0 003-3v-4a1 1 0 011-1h1" />
            </svg>
        },
        {
            name: "x",
            url: "https://dub.sh/muhammed770-x",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        },
    ]
    ,
    skills: [
        "React",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Firebase",
        "Web3",
        "Solidity",
    ]
}

export const workExperience: WorkExperienceType[] = [
    {
        url: "/work-experience/welkiniot.png",
        position: "frontend engineer",
        company: "welkin embedded solutions pvt ltd",
        duration: "2022 - 2023",
        description: "Developed the front-end architecture and UI design for a fleet tracking application using NextJS and TypeScript, integrated with the company's in-house IoT device.",
    },
]

export const education: EducationType[] = [
    {
        url: "/education/gect.png",
        degree: "Bachelor of Technology in Computer Science and Engineering",
        school: "Government Engineering College, Thrissur",
        duration: "2020 - 2024",
    },
]
export const projects: ProjecCardtType[] = [
    {
        name: "welkin fleet tracking",
        description: "web application for fleet tracking, fuel usage, ac used, live location ...using iot device data",
        carousel: [
            { 'video':'https://www.youtube.com/embed/VB2-ilTh_xI?si=sEd2Djjo-QtgqgP8&playlist=VB2-ilTh_xI'},
            { 'video':'https://www.youtube.com/embed/AGf_BA54d7g?si=I8ANYFlB0xpdFp4p&playlist=AGf_BA54d7g'},
            { 'photo': '/projects/welkin/welkin.png' },
        ],
        techStack: ["react", "typescript", "chakra ui", "nextauth", "next.js"],
    },
    {
        name: "DynamicWeb",
        description: " A custom CMS using Laravel for dynamic content management. API - based content fetching.",

        carousel: [
            { 'video': 'https://www.youtube.com/embed/_ucV-09aSEg?si=YeFz_CFH_ZA3BJ3o&playlist=_ucV-09aSEg' },
            { 'video': 'https://www.youtube.com/embed/YLGLpzT7Ois?si=SqAhBFE5joqah8vj&playlist=YLGLpzT7Ois' },
        ],
        techStack: ["laravel", "PHP", "sqlite", "tailwindcss", "alpine.js", "blade"],
        githubLink:"https://github.com/Muhammed770/DynamicWeb",
    },
    {
        name: "TickGate",
        description: "NFT ticket verification and a scalable event ticket management system.",
        carousel: [
            { 'video':'https://www.youtube.com/embed/9zdkXq6AD98?si=yJj-JI806_AiGchm&playlist=9zdkXq6AD98'},
        ],
        liveLink:'https://tickgate-weavedb.vercel.app/',
        techStack: ["web3", "nft", "next.js", "typescript", "tailwindcss", "firebase"],
    },
    {
        name: "Insta Shopee",
        description: "Progressive web apploication using astro,that can be made into ios,android apps.",
        carousel: [
            { 'video':'https://www.youtube.com/embed/rJBo3uBul5o?si=f6M0D7mvoqqpt6wO&playlist=rJBo3uBul5o'},
        ],
        techStack: ["astro", "nodejs", "tailwindcss", "Strapi CMS", "socket.io", "react"],
        githubLink:"https://github.com/Muhammed770/PWA-astro-strapi",
    },
    {
        name:'Justice Protocol',
        description:'Justice System for Network State.',
        carousel:[
            {'photo': '/projects/justiceprotocol/justice-protocol.webp'},
        ],
        techStack: ["web3","typescript","nextjs","rectJS","Huddle01","waku"],
        githubLink:"https://github.com/Shiyasmohd/justice-protocol",
        demoVideo:"https://www.youtube.com/watch?v=Ak1uWumwIAg",
    },
    {
        name: "IPFY",
        description: "A platform for recording intellectual property using blockchain for transparency and security",
        carousel: [
            { 'photo': '/projects/ipfy/ipfy1.png' },
            { 'photo': '/projects/ipfy/ipfy2.png' },
        ],
        devfolioLink:'https://devfolio.co/projects/ipfy-091a',
        techStack: ["web3", "react","Ether.js","solidity", "typescript", "tailwindcss", "firebase"],
    },
]