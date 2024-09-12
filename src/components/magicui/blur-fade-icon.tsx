

"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface BlurFadeTextProps {
    icon: React.ReactNode;
    className?: string;
    variant?: {
        hidden: { y: number };
        visible: { y: number };
    };
    duration?: number;
    characterDelay?: number;
    delay?: number;
    yOffset?: number;
    animateByCharacter?: boolean;

}
const BlurFadeIcon = ({
    className,
    variant,
    delay = 0,
    yOffset = 8,
    icon,
}: BlurFadeTextProps) => {
    const defaultVariants: Variants = {
        hidden: { y: yOffset, opacity: 0, filter: "blur(8px)" },
        visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
    };
    const combinedVariants = variant || defaultVariants;


    return (
        <div className="">
            <AnimatePresence>
                <motion.span
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={combinedVariants}
                    transition={{
                        yoyo: Infinity,
                        delay,
                        ease: "easeOut",
                    }}
                    className={cn("", className)}
                >
                    {icon}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default BlurFadeIcon;
