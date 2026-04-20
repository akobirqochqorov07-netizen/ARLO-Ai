"use client";

import { useRobot, robots, RobotType } from "@/components/global/RobotContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Volume2, Play, Pause } from "lucide-react";

export default function RobotCatalog() {
    const { selectedRobot, setSelectedRobot } = useRobot();
    const [shockwaveId, setShockwaveId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playVoice = (robot: RobotType, e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }

        const audio = new Audio(robot.voiceUrl);
        audioRef.current = audio;
        audio.play();
        setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
    };

    const handleSelect = (robot: RobotType) => {
        setSelectedRobot(robot);
        setShockwaveId(robot.id);

        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const sentence = robot.character.split('.')[0] || "I am your assistant";
            const msg = new SpeechSynthesisUtterance(`Entity locked. I am ${robot.name}. ${sentence}.`);
            msg.pitch = 1.2 - (robot.id * 0.1);
            msg.rate = 1.05;

            const voices = window.speechSynthesis.getVoices();
            // Try to find a nice english voice if possible
            const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Samantha'));
            if (preferred) msg.voice = preferred;

            window.speechSynthesis.speak(msg);
        }

        setTimeout(() => setShockwaveId(null), 800);
    };

    return (
        <section className="relative w-full py-32 bg-black flex flex-col items-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black opacity-50 pointer-events-none" />

            <div className="text-center mb-16 px-4 relative z-10 w-full max-w-4xl">
                <h2 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter uppercase text-white">
                    CHOOSE YOUR <span style={{ color: selectedRobot.color }} className="transition-colors duration-500 drop-shadow-[0_0_20px_currentColor]">ENTITY</span>
                </h2>
                <p className="text-gray-400 text-lg mx-auto leading-relaxed">
                    Select the cognitive profile that best fits your workflow. Each entity possesses a distinct intellect, unique emotional matrix, and specialized trait.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 max-w-7xl px-4 relative z-10">
                {robots.map((robot) => {
                    const isSelected = selectedRobot.id === robot.id;
                    return (
                        <motion.div
                            key={robot.id}
                            onClick={() => handleSelect(robot)}
                            whileHover={{ y: -10 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative cursor-pointer glassmorphism p-6 w-[350px] min-h-[400px] flex flex-col items-center transition-all duration-500 group"
                            style={{
                                borderColor: isSelected ? robot.color : "rgba(255,255,255,0.05)",
                                boxShadow: isSelected ? `0 20px 50px -10px ${robot.color}60` : "0 0 0 rgba(0,0,0,0)",
                                backgroundColor: isSelected ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.01)"
                            }}
                        >
                            {/* Shockwave effect */}
                            <AnimatePresence>
                                {shockwaveId === robot.id && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 1, borderWidth: "4px" }}
                                        animate={{ scale: 1.5, opacity: 0, borderWidth: "1px" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 rounded-2xl pointer-events-none"
                                        style={{ borderColor: robot.color }}
                                    />
                                )}
                            </AnimatePresence>

                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                                style={{ backgroundColor: robot.color }}
                            />

                            <div className="w-56 h-56 relative mb-8 transform group-hover:scale-110 transition-transform duration-500 z-10 select-none pointer-events-none">
                                <Image
                                    src={robot.image}
                                    alt={robot.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 350px"
                                    className="object-contain drop-shadow-2xl filter saturate-150"
                                />
                            </div>

                            <h3 className="text-4xl font-black mb-4 tracking-widest uppercase z-10 text-white group-hover:drop-shadow-[0_0_10px_currentColor] transition-all" style={{ color: isSelected ? robot.color : "white" }}>
                                {robot.name}
                            </h3>

                            <div className="flex flex-col gap-3 w-full text-sm z-10 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Intellect Modality</span>
                                    <span className="font-bold text-gray-200">{robot.intellect}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Emotion Core</span>
                                    <span className="font-bold text-gray-200">{robot.emotion}</span>
                                </div>
                            </div>

                            <div className="mt-6 text-gray-400 text-center text-sm z-10 leading-relaxed font-medium mb-6">
                                {robot.character}
                            </div>

                            <button
                                onClick={(e) => playVoice(robot, e)}
                                className="mt-auto w-full py-3 rounded-xl border border-white/10 glassmorphism flex items-center justify-center gap-2 group/btn active:scale-95 transition-all z-10"
                                style={{ backgroundColor: isSelected ? `${robot.color}15` : "rgba(255,255,255,0.02)" }}
                            >
                                <Volume2 className="w-4 h-4 transition-colors" style={{ color: isSelected ? robot.color : "rgba(255,255,255,0.4)" }} />
                                <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-bold text-white/50 group-hover/btn:text-white transition-colors">
                                    Initialize Voice
                                </span>
                            </button>

                            {isSelected && (
                                <motion.div
                                    className="absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-black z-20"
                                    style={{ backgroundColor: robot.color, boxShadow: `0 0 10px ${robot.color}` }}
                                    layoutId="activeDot"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
