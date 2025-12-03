"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const firstLinkRef = useRef(null);
    const pathname = usePathname();
    const HEADER_HEIGHT = 96;

    const items = [
        { href: "/", label: "Welcome" },
        { href: "/about", label: "About" },
        { href: "/books", label: "Books" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    const isCurrentPath = (href) => {
        if (!mounted) return false;
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) {
            requestAnimationFrame(() => firstLinkRef.current?.focus());
        }
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <header
                className="w-full bg-white z-50 fixed top-0 left-0 right-0"
                style={{ height: HEADER_HEIGHT }}
                role="banner"
            >
                <div className="max-w-7xl mx-auto px-6 h-full">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex items-center gap-6">
                            <div
                                aria-label="A.Y. Mohammed nameplate logo"
                                className="select-none shrink-0"
                                style={{ width: 220 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 420 140"
                                    preserveAspectRatio="xMinYMid meet"
                                    className="block w-full h-auto"
                                    role="img"
                                    aria-hidden="true"
                                >
                                    <text
                                        x="10"
                                        y="48"
                                        textAnchor="start"
                                        fontFamily="Cronos Pro, serif"
                                        fontSize="48"
                                        fontWeight="400"
                                        fill="#111111"
                                        stroke="#111111"
                                        strokeWidth="2"
                                        strokeOpacity="0.10"
                                        paintOrder="stroke"
                                    >
                                        A.Y.
                                    </text>

                                    <text
                                        x="10"
                                        y="110"
                                        textAnchor="start"
                                        fontFamily="Cronos Pro, serif"
                                        fontSize="48"
                                        fontWeight="400"
                                        fill="#111111"
                                        stroke="#111111"
                                        strokeWidth="2"
                                        strokeOpacity="0.10"
                                        paintOrder="stroke"
                                    >
                                        Mohammed
                                    </text>
                                </svg>
                            </div>

                            <div aria-hidden className="h-14 w-px bg-gray-300" />

                            <div className="hidden md:block">
                                <div className="text-xs md:text-sm leading-tight uppercase tracking-wider text-gray-700 font-medium">
                                    <div>The multi-million</div>
                                    <div className="mt-1">Bestselling author</div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center" aria-label="Main">
                            <ul className="flex gap-8 items-center">
                                {items.map((it) => (
                                    <li key={it.label}>
                                        <a
                                            href={it.href}
                                            itemProp="url"
                                            className={
                                                "relative inline-block px-2 py-1 text-sm font-medium transition-colors focus:outline-none " +
                                                (isCurrentPath(it.href)
                                                    ? "text-gray-900 after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900"
                                                    : "text-gray-700 hover:text-gray-900")
                                            }
                                            aria-current={isCurrentPath(it.href) ? "page" : undefined}
                                        >
                                            <span>{it.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setOpen((s) => !s)}
                                aria-expanded={open}
                                aria-controls="mobile-drawer"
                                className="p-2 rounded-md text-gray-900 hover:bg-gray-100 inline-flex items-center gap-2"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                    {open ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    )}
                                </svg>
                                <span className="uppercase text-sm tracking-wider">Menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* spacer so page content isn't hidden under fixed header */}
            <div style={{ height: HEADER_HEIGHT }} aria-hidden />

            {/* Mobile top-drawer: make it fixed to viewport so it is fully visible */}
            <div
                id="mobile-drawer"
                aria-hidden={!open}
                className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setOpen(false)}
                    aria-hidden
                />

                {/* Drawer panel (slides down) */}
                <div
                    className={`absolute top-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-full"
                        } pointer-events-auto`}
                    style={{ willChange: "transform" }}
                >
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div
                                aria-label="A.Y. Mohammed nameplate logo"
                                className="select-none shrink-0"
                                style={{ width: 160 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 420 140"
                                    preserveAspectRatio="xMinYMid meet"
                                    className="block w-full h-auto"
                                    role="img"
                                    aria-hidden="true"
                                >
                                    <text
                                        x="10"
                                        y="40"
                                        textAnchor="start"
                                        fontFamily="Cronos Pro, serif"
                                        fontSize="36"
                                        fontWeight="400"
                                        fill="#111111"
                                        stroke="#111111"
                                        strokeWidth="1.5"
                                        strokeOpacity="0.10"
                                        paintOrder="stroke"
                                    >
                                        A.Y.
                                    </text>

                                    <text
                                        x="10"
                                        y="98"
                                        textAnchor="start"
                                        fontFamily="Cronos Pro, serif"
                                        fontSize="36"
                                        fontWeight="400"
                                        fill="#111111"
                                        stroke="#111111"
                                        strokeWidth="1.5"
                                        strokeOpacity="0.10"
                                        paintOrder="stroke"
                                    >
                                        Mohammed
                                    </text>
                                </svg>
                            </div>

                            <div className="hidden sm:block">
                                <div className="text-xs leading-tight uppercase tracking-wider text-gray-700 font-medium">
                                    <div>The multi-million</div>
                                    <div className="mt-1">Bestselling author</div>
                                </div>
                            </div>
                        </div>

                        {/* Close button: make it clearly visible and accessible */}
                        <div>
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close menu"
                                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                                style={{ lineHeight: 0 }}
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="M6 18L18 6" />
                                    <path d="M6 6L18 18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <nav aria-label="Mobile main navigation" className="max-w-7xl mx-auto px-6 pb-8">
                        <ul className="space-y-3">
                            {items.map((it, idx) => (
                                <li key={it.label}>
                                    <a
                                        ref={idx === 0 ? firstLinkRef : null}
                                        href={it.href}
                                        className="block w-full px-4 py-3 rounded-md text-base font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                        onClick={() => setOpen(false)}
                                    >
                                        {it.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 border-t border-gray-100 pt-6">
                            <a
                                href="/signup"
                                className="inline-block px-5 py-3 border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition"
                                onClick={() => setOpen(false)}
                            >
                                Sign up to the newsletter
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
