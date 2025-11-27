"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

/** helper: produce a short plain-text excerpt from Portable Text array */
function toExcerpt(content, max = 500) {
    if (!content) return "";
    if (typeof content === "string") return content.slice(0, max);
    const text = content
        .filter(b => b?.children)
        .map(b => b.children.map(c => c.text || "").join(""))
        .join("\n\n");
    return text.slice(0, max) + (text.length > max ? "…" : "");
}

export default function BlogListClient({ initialPage = 1, pageSize = 6 }) {
    const [page, setPage] = useState(initialPage);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const fetchPage = useCallback(async (p = 1) => {
        setLoading(true);
        try {
            const q = new URLSearchParams({ page: String(p), pageSize: String(pageSize) });
            const res = await fetch(`/api/blogs?${q.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const json = await res.json();
            setBlogs(json.blogs ?? []);
            setTotal(json.total ?? 0);
        } catch (err) {
            console.error(err);
            setBlogs([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [pageSize]);

    useEffect(() => { fetchPage(page); }, [page, fetchPage]);

    const handlePageChange = (p) => {
        if (p < 1 || p > totalPages || p === page) return;
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    function formatBlogDate(dateStr) {
        const date = new Date(dateStr);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="space-y-12">
                {loading && <div className="text-center text-gray-500">Loading...</div>}

                {blogs.map((b, index) => (
                    <article key={b._id} data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-duration="700" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start border-b border-gray-200 pb-8">
                        <div className="lg:col-span-8">
                            <div className="text-sm text-gray-500 mb-2">
                                {b.publishedDate ? formatBlogDate(b.publishedDate) : ""} •{" "}
                                {Math.max(1, Math.ceil((toExcerpt(b.content || "").length) / 140))} min
                            </div>

                            <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-3">
                                <Link href={`/blog/${b.slug}`}>
                                    <span>{b.title}</span>
                                </Link>
                            </h3>

                            <p className="text-gray-700 mb-4">
                                {toExcerpt(b.content)}
                                {" "}
                                <Link href={`/blog/${b.slug}`}>
                                    <span className="text-[#01a2bb] font-semibold">Read more</span>
                                </Link>
                            </p>

                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-8 h-8 rounded-full bg-[#01a2bb]/20 flex items-center justify-center text-sm font-medium text-[#01a2bb]">
                                    YM
                                </div>
                                <div className="text-sm text-gray-600">Yemi Mohammed</div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 flex justify-end">
                            <div className="w-full h-auto rounded-md overflow-hidden bg-gray-100 shadow-sm">
                                {b.coverImage?.asset ? (
                                    <img
                                        src={urlFor(b.coverImage).url()}
                                        alt={b.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* pagination (modern circular buttons + numbered) */}
            <div className="mt-10 flex items-center justify-center gap-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1 || loading}
                    aria-label="Previous page"
                    className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm transition ${page <= 1 ? "opacity-50 cursor-not-allowed bg-white/5 border-transparent" : "hover:bg-white/10 bg-white/5"
                        }`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const num = i + 1;
                        // hide middle pages for very long lists (keep a compact set)
                        const shouldHide =
                            totalPages > 7 &&
                            !(num <= 2 || num > totalPages - 2 || Math.abs(num - page) <= 1);
                        if (shouldHide) return null;
                        const active = num === page;
                        return (
                            <button
                                key={num}
                                onClick={() => handlePageChange(num)}
                                aria-current={active ? "page" : undefined}
                                className={`min-w-10 h-10 rounded-full text-sm font-medium transition ${active ? "bg-[#01a2bb] text-white shadow-md" : "bg-white/5 text-gray-700 hover:bg-white/10"}`}
                            >
                                {num}
                            </button>
                        );
                    })}

                    {totalPages > 7 && page > 3 && <span className="px-2 text-gray-400 select-none">…</span>}
                    {totalPages > 7 && page < totalPages - 2 && <span className="px-2 text-gray-400 select-none">…</span>}
                </div>

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages || loading}
                    aria-label="Next page"
                    className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm transition ${page >= totalPages ? "opacity-50 cursor-not-allowed bg-white/5 border-transparent" : "hover:bg-white/10 bg-white/5"
                        }`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
