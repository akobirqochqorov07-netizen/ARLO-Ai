"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const TARGET_TEXT = "A R L O";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("X T R Q");

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setText(prev =>
                prev.split("")
                    .map((letter, index) => {
                        if (index < iterations) return TARGET_TEXT[index] || " ";
                        return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
                    })
                    .join("")
            );

            if (iterations >= TARGET_TEXT.length) {
                clearInterval(interval);
                setTimeout(() => setLoading(false), 1200); // Wait a bit after decryption
            }
            iterations += 1 / 4; // Speed of decryption
        }, 40);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loader"
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} // smooth cinematic easing
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono pointer-events-none overflow-hidden"
                >
                    {/* Subtle glowing core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 mix-blend-screen rounded-full blur-[100px]" />

                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-white text-6xl md:text-8xl font-black tracking-[16px] md:tracking-[32px] z-10 flex text-center ml-[16px] md:ml-[32px]"
                    >
                        {text}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-[10px] text-gray-500 mt-8 tracking-[5px] uppercase relative"
                    >
                        <span className="animate-pulse relative z-10">Neural Link Establishing</span>
                        {/* Scanline passing over text */}
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute top-0 left-0 w-8 h-full bg-white/20 blur-sm skew-x-12 z-20"
                        />
                    </motion.div>

                    {/* Progress bar line */}
                    <div className="absolute bottom-10 w-64 h-[1px] bg-white/10">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "circIn" }}
                            className="h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
