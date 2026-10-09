import type { SVGProps } from "react";
import {
  SiElectron,
  SiEthereum,
  SiFastify,
  SiFirebase,
  SiMongodb,
  SiRedis,
  SiSolidity,
  SiTailwindcss,
} from "react-icons/si";
import { FaAws, FaMicrosoft, FaSalesforce } from "react-icons/fa6";
import { GrOracle } from "react-icons/gr";
import { ListOrdered, RefreshCw, ScanEye, Sparkles } from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

export const Electron = ({ className }: IconProps) => (
  <SiElectron className={className} color="#47848F" />
);
export const Tailwind = ({ className }: IconProps) => (
  <SiTailwindcss className={className} color="#06B6D4" />
);
export const Redis = ({ className }: IconProps) => (
  <SiRedis className={className} color="#FF4438" />
);
export const Mongodb = ({ className }: IconProps) => (
  <SiMongodb className={className} color="#47A248" />
);
export const Firebase = ({ className }: IconProps) => (
  <SiFirebase className={className} color="#FFCA28" />
);
export const Solidity = ({ className }: IconProps) => (
  <SiSolidity className={className} />
);
export const Web3 = ({ className }: IconProps) => (
  <SiEthereum className={className} color="#627EEA" />
);
export const Queue = ({ className }: IconProps) => (
  <ListOrdered className={className} color="#E0234E" />
);
export const ComputerVision = ({ className }: IconProps) => (
  <ScanEye className={className} color="#8B5CF6" />
);
export const Fastify = ({ className }: IconProps) => (
  <SiFastify className={className} />
);
export const PowerSync = ({ className }: IconProps) => (
  <RefreshCw className={className} color="#0EA5E9" />
);
export const Aws = ({ className }: IconProps) => (
  <FaAws className={className} color="#FF9900" />
);
export const Salesforce = ({ className }: IconProps) => (
  <FaSalesforce className={className} color="#00A1E0" />
);
export const Microsoft = ({ className }: IconProps) => (
  <FaMicrosoft className={className} color="#0078D4" />
);
export const Oracle = ({ className }: IconProps) => (
  <GrOracle className={className} color="#C74634" />
);
export const AI = ({ className }: IconProps) => (
  <Sparkles className={className} color="#D97757" />
);
