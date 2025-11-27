"use client";
import { useState, useEffect } from "react";
export default function Hero({ items = [] }) {
    const [active, setActive] = useState(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mq.matches);
        const listener = () => setPrefersReducedMotion(mq.matches);
        mq.addEventListener?.("change", listener);
        return () => mq.removeEventListener?.("change", listener);
    }, []);

    // mobile breakpoint: treat hover behavior as simple stacked/scrollable
    // We'll use CSS to switch layout; JS is unchanged.

    return (
        <section aria-label="Book categories" className="w-full">
            <div className="hidden md:block">
                <div className="h-[500px] flex w-full overflow-hidden">
                    {items.map((it, i) => {
                        const isActive = active === i;
                        const flexValue = isActive ? 5 : 1;
                        return (
                            <a
                                key={it.id}
                                href={it.link ?? "#"}
                                onMouseEnter={() => setActive(i)}
                                onMouseLeave={() => setActive(null)}
                                onFocus={() => setActive(i)}
                                onBlur={() => setActive(null)}
                                className="relative group h-full block focus:outline-none"
                                aria-label={it.title}
                                style={{
                                    flex: `${flexValue} 1 0%`,
                                    transition: prefersReducedMotion ? "none" : "flex 550ms ease, transform 450ms ease",
                                }}
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        alt={it.title}
                                        src={it.image}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        style={{ willChange: "transform" }}
                                    />
                                    <div
                                        className="absolute inset-0 transition-colors duration-300"
                                        aria-hidden
                                    />
                                </div>

                                <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
                                    <h3
                                        className={
                                            "text-center px-6 text-white text-lg md:text-xl lg:text-2xl font-semibold tracking-wider uppercase drop-shadow-sm"
                                        }
                                        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.35)", color: "white", fontWeight: "600" }}
                                    >
                                        {it.title.split("\n").map((line, idx) => (
                                            <span key={idx} className="block leading-tight">
                                                {line}
                                            </span>
                                        ))}
                                    </h3>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Mobile / small screens: horizontal scroll list */}
            <div className="md:hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <div className="flex gap-3 px-4 py-6">
                        {items.map((it) => (
                            <a
                                key={it.id}
                                href={it.link ?? "#"}
                                className="w-72 shrink-0 rounded-md overflow-hidden"
                                aria-label={it.title}
                            >
                                <div className="h-44 w-full bg-gray-100 overflow-hidden">
                                    <img src={it.image} alt={it.title} className="w-full h-full object-cover object-center" />
                                </div>
                                <div className="mt-3 text-sm font-semibold text-gray-700 text-center uppercase tracking-wider">
                                    {it.title}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
