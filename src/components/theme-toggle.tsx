"use client";

import React, { useEffect, useState } from "react";
import "@theme-toggles/react/css/Lightbulb.css";
import { Lightbulb } from "@theme-toggles/react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string>();

    useEffect(() => {
        const storageTheme = localStorage.getItem("theme") || "light";
        console.log(storageTheme);
        document.documentElement.classList.toggle(
            "dark",
            storageTheme === "dark"
        );
        setTheme(storageTheme);
        console.log(theme);
    }, [theme]);

    return (
        <div className="absolute top-4 right-6 rounded-full w-12 h-12 bg-slate-200 dark:bg-background border border-transparent dark:border-white/[0.2] flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-400">
            <Lightbulb
                duration={750}
                className={`scale-[1.8] ${
                    theme === "dark" ? "text-white" : "text-black"
                }`}
                toggled={theme === "dark"}
                onToggle={(toggled: boolean) => {
                    const newTheme = toggled ? "dark" : "light";
                    localStorage.setItem("theme", newTheme);
                    setTheme(newTheme);
                    document.documentElement.classList.toggle("dark", toggled);
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
        </div>
    );
}
