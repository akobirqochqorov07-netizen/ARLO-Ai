"use client";

import { useRobot } from "@/components/global/RobotContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BrainCircuit, Globe, Layers, ShieldCheck, Target, Zap, Fingerprint, Lock, Database } from "lucide-react";
import { useInView } from "react-intersection-observer";

type Lang = "EN" | "UZ" | "RU";

const data = {
    EN: {
        titles: ["What is Arlo?", "The Ultimate Advantage", "Who Is It For?", "Unrivaled Features"],
        t1_title: "The Cognitive Layer of macOS",
        t1_desc: "Arlo is not a chatbot. Arlo is a deeply integrated, hardware-accelerated Artificial Intelligence that sits directly on top of your operating system. It observes your digital environment, understands spatial and contextual relationships between your open apps, and executes tasks. It transforms your OS from a passive tool into an autonomous partner.",
        t2_desc: "The era of copy-pasting sensitive company data into web browsers is over. Arlo operates locally using incredibly optimized on-device vector databases. Your intellectual property never leaves your machine. While competitors suffer from extreme latency and cloud limits, Arlo provides zero-latency execution directly where your cursor is.",
        s1: "Omnipresent Operation", s1_desc: "No tabs. No portals. Arlo floats globally across any application via a single keystroke. It is always there when you need cognitive compute.",
        s2: "Context Absolute", s2_desc: "It reads your emails, VS Code terminals, Figma layers, and PDF documents simultaneously, fusing the context to write perfect multi-variable responses.",
        s3: "Zero Friction. Total Privacy. Local LLMs.",
        u1: "Senior Engineers", u1_desc: "Arlo reads terminal stack traces and writes verified architecture fixes directly into the IDE without breaking your deep state of coding flow.",
        u2: "Designers & Creatives", u2_desc: "Automate repetitive asset renaming, draft rigorous UI copy directly into Figma text nodes, and analyze visual hierarchies autonomously.",
        u3: "Founders & Executives", u3_desc: "Draft nuanced investor emails based on brief, rough bullet points while reviewing your financial dashboards on another screen.",
        u4: "Students & Researchers", u4_desc: "Synthesize 100-page PDF research papers instantly, extracting the most vital arguments and overlaying citations directly into your Notion workspace."
    },
    UZ: {
        titles: ["Arlo o'zi nima?", "Nega aynan Arlo?", "Kimlar uchun qilingan?", "Cheksiz Imkoniyatlar"],
        t1_title: "macOS ni Kognitiv (Ongli) Qatlami",
        t1_desc: "Arlo bu oddiy savol-javob qiluvchi chatbot emas. U to'g'ridan-to'g'ri tizimning ichki qatlamiga (OS) integratsiya qilingan, apparat orqali tezlashtirilgan asil Sun'iy Intellekt. U sizning ekranda nima qilayotganingizni ko'radi, ilovalar o'rtasidagi bog'liqlikni tushunadi va vazifalarni o'zi bajaradi. U sizning kompyuteringizni passiv asbobdan, mustaqil ishchi hamkorga aylantiradi.",
        t2_desc: "Maxfiy ishchi hujjatlarni saytlarga (masalan ChatGPTga) nusxalab tashlash davri tugadi. Arlo butunlay oflayn, local (kompyuterizning o'zida) vektor malumotlar bazasi yordamida ishlaydi. Hech qanday ma'lumot internetga chiqib ketmaydi. Boshqalar qachon server ishlar ekan deb kutib o'tirishganda, Arlo 0-sekund kuttirmasdan o'sha vaqtning o'zida kodlaringizni to'g'irlaydi.",
        s1: "Har joyda hozir-u nozir", s1_desc: "U qandaydir sayt ichiga qamalmagan. Sirtda, barcha dasturlar (Telegram, Chrome, Xcode) ustida har doim tayyor turadi.",
        s2: "Toliq Kontekst (Vaziyatni anglash)", s2_desc: "Sizning xatlaringizni, kodlaringizni va jadvallaringizni bir paytda o'qib, miyasida birlashtirib eng mukammal javoblarni beradi.",
        s3: "Tezlik. 100% Maxfiylik. Lokal tizim.",
        u1: "Senior Dasturchilar", u1_desc: "Arlo terminalingizdagi qizil xatolarni o'zi o'qiydi va VS Code'ga to'g'ridan-to'g'ri qanday tuzatish kerakligini yozib beradi. Vaqtingiz ketmaydi.",
        u2: "Dizaynerlar va Kreatorlar", u2_desc: "Figma ichida ishlab turib, qatlamma-qavat logikalarni tartiblash, idea izlash va bo'sh joylarga sifatli tekst yozish kabi ishlarni uning o'ziga topshiring.",
        u3: "CEO, Kompaniya Rahbarlari", u3_desc: "Siz moliya hisobotini o'qib tugatguningizga qadar, investitsiya bo'yicha eng og'ir yig'ilish matnlarini o'zi analiz qilib yozib qo'yadi.",
        u4: "Talabalar va Izlanuvchilar", u4_desc: "Yuz betlik PDF hajmdagi murakkab ilmiy ishlarni soniya ichida miyasiga joylab eng kerakli xulosani tushunarli tilda Notion'ga yig'adi."
    },
    RU: {
        titles: ["Что вообще такое Arlo?", "Тотальное превосходство", "Для кого это нужно?", "Возможности"],
        t1_title: "Когнитивный слой macOS",
        t1_desc: "Arlo — это не простой чат-бот. Это ИИ, глубоко интегрированный в операционную систему. Он видит ваш экран, понимает контекст между открытыми окнами и самостоятельно выполняет задачи. Он превращает вашу ОС из пассивного инструмента в автономного партнера.",
        t2_desc: "Эпоха копирования конфиденциальных бизнес-данных в браузер закончилась. Arlo работает локально, используя сверхбыстрые векторные базы данных на вашем устройстве. Ваши данные никогда не покидают ваш Mac. Пока конкуренты страдают от задержек облака, Arlo выполняет задачи с нулевой задержкой.",
        s1: "Омниприсутствие", s1_desc: "Он живёт не на вкладке сайта. Вызовите Arlo поверх любого окна, в любом приложении — всего в один клик или голос.",
        s2: "Абсолютный контекст", s2_desc: "Читает ваши email-ы, терминалы кода, слои Figma и PDF одновременно, глубоко объединяя эти данные для идеального результата.",
        s3: "Скорость без задержек. Локальная безопасность.",
        u1: "Senior Инженеры", u1_desc: "Arlo сам читает ошибки в терминале и автоматически пишет проверенные решения прямо в VS Code, не сбивая ваш фокус.",
        u2: "Дизайнеры и Графика", u2_desc: "Автоматизация наименований элементов, генерация и анализ текстов прямо внутри Figma без переключения в другие приложения.",
        u3: "Руководители и Фаундеры", u3_desc: "Arlo сам пишет сложные финансовые письма инвесторам на основе 3 пунктов, пока вы читаете графики на другом экране.",
        u4: "Студенты и Академики", u4_desc: "Осмысливает 100-страничные научные работы за секунды и пишет структурированные конспекты с тезисами прямо в Notion."
    }
};

