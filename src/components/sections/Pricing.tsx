"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useRobot } from "@/components/global/RobotContext";

function GradientBackground() {
    const orbs = [
        { color: '#5B4EE8', animate: { x: [0, 150, -100, 0], y: [0, -120, 80, 0] }, duration: 15 },
        { color: '#FF5500', animate: { x: [0, -120, 100, 0], y: [0, 100, -80, 0] }, duration: 20 },
        { color: '#00D1FF', animate: { x: [100, 0, 150, 100], y: [-50, 150, 0, -50] }, duration: 18 },
        { color: '#FF00A0', animate: { x: [-100, 100, 0, -100], y: [100, -50, 100, 100] }, duration: 25 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    animate={orb.animate}
                    transition={{ duration: orb.duration, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full mix-blend-screen"
                    style={{
                        backgroundColor: orb.color,
                        filter: "blur(120px)",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}
        </div>
    );
}

const CheckIcon = ({ color }: { color?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: color || "#4ade80" }}>
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            d="M5 13l4 4L19 7"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);

export default function Pricing() {
    const { selectedRobot } = useRobot();
    const [proHover, setProHover] = useState(false);
    const [enterpriseFlipped, setEnterpriseFlipped] = useState(false);

    const handleProHover = () => {
        setProHover(true);
        confetti({
            particleCount: 20,
            spread: 60,
            origin: { y: 0.6 },
            colors: [selectedRobot.color, '#ffffff']
        });
    };

    return (
        <section className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center py-32 px-4 perspective-[2000px] overflow-hidden">
            <GradientBackground />

            <div className="text-center z-10 mb-20">
                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Pick Your Brain</h2>
                <p className="text-xl text-gray-400 mt-4">Simple, transparent pricing for ultimate productivity.</p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center z-10 perspective-[1500px]">

                {/* FREE CARD */}
                <motion.div
                    initial={{ rotateY: -30, x: -100, opacity: 0 }}
                    whileInView={{ rotateY: 0, x: 0, opacity: 1 }}
                    whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="glassmorphism p-8 h-[500px] flex flex-col border-white/10 hover:border-white/30 bg-white/5 cursor-pointer transition-colors"
                >
                    <h3 className="text-2xl font-bold">Standard</h3>
                    <div className="text-4xl font-black mt-4">$0 <span className="text-sm font-normal text-gray-400">/ forever</span></div>
                    <p className="text-gray-400 mt-2">Essential AI assistant for casual users.</p>

                    <div className="mt-8 flex flex-col gap-4 flex-1">
                        <div className="flex items-center"><CheckIcon /> <span>50 requests per day</span></div>
                        <div className="flex items-center"><CheckIcon /> <span>Basic context memory</span></div>
                        <div className="flex items-center"><CheckIcon /> <span>Web interface only</span></div>
                    </div>

                    <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">Get Started</button>
                </motion.div>

                {/* PRO CARD */}
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onHoverStart={handleProHover}
                    onHoverEnd={() => setProHover(false)}
                    className="relative h-[550px] scale-105 z-20 cursor-pointer"
                >
                    <div className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 w-[200%] h-[200%] origin-center -translate-x-1/2 -translate-y-1/2"
                            style={{
                                background: `conic-gradient(from 0deg, ${selectedRobot.color}, #000000, ${selectedRobot.color})`
                            }}
                        />
                        <div className="absolute inset-[2px] bg-zinc-950 rounded-xl" />
                    </div>

                    <div className="absolute inset-[2px] rounded-xl flex flex-col p-8 glassmorphism bg-zinc-950/80 backdrop-blur-2xl">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg" style={{ backgroundColor: selectedRobot.color }}>
                            Most Popular
                        </div>

                        <motion.div
                            animate={{
                                y: proHover ? -20 : [-8, 0, -8],
                                scale: proHover ? 1.2 : 1
                            }}
                            transition={{
                                y: { repeat: proHover ? 0 : Infinity, duration: 2, ease: "easeInOut" },
                                scale: { type: "spring" }
                            }}
                            className="absolute -top-16 right-4 w-28 h-28"
                        >
                            <Image src={selectedRobot.image} alt="Pro Arlo" fill className="object-contain saturate-150 drop-shadow-xl" />
                        </motion.div>

                        <h3 className="text-2xl font-bold" style={{ color: selectedRobot.color }}>Pro Brain</h3>
                        <div className="text-5xl font-black mt-4 border-b border-white/10 pb-4">$20 <span className="text-sm font-normal text-gray-400">/ month</span></div>
                        <p className="text-gray-300 mt-4">Unlimited power for professionals.</p>

                        <div className="mt-8 flex flex-col gap-4 flex-1">
                            <div className="flex items-center font-bold text-white"><CheckIcon color={selectedRobot.color} /> <span>Unlimited requests (GPT-4o)</span></div>
                            <div className="flex items-center font-bold text-white"><CheckIcon color={selectedRobot.color} /> <span>Photographic infinite memory</span></div>
                            <div className="flex items-center font-bold text-white"><CheckIcon color={selectedRobot.color} /> <span>macOS Native App</span></div>
                            <div className="flex items-center font-bold text-white"><CheckIcon color={selectedRobot.color} /> <span>Voice & Vision enabled</span></div>
                        </div>

                        <button className="relative w-full py-4 rounded-xl text-white font-black hover:brightness-110 transition-all overflow-hidden group shadow-lg" style={{ backgroundColor: selectedRobot.color }}>
                            <span className="relative z-10">Subscribe Now</span>
                            <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                    </div>
                </motion.div>

                {/* ENTERPRISE CARD */}
                <div
                    className="relative h-[500px] perspective-1000 cursor-pointer group"
                    onMouseEnter={() => setEnterpriseFlipped(true)}
                    onMouseLeave={() => setEnterpriseFlipped(false)}
                >
                    <motion.div
                        initial={{ rotateY: 30, x: 100, opacity: 0 }}
                        whileInView={{ rotateY: enterpriseFlipped ? 180 : 0, x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="w-full h-full preserve-3d"
                    >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden glassmorphism p-8 flex flex-col border-white/10 bg-white/5">
                            <h3 className="text-2xl font-bold">Enterprise</h3>
                            <div className="text-4xl font-black mt-4">Custom</div>
                            <p className="text-gray-400 mt-2">Team deployment & private models.</p>

                            <div className="mt-8 flex flex-col gap-4 flex-1">
                                <div className="flex items-center"><CheckIcon /> <span>Everything in Pro</span></div>
                                <div className="flex items-center"><CheckIcon /> <span>Local model deployment</span></div>
                                <div className="flex items-center"><CheckIcon /> <span>Team SOC2 Compliance</span></div>
                            </div>

                            <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold pointer-events-none">Hover to reveal</button>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] glassmorphism p-8 flex flex-col border-blue-500/30 bg-blue-900/40 justify-center items-center text-center">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400 mb-6">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <h3 className="text-2xl font-bold mb-4">Let's Talk</h3>
                            <p className="text-blue-200 mb-8">Schedule a demo with our engineering team to construct your private brain.</p>
                            <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors">Book Call</button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
