import type { SVGProps } from "react";
import {
  SiElectron,
  SiEthereum,
  SiFirebase,
  SiMongodb,
  SiRedis,
  SiSolidity,
  SiTailwindcss,
} from "react-icons/si";
import { BrainCircuit, ListOrdered, Sparkles } from "lucide-react";

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
export const MachineLearning = ({ className }: IconProps) => (
  <BrainCircuit className={className} color="#8B5CF6" />
);
export const AI = ({ className }: IconProps) => (
  <Sparkles className={className} color="#D97757" />
);
