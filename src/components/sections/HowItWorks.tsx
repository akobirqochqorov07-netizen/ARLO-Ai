"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRobot } from "@/components/global/RobotContext";
import { getAssetPath } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const { selectedRobot } = useRobot();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Connect visual glowing beam logic
            gsap.fromTo(
                ".data-beam",
                { scaleX: 0, transformOrigin: "left" },
                {
                    scaleX: 1,
                    scrollTrigger: {
                        trigger: ".device-container",
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen bg-black py-40 overflow-hidden px-4 md:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <div className="text-center mb-24 relative z-10 w-full flex flex-col items-center">
                    <div className="glassmorphism px-8 py-2 border-white/10 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase mb-8 text-white/50">
                        Protocol Verification
                    </div>
                    <h2 className="text-5xl md:text-[6rem] leading-[0.9] font-black tracking-tighter text-white uppercase text-center mb-6">
                        SEAMLESS<br />
                        <span style={{ color: selectedRobot.color }}>HANDOFF</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto font-light text-xl leading-relaxed">
                        Record on mobile, execute on desktop. Ideal synchronous workflow without transferring a single file.
                    </p>
                </div>

                {/* DEVICE CONNECTIVITY VISUALIZATION */}
                <div className="device-container w-full h-[600px] relative mt-10 rounded-3xl overflow-visible hidden md:flex items-center justify-center">

                    {/* IPHONE */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="absolute left-[10%] z-20 w-[240px] h-[500px] rounded-[40px] bg-zinc-950 border-[6px] border-zinc-800 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-black z-50" />
                        <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-zinc-900 border border-white/5 relative">
                            <div className="absolute inset-0 bg-blue-500/10 mix-blend-color" />
                            <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center animate-pulse border-white/10">
                                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
                            </div>
                            <div className="mt-8 font-mono text-xs text-white/50 tracking-widest uppercase">Recording Intent...</div>
                        </div>
                    </motion.div>

                    {/* BRIDGING DATA BEAM */}
                    <div className="absolute top-1/2 left-[25%] w-[45%] h-[2px] z-10 -translate-y-1/2">
                        <div className="w-full h-full bg-white/5" />
                        <div
                            className="data-beam absolute top-0 left-0 w-full h-full shadow-[0_0_30px_currentColor] z-10"
                            style={{ backgroundColor: selectedRobot.color, color: selectedRobot.color }}
                        />
                        {/* Flowing particles across the beam */}
                        <motion.div
                            animate={{ x: ["0%", "1000%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff] blur-[2px] z-20"
                        />
                    </div>

                    {/* MACBOOK */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: "spring", delay: 0.2 }}
                        className="absolute right-[5%] z-20 w-[600px] aspect-[16/10] bg-zinc-900 border-2 border-zinc-800 rounded-t-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden"
                    >
                        <div className="w-full h-2 bg-black" />
                        <div className="relative w-full h-full bg-black">
                            {/* VIDEO 4 plays here directly */}
                            <video src={getAssetPath("/video4.mp4")} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity" />

                            {/* Frame overlay */}
                            <div className="absolute inset-0 border-[10px] border-black rounded-b-xl pointer-events-none" />
                        </div>
                    </motion.div>

                </div>

                {/* Mobile View Stack */}
                <div className="flex md:hidden flex-col gap-12 mt-10 w-full">
                    <div className="w-full h-[400px] relative rounded-[40px] border-4 border-zinc-800 overflow-hidden bg-black flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center animate-pulse border-white/10">
                            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
                        </div>
                    </div>

                    <div className="h-20 w-[2px] mx-auto relative overflow-hidden bg-white/10">
                        <motion.div animate={{ y: ["-100%", "400%"] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-full h-1/4" style={{ backgroundColor: selectedRobot.color, boxShadow: `0 0 20px ${selectedRobot.color}` }} />
                    </div>

                    <div className="w-full aspect-[16/10] relative rounded-xl border border-zinc-800 overflow-hidden bg-black">
                        <video src={getAssetPath("/video4.mp4")} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    </div>
                </div>

            </div>
        </section>
    );
}
