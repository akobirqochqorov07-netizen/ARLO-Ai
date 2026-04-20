"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRobot } from "@/components/global/RobotContext";
import { TerminalSquare, Send, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { useState, useEffect } from "react";
import { getAssetPath } from "@/lib/utils";

export default function Outro() {
    const { selectedRobot } = useRobot();
    const [emailStr, setEmailStr] = useState("");
    const [deployState, setDeployState] = useState<"idle" | "simulating" | "success">("idle");
    const [terminalLines, setTerminalLines] = useState<string[]>([]);

    // Hacker Terminal Simulation Logic
    const handleDeploy = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailStr.length < 5) return;

        setDeployState("simulating");

        const lines = [
            `sys@arlo:~$ Requesting enclave node access for [${emailStr}]`,
            `[sys] Bypassing preliminary UI restrictions... OK`,
            `[node] Resolving hardware vector assignments...`,
            `[auth] Validating biometric signatures... OK`,
            `[net] Handshake with neural cluster... established.`,
            `[core] SECURE ALLOCATION GRANTED.`
        ];

        let currentLines: string[] = [];

        lines.forEach((line, index) => {
            setTimeout(() => {
                currentLines = [...currentLines, line];
                setTerminalLines(currentLines);

                if (index === lines.length - 1) {
                    setTimeout(() => {
                        setDeployState("success");
                    }, 1000);
                }
            }, index * 800 + 500); // 800ms between each line
        });
    }

    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-4 md:px-16 py-32 font-inter">

            {/* Immersive Architectural Lighting */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20 transition-colors duration-1000" style={{ backgroundColor: selectedRobot.color }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[150px] mix-blend-overlay" style={{ backgroundColor: selectedRobot.color }}
                />
            </div>

            <div className="absolute inset-0 z-0 opacity-10 bg-zinc-900/20" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">

                {/* Core Geometry Element */}
                <AnimatePresence>
                    {deployState === "idle" && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                            className="relative w-24 h-24 rounded-full border border-white/5 mb-8 flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.02)] glassmorphism"
                        >
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[10%] rounded-full border border-dashed border-white/10" />
                            <TerminalSquare className="w-8 h-8 text-white opacity-40" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cinematic Copy */}
                <AnimatePresence>
                    {deployState === "idle" && (
                        <motion.div exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
                            <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.85] text-white uppercase drop-shadow-2xl">
                                DEPLOY<br />
                                <span className="text-transparent border-text relative inline-block transition-colors duration-1000" style={{ WebkitTextStroke: `2px ${selectedRobot.color}` }}>ARLO OS</span>
                            </h2>
                            <p className="mt-8 text-lg font-light text-gray-400 max-w-xl text-center leading-relaxed">
                                The autonomous layer is finalizing production capabilities. Embed your contact vector into the terminal to authorize early access.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interactive Modules */}
                <div className="w-full mt-16 max-w-2xl relative min-h-[250px]">
                    <AnimatePresence mode="wait">

                        {/* STAGE 1: INPUT */}
                        {deployState === "idle" && (
                            <motion.div key="input" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0, filter: "blur(10px)" }}>
                                <form onSubmit={handleDeploy} className="relative group">
                                    <div className="absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-1000 z-0" style={{ backgroundColor: selectedRobot.color }} />
                                    <div className="relative z-10 flex items-center glassmorphism p-2 rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-950/80 mt-1">
                                        <div className="pl-6 pr-4 hidden sm:block text-gray-500 font-mono">
                                            sys<span style={{ color: selectedRobot.color }}>@</span>arlo:~$&nbsp;
                                            <span className="text-emerald-400">auth</span> --email
                                        </div>
                                        <input
                                            type="email" required placeholder="your@email.com_ "
                                            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-gray-700 py-4 px-4 sm:px-0 focus:ring-0 w-full"
                                            value={emailStr} onChange={(e) => setEmailStr(e.target.value)}
                                        />
                                        <button type="submit" className="px-6 py-4 rounded-xl transition-all hover:bg-white/10 flex items-center gap-3">
                                            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50 group-focus-within:text-white">Init</span>
                                            <Send className="w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" style={{ color: emailStr.length > 3 ? selectedRobot.color : "" }} />
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {/* STAGE 2: TERMINAL HACKING SIMULATION */}
                        {deployState === "simulating" && (
                            <motion.div key="simulating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="w-full glassmorphism p-8 rounded-2xl border border-white/10 bg-black/90 shadow-2xl font-mono text-sm overflow-hidden relative">
                                <div className="absolute inset-0 opacity-20 z-0 bg-zinc-900/40" />
                                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: selectedRobot.color }}>
                                    <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-white/50" />
                                </div>
                                <div className="flex items-center gap-3 mb-6 text-white/50 border-b border-white/10 pb-4">
                                    <Cpu className="w-5 h-5 animate-pulse" />
                                    <span className="uppercase tracking-widest text-[10px]">Neural Handshake in Progress...</span>
                                </div>
                                <div className="space-y-4">
                                    {terminalLines.map((line, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={line.includes("GRANTED") ? "text-emerald-400 font-bold" : "text-gray-400"}>
                                            {line}
                                        </motion.div>
                                    ))}
                                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-3 h-4 bg-white/50 inline-block mt-4" />
                                </div>
                            </motion.div>
                        )}

                        {/* STAGE 3: SUCCESS */}
                        {deployState === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, y: 50, filter: "blur(20px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ type: "spring" }} className="w-full glassmorphism p-12 rounded-[2rem] border flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(255,255,255,0.05)] bg-black/50" style={{ borderColor: `${selectedRobot.color}40` }}>
                                <div className="relative mb-8">
                                    <motion.div animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-emerald-500/20" />
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.3)] bg-emerald-400/10 relative z-10 glassmorphism">
                                        <ShieldCheck className="w-12 h-12 text-emerald-400" />
                                    </div>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black uppercase text-white mb-4 tracking-tighter drop-shadow-lg">Protocol Authorized</h3>
                                <p className="max-w-md mx-auto text-gray-400 leading-relaxed font-light">Your cognitive vector <b>({emailStr})</b> has been permanently embedded into the genesis block. Standby for deployment instructions.</p>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>

            {/* Footer minimal */}
            <div className="absolute bottom-10 w-full px-10 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-mono tracking-widest text-gray-600 gap-4">
                <div>© 2026 Arlo Artificial Intelligence</div>
                <div className="flex gap-8">
                    <span className="hover:text-white cursor-pointer transition-colors">Privacy Node</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Terms of Compute</span>
                </div>
            </div>
        </section>
    );
}
