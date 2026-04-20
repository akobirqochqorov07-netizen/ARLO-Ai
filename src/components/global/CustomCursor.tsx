"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [text, setText] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
                setText("CLICK");
            } else if (target.closest('.robot-hoverable')) {
                setIsHovering(true);
                setText("HI! 👋");
            } else {
                setIsHovering(false);
                setText("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full z-[100] pointer-events-none"
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            />

            <motion.div
                className="fixed top-0 left-0 border border-purple-500/50 rounded-full z-[99] pointer-events-none flex items-center justify-center text-[10px] font-bold text-purple-400 overflow-hidden"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    width: isHovering ? 80 : 40,
                    height: isHovering ? 80 : 40,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: isHovering ? "rgba(91, 78, 232, 0.1)" : "transparent",
                    backdropFilter: isHovering ? "blur(4px)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <AnimateTextPresence text={text} />
            </motion.div>
        </>
    );
}

function AnimateTextPresence({ text }: { text: string }) {
    // Simple fade scale transition for text
    return (
        <motion.span
            key={text}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute whitespace-nowrap"
        >
            {text}
        </motion.span>
    )
}