export default function Manifesto() {
    const { selectedRobot } = useRobot();
    const [lang, setLang] = useState<Lang>("EN");

    // Dedicated scroll spies for the precise active state detection
    const [ref1, inView1] = useInView({ threshold: 0.5 });
    const [ref2, inView2] = useInView({ threshold: 0.4 });
    const [ref3, inView3] = useInView({ threshold: 0.3 });
    const [ref4, inView4] = useInView({ threshold: 0.5 });

    // Map out which section is strictly active
    const getActiveIndex = () => {
        if (inView1) return 0;
        if (inView2) return 1;
        if (inView3) return 2;
        if (inView4) return 3;
        return 0; // default
    };
    const activeIndex = getActiveIndex();

    const texts = data[lang];

    return (
        <section className="relative w-full bg-black text-white px-4 md:px-16 pt-20">

            {/* Precision Language Selector with modern blur transition UI */}
            <div className="absolute top-10 right-10 z-50 flex gap-2 glassmorphism p-1 rounded-full border border-white/10 shadow-2xl bg-black/50 backdrop-blur-md">
                {(["EN", "UZ", "RU"] as Lang[]).map(l => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        style={{
                            backgroundColor: lang === l ? `${selectedRobot.color}30` : "transparent",
                            color: lang === l ? "#FFF" : "rgba(255,255,255,0.4)"
                        }}
                        className="px-6 py-2 rounded-full font-bold tracking-widest text-xs transition-all duration-300"
                    >
                        {l}
                    </button>
                ))}
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row relative z-10 w-full">

                {/* EXACT STICKY LEFT RAIL */}
                <div className="hidden md:flex w-[40%] h-[100vh] sticky top-0 flex-col justify-center gap-12 pr-10">
                    {texts.titles.map((title, i) => {
                        const isActive = activeIndex === i;
                        return (
                            <motion.div
                                key={i}
                                animate={{ opacity: isActive ? 1 : 0.2, x: isActive ? 10 : 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex flex-col gap-2 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Indicator Dot */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: isActive ? 1 : 0 }}
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: selectedRobot.color, boxShadow: `0 0 10px ${selectedRobot.color}` }}
                                    />
                                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/50" style={{ color: isActive ? selectedRobot.color : "" }}>
                                        0{i + 1}. // Index
                                    </span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mt-1">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={lang + title}
                                            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                            exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {title}
                                        </motion.div>
                                    </AnimatePresence>
                                </h2>
                            </motion.div>
                        )
                    })}
                </div>

                {/* CONTENT RIGHT RAIL */}
                <div className="w-full md:w-[60%] flex flex-col gap-[30vh] py-[30vh]">

                    {/* SECTION 1 */}
                    <div ref={ref1} className="flex flex-col gap-6">
                        <div className="md:hidden flex flex-col gap-2 mb-4">
                            <span className="text-[10px] uppercase tracking-widest font-mono" style={{ color: selectedRobot.color }}>01. // Index</span>
                            <AnimatePresence mode="wait"><motion.h2 key={lang} initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} className="text-4xl font-black uppercase tracking-tighter leading-none">{texts.titles[0]}</motion.h2></AnimatePresence>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lang + "s1_main"}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col gap-4 shadow-2xl"
                            >
                                <BrainCircuit className="w-8 h-8 mb-4" style={{ color: selectedRobot.color }} />
                                <h3 className="text-2xl font-bold uppercase tracking-tight text-white/90">{texts.t1_title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed text-lg">{texts.t1_desc}</p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="wait">
                                <motion.div key={lang + "s1_card1"} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4 }} className="glassmorphism p-6 rounded-2xl border border-white/5 bg-gradient-to-tr from-white/5 to-transparent">
                                    <Globe className="w-6 h-6 mb-4 text-white/40" />
                                    <h4 className="text-lg font-bold mb-2 uppercase tracking-wide">{texts.s1}</h4>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">{texts.s1_desc}</p>
                                </motion.div>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.div key={lang + "s1_card2"} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="glassmorphism p-6 rounded-2xl border border-white/5 bg-gradient-to-tl from-white/5 to-transparent">
                                    <Layers className="w-6 h-6 mb-4 text-white/40" />
                                    <h4 className="text-lg font-bold mb-2 uppercase tracking-wide">{texts.s2}</h4>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">{texts.s2_desc}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* SECTION 2 */}
                    <div ref={ref2} className="flex flex-col gap-6">
                        <div className="md:hidden flex flex-col gap-2 mb-4">
                            <span className="text-[10px] uppercase tracking-widest font-mono" style={{ color: selectedRobot.color }}>02. // Index</span>
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none"><AnimatePresence mode="wait"><motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{texts.titles[1]}</motion.div></AnimatePresence></h2>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lang + "s2_main"}
                                initial={{ opacity: 0, filter: "blur(10px)", x: 20 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                                exit={{ opacity: 0, filter: "blur(10px)", x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="glassmorphism p-8 md:p-12 rounded-3xl border border-white/10 flex flex-col gap-6 overflow-hidden relative group"
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-red-500/20" />
                                <ShieldCheck className="w-12 h-12 mb-2 relative z-10" style={{ color: selectedRobot.color }} />
                                <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight relative z-10">{texts.s3}</h3>
                                <p className="text-gray-300 font-light leading-relaxed text-lg relative z-10">{texts.t2_desc}</p>

                                <div className="mt-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-red-400 font-mono text-sm border border-red-500/20 p-4 rounded-xl bg-red-500/5">
                                        <Lock className="w-4 h-4" /> 100% Offline Vector Database Encryption
                                    </div>
                                    <div className="flex items-center gap-4 text-emerald-400 font-mono text-sm border border-emerald-500/20 p-4 rounded-xl bg-emerald-500/5">
                                        <Database className="w-4 h-4" /> No Cloud Limits. Apple Neural Engine optimized.
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* SECTION 3 */}
                    <div ref={ref3} className="flex flex-col gap-6">
                        <div className="md:hidden flex flex-col gap-2 mb-4">
                            <span className="text-[10px] uppercase tracking-widest font-mono" style={{ color: selectedRobot.color }}>03. // Index</span>
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none"><AnimatePresence mode="wait"><motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{texts.titles[2]}</motion.div></AnimatePresence></h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: texts.u1, desc: texts.u1_desc },
                                { title: texts.u2, desc: texts.u2_desc },
                                { title: texts.u3, desc: texts.u3_desc },
                                { title: texts.u4, desc: texts.u4_desc }
                            ].map((item, idx) => (
                                <AnimatePresence mode="wait" key={idx}>
                                    <motion.div
                                        key={lang + "s3_" + idx}
                                        initial={{ scale: 0.9, opacity: 0, filter: "blur(5px)" }}
                                        whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors shadow-xl group"
                                    >
                                        <Target className="w-6 h-6 mb-4 transition-colors duration-500" style={{ color: selectedRobot.color }} />
                                        <h4 className="font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors text-white/80">{item.title}</h4>
                                        <p className="text-sm font-light text-gray-400 leading-relaxed group-hover:text-gray-300">{item.desc}</p>
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 4 */}
                    <div ref={ref4} className="flex flex-col gap-6">
                        <div className="md:hidden flex flex-col gap-2 mb-4">
                            <span className="text-[10px] uppercase tracking-widest font-mono" style={{ color: selectedRobot.color }}>04. // Index</span>
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none"><AnimatePresence mode="wait"><motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{texts.titles[3]}</motion.div></AnimatePresence></h2>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lang + "s4"}
                                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-[500px] rounded-3xl border border-white/10 glassmorphism relative overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-end p-10"
                            >
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                                {/* Visual data blocks running */}
                                <div className="absolute top-10 left-10 right-10 bottom-40 flex flex-wrap content-start gap-1 opacity-[0.1] pointer-events-none z-0">
                                    {Array.from({ length: 150 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-6 h-10 border border-white"
                                            animate={{ opacity: [0.1, 1, 0.1] }}
                                            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
                                            style={{ backgroundColor: i % 7 === 0 ? selectedRobot.color : "transparent" }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-20">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Zap className="w-10 h-10" style={{ color: selectedRobot.color }} />
                                        <Fingerprint className="w-10 h-10 text-white/40" />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"><AnimatePresence mode="wait"><motion.span key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{lang === 'EN' ? "Limitless Compute" : lang === 'UZ' ? "Kvant Hisoblash" : "Безграничные Вычисления"}</motion.span></AnimatePresence></h3>
                                    <p className="text-gray-300 font-light max-w-lg leading-relaxed text-lg">
                                        <AnimatePresence mode="wait"><motion.span key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{lang === 'EN' ? "With autonomous agent modality and Apple Neural Engine optimization, Arlo brings absolute maximum server-farm power directly onto your lap without delay." : lang === 'UZ' ? "Avtonom intellekt va Apple Neural Engine arxitekturasi tufayli, Arlo eng kuchli ulkan serverlarning aqlli kuchini qotishlarsiz to'g'ridan to'g'ri tizzangizga olib keladi." : "Автономные агенты и оптимизация Apple Neural Engine передают колоссальную вычислительную мощность облачных серверов прямо вам на колени, без задержек."}</motion.span></AnimatePresence>
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
