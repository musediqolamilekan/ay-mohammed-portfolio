"use client";

import React, { useMemo, useState, useEffect } from "react";
import BookCard from "./bookCard";
export default function BookGrid({ books = [], showAll = false }) {
    const [sortBy, setSortBy] = useState("publication");
    useEffect(() => {
    }, [books]);

    const sorted = useMemo(() => {
        const clone = [...books];
        if (sortBy === "publication") {
            return clone.sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));
        }
        if (sortBy === "recent") {
            return clone.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        }
        if (sortBy === "popular") {
            return clone.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        }
        return clone;
    }, [books, sortBy]);

    const visible = showAll ? sorted : sorted.slice(0, 4);

    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-6">
                <header className="flex items-start justify-between mb-8 lg:flex-row flex-col gap-6">
                    <div>
                        <h2 className="text-3xl font-serif tracking-wide">A.Y. Mohammed Series</h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-xl">
                            International bestsellers — atmospheric mysteries rooted in Nigeria, driven by place, memory and slow-burning suspense.
                        </p>
                    </div>

                    <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M4 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M4 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>

                            <div className="flex items-center gap-2">
                                <span className="uppercase tracking-wide text-gray-700">Arrange by</span>

                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-transparent pl-3 pr-8 py-1 text-sm font-medium border-b border-transparent focus:outline-none"
                                        aria-label="Sort books"
                                    >
                                        <option value="publication">Publication order</option>
                                        <option value="recent">Most recent</option>
                                        <option value="popular">Most popular</option>
                                    </select>
                                    <svg className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {visible.map((b, index) => (
                        <BookCard
                            key={b._id ?? b.id}
                            book={b}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-duration="700"
                        />
                    ))}
                </div>

                {!showAll && (
                    <div className="mt-8 flex justify-center">
                        <a
                            href="/books"
                            className="inline-block mt-4 px-5 py-2 text-sm border border-[#01a2bb] rounded-full text-[#01a2bb] font-semibold tracking-wide hover:bg-[#01a2bb] hover:text-[#FFFFFF] transition-all duration-300"
                        >
                            EXPLORE MORE
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
