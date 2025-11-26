"use client"
import React, { useState } from 'react'

const Header = () => {
    const [open, setOpen] = useState(false);

    const items = [
        { href: "/", label: "Welcome", current: true },
        { href: "/about", label: "About" },
        { href: "/books", label: "Books" },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];
    return (
        <header className="site-header w-full lg:h-[600px] h-fit" role='banner'>
            <div className='max-w-[1040px] mx-auto h-full p-4 flex justify-center items-center flex-col relative'>
                <nav
                    className="hidden md:flex items-center"
                    aria-label="Main"
                >
                    <ul className="flex gap-6 md:gap-8 items-center">
                        {items.map((it) => (
                            <li key={it.label} className="">
                                <a
                                    href={it.href}
                                    itemProp="url"
                                    className={
                                        "relative inline-block px-2 py-1 text-sm md:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 " +
                                        (it.current
                                            ? "text-blue-50 after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-blue-300"
                                            : "text-white/90 hover:text-white after:opacity-0 hover:after:opacity-100")
                                    }
                                    aria-current={it.current ? "page" : undefined}
                                >
                                    <span>{it.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="md:hidden w-full">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => setOpen((s) => !s)}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            className="p-2 rounded-md text-white hover:bg-white/6 focus:outline-none focus:ring-0 flex justify-center items-center"
                        >
                            <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                )}
                            </svg> MENU
                        </button>
                    </div>

                    <div
                        id="mobile-menu"
                        className={`mt-3 w-full ${open ? "block" : "hidden"}`}
                        role="menu"
                        aria-label="Mobile Main Navigation"
                    >
                        <ul className="flex flex-col items-center gap-3 py-2">
                            {items.map((it) => (
                                <li key={it.label}>
                                    <a
                                        href={it.href}
                                        className={
                                            "block px-4 py-2 rounded-md text-base font-semibold transition-colors " +
                                            (it.current ? "bg-white/6 text-white" : "text-white/90 hover:bg-white/4")
                                        }
                                    >
                                        {it.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='w-full h-full flex justify-center flex-col items-center lg:py-0 py-30' aria-label="Yemi Muhammed nameplate link to homepage"   >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(60,80)">
                            <circle cx="0" cy="0" r="6" fill="#2ec2b8" />
                            <circle cx="34" cy="12" r="5" fill="#f28fb0" />
                            <circle cx="-26" cy="22" r="4" fill="#f6c85f" />
                            <path d="M-40 -10 L-10 -2" stroke="#3b5bb3" strokeWidth="3" />
                            <path d="M10 26 L40 36" stroke="#3b5bb3" strokeWidth="3" />
                            <path d="M-5 -25 L5 -40" stroke="#2ec2b8" strokeWidth="3" />
                        </g>

                        <g transform="translate(1140,80)">
                            <circle cx="0" cy="0" r="6" fill="#f6c85f" />
                            <circle cx="-30" cy="18" r="5" fill="#2ec2b8" />
                            <circle cx="-46" cy="-8" r="4" fill="#f28fb0" />
                            <path d="M-60 10 L-25 25" stroke="#3b5bb3" strokeWidth="3" />
                            <path d="M10 -10 L40 -20" stroke="#3b5bb3" strokeWidth="3" />
                        </g>

                        <g transform="translate(260,48) scale(1.12)" className="icon">
                            <path d="M0 0 L28 28" />
                            <path d="M28 28 L48 8" />
                            <path d="M48 8 L18 -22" />
                            <circle cx="10" cy="-10" r="3" fill="#3b5bb3" stroke="none" />
                        </g>

                        <g transform="translate(980,52) scale(1.12)" className="icon">
                            <path d="M0 0 L0 36 L35 26 L35 -14 Z" />
                            <path d="M35 -14 L70 -4 L70 36 L35 26" />
                            <line x1="0" y1="12" x2="35" y2="4" stroke="#3b5bb3" />
                            <line x1="35" y1="4" x2="70" y2="12" stroke="#3b5bb3" />
                        </g>

                        <g transform="translate(620,44)">
                            <path d="M0 -12 L4 -4 L12 -4 L6 2 L8 10 L0 6 L-8 10 L-6 2 L-12 -4 L-4 -4 Z" fill="#f6c85f" />
                            <circle cx="30" cy="-4" r="3" fill="#f28fb0" />
                            <circle cx="-30" cy="0" r="3" fill="#2ec2b8" />
                            <path d="M54 6 L64 16" stroke="#3b5bb3" strokeWidth="3" />
                            <path d="M-54 6 L-64 16" stroke="#3b5bb3" strokeWidth="3" />
                        </g>

                        <g transform="translate(600,150)">
                            <text x="0" y="0" className="t" fontSize="170" textAnchor="middle" transform="scale(1.12,1)" fill="#f6d6d8" stroke="#ffffff" strokeWidth="6" strokeOpacity="0.14" paintOrder="stroke">
                                Yemi
                            </text>
                        </g>
                        <g transform="translate(600,310)">
                            <text x="0" y="0" className="t" fontSize="170" textAnchor="middle" transform="scale(1.12,1)" fill="#f6d6d8" stroke="#ffffff" strokeWidth="5" strokeOpacity="0.14" paintOrder="stroke">
                                Muhammed
                            </text>
                        </g>
                        <g transform="translate(520,270)">
                            <circle cx="0" cy="0" r="5" fill="#2ec2b8" />
                            <circle cx="26" cy="6" r="4" fill="#f28fb0" />
                            <circle cx="-26" cy="10" r="4" fill="#f6c85f" />
                        </g>
                    </svg>
                    <div className='flex justify-center items-center space-x-5'>
                        <a href="/" aria-label="Yemi Muhammed homepage link">
                            <img src="/assets/icons/facebook.png" alt="" className='w-8 h-8' />
                        </a>
                        <a href="/" aria-label="Yemi Muhammed homepage link">
                            <img src="/assets/icons/twitter.png" alt="" className='w-8 h-8' />
                        </a>
                        <a href="/" aria-label="Yemi Muhammed homepage link">
                            <img src="/assets/icons/facebook.png" alt="" className='w-8 h-8' />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header