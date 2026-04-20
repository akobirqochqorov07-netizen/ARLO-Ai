"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRobot } from "@/components/global/RobotContext";

const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float noise(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    float wave1 = sin(uv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
    float wave2 = sin(uv.y * 2.0 - uTime * 0.3 + uv.x * 4.0) * 0.5 + 0.5;
    
    vec3 color1 = vec3(0.005, 0.0, 0.05);
    vec3 color2 = vec3(0.1, 0.05, 0.3);
    vec3 color3 = vec3(0.0, 0.1, 0.2);
    
    vec3 finalColor = mix(color1, color2, wave1);
    finalColor = mix(finalColor, color3, wave2 * 0.3);
    
    float n = noise(uv * 100.0 + uTime * 0.1);
    if (n > 0.99) finalColor += vec3(0.2);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function AuroraBackground() {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]}>
            <planeGeometry args={[30, 20]} />
            <shaderMaterial
                vertexShader={auroraVertexShader}
                fragmentShader={auroraFragmentShader}
                uniforms={uniforms}
                depthWrite={false}
            />
        </mesh>
    );
}

export default function Hero() {
    const { selectedRobot } = useRobot();
    const titleLetters = "ARLO".split("");
    const { scrollY } = useScroll();
    const ctaOpacity = useTransform(scrollY, [0, 80], [1, 0]);

    useEffect(() => {
        gsap.fromTo(
            ".hero-char",
            { y: 150, rotation: 25, opacity: 0 },
            {
                y: 0,
                rotation: 0,
                opacity: 1,
                stagger: 0.05,
                ease: "power4.out",
                duration: 1.5,
                delay: 1.5
            }
        );

        gsap.fromTo(
            ".hero-tagline",
            { opacity: 0, y: 20, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, delay: 2.2, ease: "power2.out" }
        );
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-center items-center">

            {/* 3D Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <AuroraBackground />
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={1.5} />
                    </EffectComposer>
                </Canvas>
            </div>

            {/* Center Hue tied to selected entity */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 z-10"
                style={{ backgroundColor: selectedRobot.color }}
            />

            {/* Typography */}
            <div className="relative z-20 flex flex-col items-center">
                <h1 className="text-[20vw] md:text-[18vw] font-black leading-[0.8] tracking-tighter flex overflow-hidden mix-blend-screen drop-shadow-2xl">
                    {titleLetters.map((char, i) => (
                        <span key={i} className="hero-char inline-block text-white">
                            {char}
                        </span>
                    ))}
                </h1>
                <p className="hero-tagline text-lg md:text-2xl text-gray-400 font-medium tracking-[0.4em] uppercase mt-6 md:mt-12 text-center relative">
                    The Cognitive OS Engine
                </p>
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity: ctaOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
            >
                <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-6"
                >
                    Initialize
                </motion.span>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
