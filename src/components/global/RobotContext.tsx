"use client";
import React, { createContext, useContext, useState } from "react";

import { getAssetPath } from "@/lib/utils";

export type RobotType = {
    id: number;
    name: string;
    image: string;
    voiceUrl: string; // Added voiceUrl
    color: string;
    intellect: string;
    emotion: string;
    character: string;
};

export const robots: RobotType[] = [
    { id: 1, name: "Alpha", image: getAssetPath("/robot1.png"), voiceUrl: getAssetPath("/audio/voice_preview_larry - friendly and robotic.mp3"), color: "#5B4EE8", intellect: "Logical & Structured", emotion: "Calm, Professional", character: "An analytical mastermind built for problem-solving and coding navigation." },
    { id: 2, name: "Spark", image: getAssetPath("/robot2.png"), voiceUrl: getAssetPath("/audio/voice_preview_barnaby bunny  - funny easter character.mp3"), color: "#FF5500", intellect: "Creative & Fluid", emotion: "Energetic, Enthusiastic", character: "Your brainstorming partner. Perfect for drafting creative texts and ideation." },
    { id: 3, name: "Zen", image: getAssetPath("/robot3.png"), voiceUrl: getAssetPath("/audio/voice_preview_yumi - slow, robotic and calm.mp3"), color: "#00D1FF", intellect: "Meditative & Focused", emotion: "Tranquil, Grounding", character: "Keeps you in the flow state. Eliminates distractions and boosts deep work." },
    { id: 4, name: "Nexus", image: getAssetPath("/robot4.png"), voiceUrl: getAssetPath("/audio/voice_preview_daria - funny creepy witch.mp3"), color: "#FF00A0", intellect: "Empathetic & Intuitive", emotion: "Warm, Understanding", character: "Excellent at nuanced communication, email drafting, and team collaboration." },
    { id: 5, name: "Chronos", image: getAssetPath("/robot5.png"), voiceUrl: getAssetPath("/audio/voice_preview_matthew schmitz - robotic and deadpan.mp3"), color: "#00FF66", intellect: "Calculated & Swift", emotion: "Urgent, Precise", character: "Master of scheduling, memory recall, and executing tasks at lightning speed." },
    { id: 6, name: "Omni", image: getAssetPath("/robot6.png"), voiceUrl: getAssetPath("/audio/voice_preview_hakan yayla - robotic, imposing villain.mp3"), color: "#FFFFFF", intellect: "Adaptive & Boundless", emotion: "Mysterious, Powerful", character: "The pinnacle synthetic intelligence combining all attributes into one entity." }
];

type RobotContextType = {
    selectedRobot: RobotType;
    setSelectedRobot: (r: RobotType) => void;
};

const RobotContext = createContext<RobotContextType | undefined>(undefined);

export function RobotProvider({ children }: { children: React.ReactNode }) {
    const [selectedRobot, setSelectedRobot] = useState<RobotType>(robots[0]);
    return (
        <RobotContext.Provider value={{ selectedRobot, setSelectedRobot }}>
            {children}
        </RobotContext.Provider>
    );
}

export function useRobot() {
    const ctx = useContext(RobotContext);
    if (!ctx) throw new Error("useRobot must be used within RobotProvider");
    return ctx;
}
