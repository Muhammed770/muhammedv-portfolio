import { WorkExperienceType } from "@/components/workExperience";
import { EducationType } from "@/components/education";
import { ProjecCardtType } from "@/components/projectCard";

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
            { 'photo': '/projects/welkin.png' },
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
        demoVideo: "https://youtu.be/_ucV-09aSEg&wadsworth=1",
    },
    {
        name: "TickGate",
        description: "NFT ticket verification and a scalable event ticket management system.",
        carousel: [
            { 'video':'https://www.youtube.com/embed/QohH89Eu5iM?si=GG6jouz3KYcqyuQf&autoplay=1&controls=0&mute=1&loop=1&playlist=QohH89Eu5iM'},
            { 'photo': '/projects/welkin.png' },
            { 'photo': '/projects/welkin.png' },
            { 'video': 'https://www.youtube.com/embed/_ucV-09aSEg?si=YeFz_CFH_ZA3BJ3o&autoplay=1&controls=0&mute=1' }
        ],
        techStack: ["web3", "nft", "next.js", "typescript", "tailwindcss", "firebase"],
    },
    {
        name: "IPFY",
        description: "A platform for recording intellectual property using blockchain for transparency and security",
        carousel: [
            { 'photo': '/projects/welkin.png' },
            { 'photo': '/projects/welkin.png' },
            { 'photo': '/projects/welkin.png' },
            { 'video': 'https://www.youtube.com/embed/_ucV-09aSEg?si=YeFz_CFH_ZA3BJ3o&autoplay=1&controls=0&mute=1' }
        ],
        techStack: ["web3", "react", "typescript", "tailwindcss", "firebase"],
    },
    {
        name: "Insta Shopee",
        description: "Progressive web apploication using astro,that can be made into ios,android apps.",
        carousel: [
            { 'photo': '/projects/welkin.png' },
        ],
        techStack: ["astro", "nodejs", "tailwindcss", "Strapi CMS", "socket.io", "react"],
    }
]