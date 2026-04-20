"use client";
import React, { createContext, useContext, useState } from "react";

export type RobotType = {
    id: number;
    name: string;
    image: string;
    color: string;
    intellect: string;
    emotion: string;
    character: string;
};

export const robots: RobotType[] = [
    { id: 1, name: "Alpha", image: "/robot1.png", color: "#5B4EE8", intellect: "Logical & Structured", emotion: "Calm, Professional", character: "An analytical mastermind built for problem-solving and coding navigation." },
    { id: 2, name: "Spark", image: "/robot2.png", color: "#FF5500", intellect: "Creative & Fluid", emotion: "Energetic, Enthusiastic", character: "Your brainstorming partner. Perfect for drafting creative texts and ideation." },
    { id: 3, name: "Zen", image: "/robot3.png", color: "#00D1FF", intellect: "Meditative & Focused", emotion: "Tranquil, Grounding", character: "Keeps you in the flow state. Eliminates distractions and boosts deep work." },
    { id: 4, name: "Nexus", image: "/robot4.png", color: "#FF00A0", intellect: "Empathetic & Intuitive", emotion: "Warm, Understanding", character: "Excellent at nuanced communication, email drafting, and team collaboration." },
    { id: 5, name: "Chronos", image: "/robot5.png", color: "#00FF66", intellect: "Calculated & Swift", emotion: "Urgent, Precise", character: "Master of scheduling, memory recall, and executing tasks at lightning speed." },
    { id: 6, name: "Omni", image: "/robot6.png", color: "#FFFFFF", intellect: "Adaptive & Boundless", emotion: "Mysterious, Powerful", character: "The pinnacle synthetic intelligence combining all attributes into one entity." }
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
