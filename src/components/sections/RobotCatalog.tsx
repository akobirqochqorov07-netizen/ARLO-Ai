"use client";

import { useRobot, robots, RobotType } from "@/components/global/RobotContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Volume2, Play, Pause, Sparkles, Loader2 } from "lucide-react";
import { generateSpeech } from "@/lib/elevenlabs";

export default function RobotCatalog() {
    const { selectedRobot, setSelectedRobot } = useRobot();
    const [shockwaveId, setShockwaveId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGenerating, setIsGenerating] = useState<number | null>(null);

    const handleAISpeak = async (robot: RobotType, e: React.MouseEvent) => {
        e.stopPropagation();
        if (isGenerating) return;

        setIsGenerating(robot.id);
        const audioUrl = await generateSpeech(robot.character, robot.elevenLabsVoiceId);
        setIsGenerating(null);

        if (audioUrl) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.play();
            setIsPlaying(true);
            audio.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl);
            };
        }
    };

    const handleSelect = (robot: RobotType) => {
        setSelectedRobot(robot);
        setShockwaveId(robot.id);
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

                            <div className="mt-6 text-gray-400 text-center text-sm z-10 leading-relaxed font-medium mb-8">
                                {robot.character}
                            </div>

                            <div className="mt-auto w-full z-10">
                                <button
                                    onClick={(e) => handleAISpeak(robot, e)}
                                    disabled={isGenerating !== null}
                                    className="w-full py-4 rounded-xl border border-white/10 glassmorphism flex items-center justify-center gap-3 group/btn active:scale-95 transition-all relative overflow-hidden"
                                    style={{
                                        backgroundColor: isSelected ? `${robot.color}30` : "rgba(255,255,255,0.05)",
                                        borderColor: isSelected ? `${robot.color}60` : "rgba(255,255,255,0.1)"
                                    }}
                                >
                                    {isGenerating === robot.id ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                                    )}
                                    <span className="text-xs uppercase font-mono tracking-[0.2em] font-bold text-white group-hover/btn:text-white transition-colors">
                                        {isGenerating === robot.id ? "Synthesizing..." : "Initialize AI Voice"}
                                    </span>
                                </button>
                            </div>

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
