"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useRobot } from "@/components/global/RobotContext";
import { Lock, Fingerprint, Code, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const { selectedRobot } = useRobot();
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const macbookRef = useRef<HTMLDivElement>(null);
    const iphoneRef = useRef<HTMLDivElement>(null);

    const [activePanel, setActivePanel] = useState(1);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".feature-panel") as HTMLElement[];

            const scrollTween = gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + ((wrapperRef.current?.offsetWidth || window.innerWidth * 5) * 1.5),
                    onUpdate: (self) => {
                        const step = Math.round(self.progress * (panels.length - 1)) + 1;
                        setActivePanel(step);
                    }
                }
            });

            // Mac reveal
            gsap.fromTo(macbookRef.current,
                { rotateX: -90, opacity: 0 },
                { rotateX: -8, opacity: 1, duration: 1.5, scrollTrigger: { trigger: ".panel-1", containerAnimation: scrollTween, start: "10% center" } }
            );

            // iPhone reveal
            gsap.fromTo(iphoneRef.current,
                { y: 150, rotateY: 30, opacity: 0 },
                { y: 0, rotateY: 0, opacity: 1, duration: 1.5, scrollTrigger: { trigger: ".panel-2", containerAnimation: scrollTween, start: "10% center" } }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-black relative font-inter">
            {/* HUD Navigation */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center w-full justify-between px-6 md:px-20 pointer-events-none">
                <div className="text-[10px] hidden md:block text-white/50 tracking-widest uppercase font-mono">Cognitive Modules</div>
                <div className="glassmorphism px-8 py-2 font-mono text-[10px] tracking-[0.3em] font-bold border-white/10 flex gap-4 items-center rounded-full" style={{ color: selectedRobot.color }}>
                    <span className="text-white/30 hidden md:block">MOD</span> 0{activePanel} <span className="text-white/20">/ 06</span>
                </div>
                <div className="text-[10px] hidden md:block text-white/50 tracking-widest uppercase font-mono text-right">Secured Link</div>
            </div>

            <div ref={wrapperRef} className="h-full w-[600vw] flex">

                {/* PANEL 1: NEURAL MIND SYNC (Video 2) */}
                <div className="feature-panel panel-1 w-screen h-full flex flex-col-reverse lg:flex-row items-center justify-center px-10 lg:px-32 relative">
                    <div className="flex-1 flex flex-col items-start justify-center mt-12 lg:mt-0 relative z-20">
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-4">Module 1.0</span>
                        <h2 className="text-4xl lg:text-[5rem] font-black leading-[0.9] tracking-tighter uppercase text-white mb-6">Neural<br />Mind Sync</h2>
                        <p className="text-lg text-gray-400 font-light max-w-md leading-relaxed mb-8">
                            Arlo operates natively on the macOS kernel. Seamlessly shadow-writing, reading logic, and assisting without blocking your vision.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center perspective-[1200px] z-20">
                        <div className="relative w-[300px] lg:w-[600px] drop-shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                            <div ref={macbookRef} className="origin-bottom relative w-full aspect-[16/10] bg-zinc-950 border-[2px] border-zinc-800 rounded-t-3xl overflow-hidden shadow-2xl flex flex-col" style={{ transform: "rotateX(-8deg)" }}>
                                <div className="w-full h-[6px] bg-black" />
                                <div className="flex-1 w-[98%] mx-auto relative bg-black rounded-sm overflow-hidden mb-[1.5%]">
                                    <video src="/video2.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="relative w-[104%] -ml-[2%] h-4 bg-zinc-800 rounded-b-xl flex justify-center -mt-px" style={{ transform: "rotateX(85deg)" }}>
                                <div className="w-32 h-full bg-zinc-900 rounded-t-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* PANEL 2: HYPER-SPEECH ENGINE (Video 3) */}
                <div className="feature-panel panel-2 w-screen h-full flex flex-col lg:flex-row items-center justify-center px-10 lg:px-32 relative">
                    <div className="flex-1 flex justify-center perspective-[1000px] z-20">
                        <div ref={iphoneRef} className="relative w-[260px] h-[550px] lg:w-[320px] lg:h-[680px] rounded-[50px] bg-zinc-900 border-[8px] border-black shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden">
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-50" />
                            <video src="/video3.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-center mt-12 lg:mt-0 relative z-20 lg:pl-16">
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-4">Module 2.0</span>
                        <h2 className="text-4xl lg:text-[5rem] font-black leading-[0.9] tracking-tighter uppercase text-white mb-6">Hyper-Speech<br />Engine</h2>
                        <p className="text-lg text-gray-400 font-light max-w-md leading-relaxed mb-8">
                            Biometric zero-latency audio parsing. Arlo understands nuance, dialect, and implicit intent natively without cloud bottlenecks.
                        </p>
                    </div>
                </div>

                {/* PANEL 3: INFINITE CONTEXT MESH (Video 5) */}
                <div className="feature-panel panel-3 w-screen h-full flex flex-col items-center justify-center relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] transition-colors duration-1000" style={{ backgroundImage: `radial-gradient(circle at center, ${selectedRobot.color}10 0%, #000 70%)` }}>
                    <div className="text-center mb-12">
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-4 block">Module 3.0</span>
                        <h2 className="text-4xl lg:text-[5rem] font-black uppercase tracking-tighter text-white leading-none">Infinite Context<br />Mesh</h2>
                    </div>
                    <div className="relative w-[90%] lg:w-[1000px] aspect-[21/9] rounded-3xl overflow-hidden glassmorphism border border-white/10 shadow-2xl">
                        <video src="/video5.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-[20px] border-black pointer-events-none rounded-sm" />
                        <motion.div animate={{ y: ["0%", "100%", "0%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-t border-[rgba(255,255,255,0.4)] shadow-[0_0_20px_#fff] mix-blend-overlay" />
                    </div>
                </div>

                {/* PANEL 4: AUTONOMOUS EXECUTION (New) */}
                <div className="feature-panel panel-4 w-screen h-full flex flex-col lg:flex-row items-center justify-center relative px-10 lg:px-32">
                    <div className="flex-1 space-y-6">
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">Module 4.0</span>
                        <h2 className="text-4xl lg:text-[5rem] font-black uppercase tracking-tighter text-white leading-none">Autonomous<br />Execution</h2>
                        <p className="text-lg text-gray-400 font-light max-w-sm leading-relaxed">Arlo doesn't wait for your explicit exact inputs. It executes sub-tasks automatically. Approving PRs, formatting drafts, optimizing architecture while you monitor.</p>
                    </div>
                    <div className="flex-1 flex justify-center items-center relative z-20">
                        <div className="relative w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] flex items-center justify-center pointer-events-none">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[2px] border-dashed border-white/20 rounded-full" />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[15%] border border-white/10 rounded-full" />

                            {/* Simulated Floating Actions */}
                            <motion.div animate={{ y: [-10, 10, -10], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -left-10 top-20 glassmorphism px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-emerald-400 border-emerald-400/30 rounded-full backdrop-blur-md">Pushing PR...</motion.div>
                            <motion.div animate={{ y: [10, -10, 10], opacity: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -right-10 bottom-20 glassmorphism px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-blue-400 border-blue-400/30 rounded-full backdrop-blur-md">Drafting Email...</motion.div>
                            <motion.div animate={{ y: [-15, 15, -15], opacity: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2.5 }} className="absolute left-10 md:-top-10 glassmorphism px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-purple-400 border-purple-400/30 rounded-full backdrop-blur-md">Scraping Web...</motion.div>

                            <div className="absolute inset-[30%] glassmorphism rounded-full flex flex-col items-center justify-center border border-white/5" style={{ boxShadow: `0 0 100px ${selectedRobot.color}40`, backgroundColor: `${selectedRobot.color}10` }}>
                                <Code className="w-12 h-12 mb-2 animate-pulse" style={{ color: selectedRobot.color }} />
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-white">Kernel Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PANEL 5: SECURE ENCLAVE (New) */}
                <div className="feature-panel panel-5 w-screen h-full flex items-center justify-center relative px-10 lg:px-32">
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div className="flex justify-center order-2 lg:order-1">
                            <div className="grid grid-cols-3 gap-4">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center bg-zinc-900/50"
                                    >
                                        {i === 4 ? <Lock className="text-white/50 w-6 h-6" /> : <Server className="text-white/10 w-6 h-6" />}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-6">
                            <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">Module 5.0</span>
                            <h2 className="text-4xl lg:text-[5rem] font-black uppercase tracking-tighter text-white leading-none">Absolute<br />Zero Trust</h2>
                            <p className="text-lg text-gray-400 font-light max-w-sm leading-relaxed">
                                Enterprise-grade security natively bundled. Your conversational data is end-to-end encrypted locally inside a dedicated vector sandbox.
                            </p>
                        </div>

                    </div>
                </div>

                {/* PANEL 6: THE ORIGIN (Video 1 integration) */}
                <div className="feature-panel panel-6 w-screen h-full flex flex-col items-center justify-center relative px-10 lg:px-32">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950 to-black pointer-events-none" />

                    <div className="relative z-20 text-center mb-10">
                        <h2 className="text-5xl lg:text-[7rem] font-black uppercase tracking-tighter text-white drop-shadow-2xl mix-blend-screen">HELLO, WORLD</h2>
                        <p className="text-xl text-gray-400 tracking-[0.3em] uppercase mt-4">The Next Era of Computation</p>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative w-full max-w-4xl aspect-video rounded-[3rem] overflow-hidden glassmorphism border-[4px] border-zinc-800 shadow-[0_0_100px_rgba(255,255,255,0.1)] p-2"
                    >
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative bg-black">
                            <video src="/video1.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute top-6 left-6 font-mono text-[10px] text-white/50 bg-black/50 px-4 py-1 rounded-full backdrop-blur-md border border-white/10">ARLO V1.0 INITIALIZATION</div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
