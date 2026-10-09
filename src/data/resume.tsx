import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import {
  AI,
  Electron,
  Firebase,
  MachineLearning,
  Mongodb,
  Queue,
  Redis,
  Solidity,
  Tailwind,
  Web3,
} from "@/components/ui/svgs/brands";

export const DATA = {
  name: "Muhammed Vengalath",
  initials: "MV",
  url: "https://muhammedvengalath.vercel.app",
  location: "Dubai, UAE",
  locationLink: "https://www.google.com/maps/place/dubai",
  description:
    "Full stack engineer in Dubai, building ChequeEazy at Direct Axis Technology.",
  summary:
    "I'm a full stack engineer at [Direct Axis Technology](https://acodax.com) in Dubai, where I work on [ChequeEazy](#projects), a cheque printing and management platform, and build web apps, webhooks, queue systems and APIs with Next.js, Node.js, MongoDB, Redis and BullMQ. Before that I was a frontend engineer at Welkin Embedded Solutions, building a fleet tracking app on top of the company's own IoT devices. I studied [Computer Science and Engineering at GEC Thrissur](https://gectcr.ac.in), shipped a few Web3 projects at hackathons, and I [write notes](/notes) about things I figure out along the way.",
  // Hover cards for links in the summary, keyed by the link's href.
  linkPreviews: {
    "https://acodax.com": {
      title: "Acodax",
      description:
        "Cloud ERP for the UAE, Saudi Arabia and the GCC. Accounting, VAT, inventory, CRM, HR and payroll with the Aira AI assistant, in one system.",
      images: ["/previews/acodax.jpg"],
    },
    "#projects": {
      title: "ChequeEazy",
      description:
        "Cheque printing and management for finance teams, with print-perfect layouts for 60+ UAE banks and AI that scans a cheque and picks the template.",
      images: [
        "/projects/chequeeazy/app-home.jpg",
        "/projects/chequeeazy/app-banks.jpg",
        "/projects/chequeeazy/app-fill-cheque.jpg",
      ],
    },
    "https://gectcr.ac.in": {
      title: "Government Engineering College Thrissur",
      description:
        "A legacy of nurturing engineering talent since 1957, producing distinguished alumni across the globe.",
      images: ["/previews/gectcr.jpg"],
    },
    "/notes": {
      title: "Notes",
      description: "Setup guides, fixes and things I figured out while building.",
      images: ["/previews/notes.jpg"],
    },
  },
  avatarUrl: "/avatar.jpg",
  github: "Muhammed770",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Electron", icon: Electron },
    { name: "Tailwind CSS", icon: Tailwind },
    { name: "Redis", icon: Redis },
    { name: "BullMQ", icon: Queue },
    { name: "MongoDB", icon: Mongodb },
    { name: "Firebase", icon: Firebase },
    { name: "AI integrations", icon: AI },
    { name: "ML training", icon: MachineLearning },
    { name: "Web3", icon: Web3 },
    { name: "Solidity", icon: Solidity },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/notes", icon: NotebookIcon, label: "Notes" },
  ],
  contact: {
    email: "muhammedvengalath@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/muhammed770-github",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/muhammed770-in",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/muhammed770-x",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:muhammedvengalath@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Direct Axis Technology (Acodax)",
      href: "https://acodax.com",
      badges: [],
      location: "Dubai, UAE",
      title: "Full Stack Engineer",
      logoUrl: "/work-experience/daxis.png",
      start: "2024",
      end: "Present",
      description:
        "Working on ChequeEazy, a cheque printing and management platform. Developing and maintaining web applications, webhooks, queue systems and APIs with Next.js, Node.js, MongoDB, Redis and BullMQ.",
    },
    {
      company: "Welkin Embedded Solutions",
      href: "",
      badges: [],
      location: "India",
      title: "Frontend Engineer",
      logoUrl: "/work-experience/welkiniot.png",
      start: "2022",
      end: "2023",
      description:
        "Built the front-end architecture and UI for a fleet tracking application in Next.js and TypeScript, integrated with the company's in-house IoT device.",
    },
  ],
  education: [
    {
      school: "Government Engineering College, Thrissur",
      href: "https://gectcr.ac.in",
      degree: "B.Tech in Computer Science and Engineering",
      logoUrl: "/education/gect.png",
      start: "",
      end: "",
    },
  ],
  projects: [
    {
      title: "ChequeEazy",
      href: "",
      dates: "2024 - Present",
      active: true,
      description:
        "Cheque printing and management platform for enterprise finance teams. Print-perfect layouts for 60+ UAE bank cheques, batch printing, receipt vouchers, cheque reports and role-based permissions. **Aira**, the built-in AI, scans a cheque, detects the bank and layout, and loads a print-ready template in one click.",
      technologies: [
        "Desktop App",
        "AI Layout Detection",
        "OCR",
        "Salesforce CRM",
        "Batch Printing",
      ],
      links: [],
      image: "/projects/chequeeazy/poster.jpg",
      video: "/projects/chequeeazy/promo.mp4",
    },
    {
      title: "Welkin Fleet Tracking",
      href: "https://www.youtube.com/watch?v=VB2-ilTh_xI",
      dates: "2022 - 2023",
      active: false,
      description:
        "Fleet tracking web app powered by data from in-house IoT devices: live location, routes, fuel usage, AC usage and vehicle status.",
      technologies: ["Next.js", "React", "TypeScript", "Chakra UI", "NextAuth"],
      links: [
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=VB2-ilTh_xI",
          icon: <Icons.youtube className="size-3" />,
        },
      ],
      image: "/projects/welkin/welkin.png",
      video: "",
    },
    {
      title: "TickGate",
      href: "https://tickgate-weavedb.vercel.app/",
      dates: "",
      active: false,
      description:
        "NFT ticket verification and a scalable event ticket management system.",
      technologies: ["Web3", "NFT", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      links: [
        {
          type: "Website",
          href: "https://tickgate-weavedb.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=9zdkXq6AD98",
          icon: <Icons.youtube className="size-3" />,
        },
      ],
      image: "/projects/thumbs/tickgate.jpg",
      video: "",
    },
    {
      title: "DynamicWeb",
      href: "https://github.com/Muhammed770/DynamicWeb",
      dates: "2024",
      active: false,
      description:
        "A custom CMS built with Laravel for dynamic content management, with API-based content fetching.",
      technologies: ["Laravel", "PHP", "SQLite", "Tailwind CSS", "Alpine.js", "Blade"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Muhammed770/DynamicWeb",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=_ucV-09aSEg",
          icon: <Icons.youtube className="size-3" />,
        },
      ],
      image: "/projects/thumbs/dynamicweb.jpg",
      video: "",
    },
    {
      title: "Insta Shopee",
      href: "https://github.com/Muhammed770/PWA-astro-strapi",
      dates: "2024",
      active: false,
      description:
        "Progressive web app built with Astro and Strapi CMS that can be packaged as iOS and Android apps, with real-time updates over socket.io.",
      technologies: ["Astro", "PWA", "Node.js", "Strapi CMS", "socket.io", "React", "Tailwind CSS"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Muhammed770/PWA-astro-strapi",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=rJBo3uBul5o",
          icon: <Icons.youtube className="size-3" />,
        },
      ],
      image: "/projects/thumbs/instashopee.jpg",
      video: "",
    },
    {
      title: "Justice Protocol",
      href: "https://github.com/Shiyasmohd/justice-protocol",
      dates: "2023",
      active: false,
      description: "A justice system for network states, built on Web3.",
      technologies: ["Web3", "TypeScript", "Next.js", "React", "Huddle01", "Waku"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Shiyasmohd/justice-protocol",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Video",
          href: "https://www.youtube.com/watch?v=Ak1uWumwIAg",
          icon: <Icons.youtube className="size-3" />,
        },
      ],
      image: "/projects/justiceprotocol/justice-protocol.webp",
      video: "",
    },
    {
      title: "IPFY",
      href: "https://devfolio.co/projects/ipfy-091a",
      dates: "",
      active: false,
      description:
        "A platform for recording intellectual property on the blockchain, for transparency and security.",
      technologies: ["Web3", "React", "Ethers.js", "Solidity", "TypeScript", "Tailwind CSS", "Firebase"],
      links: [
        {
          type: "Devfolio",
          href: "https://devfolio.co/projects/ipfy-091a",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/projects/ipfy/ipfy1.png",
      video: "",
    },
    {
      title: "Portfolio",
      href: "https://github.com/Muhammed770/muhammedv-portfolio",
      dates: "",
      active: true,
      description:
        "This site. Built on the Magic UI portfolio template with Next.js, Tailwind CSS and MDX notes, plus a live GitHub activity section.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Magic UI", "MDX"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Muhammed770/muhammedv-portfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/portfolio/cover.jpg",
      video: "",
    },
  ],
} as const;
