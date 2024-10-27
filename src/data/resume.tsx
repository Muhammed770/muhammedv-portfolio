import { WorkExperienceType } from "@/components/workExperience";
import { EducationType } from "@/components/education";
import { ProjecCardtType } from "@/components/projectCard";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMail ,IoLogoGithub,IoLogoLinkedin} from "react-icons/io5";
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
            icon: <IoLogoGithub />,
        },
        {
            name: "linkedin",
            url: "https://dub.sh/muhammed770-in",
            icon: <IoLogoLinkedin />,
        },
        {
            name: "x",
            url: "https://dub.sh/muhammed770-x",
            icon: <FaSquareXTwitter />,
        },
        {
            name: "email",
            url: "mailto:muhammedvengalath@gmail.com",
            icon: <IoMail />,
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
        techStack: ["astro","PWA", "nodejs", "tailwindcss", "Strapi CMS", "socket.io", "react"],
        githubLink:"https://github.com/Muhammed770/PWA-astro-strapi",
    },
    {
        name:"Portfolio",
        description:"My personal portfolio website built using Next.js and TailwindCSS.",
        carousel:[
            { 'video':'https://www.youtube.com/embed/D9vMcrDf2NE?si=SqAp8utemDsex0i_&playlist=D9vMcrDf2NE'},
        ],
        techStack:['next.js','typescript','tailwindcss','shadcn'],
        githubLink:"https://github.com/Muhammed770/muhammedv-portfolio",
        liveLink:"https://muhammedvengalath.vercel.app/",
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