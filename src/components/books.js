"use client";

import React, { useEffect, useState, useCallback } from "react";
import BookCard from "./bookCard";

export default function BooksClient({
    initialBooks = [],
    initialCategories = [],
    initialCategory = "all",
    pageSize = 12,
}) {
    const [categories, setCategories] = useState(initialCategories);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [books, setBooks] = useState(initialBooks);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("publication");
    const [loading, setLoading] = useState(false);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    useEffect(() => {
        if (categories?.length) return;

        async function loadCategories() {
            try {
                const res = await fetch("/api/categories");
                if (!res.ok) throw new Error("Failed to load categories");
                const json = await res.json();
                const withAll = [{ _id: "all", title: "All", slug: "all" }, ...json];
                setCategories(withAll);
            } catch (err) {
                console.error("categories fetch error:", err);
                setCategories([{ _id: "all", title: "All", slug: "all" }]);
            }
        }

        loadCategories();
    }, [categories]);

    const fetchBooks = useCallback(async (catSlug, pageNum, sort) => {
        setLoading(true);
        try {
            const q = new URLSearchParams({
                category: catSlug || "all",
                page: String(pageNum || 1),
                pageSize: String(pageSize),
                sort: sort || sortBy,
            });
            const res = await fetch(`/api/books?${q.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch books");
            const json = await res.json();
            setBooks(json.books ?? []);
            setTotal(json.total ?? 0);
        } catch (err) {
            console.error("books fetch error:", err);
            setBooks([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [pageSize, sortBy]);

    useEffect(() => {
        setPage(1);
    }, [selectedCategory, sortBy]);

    useEffect(() => {
        fetchBooks(selectedCategory, page, sortBy);
    }, [selectedCategory, page, sortBy, fetchBooks]);

    const handleCategoryClick = (slug) => {
        if (slug === selectedCategory) return;
        setSelectedCategory(slug);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-6">
                <header className="flex items-center justify-between mb-8 lg:flex-row flex-col gap-6">
                    <div>
                        <h2 className="text-3xl font-serif tracking-wide">Browse All Books</h2>
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

                <div className="flex items-center justify-between mb-8 lg:flex-row flex-col gap-6">
                    <div className="mb-6 flex flex-wrap gap-3">
                        {(categories || []).map((c) => {
                            const active = c.slug === selectedCategory || (c.slug === "all" && selectedCategory === "all");
                            return (
                                <button
                                    key={c._id ?? c.slug}
                                    onClick={() => handleCategoryClick(c.slug ?? "all")}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${active
                                        ? "bg-[#01a2bb] text-white border-[#01a2bb]"
                                        : "bg-white/5 text-gray-700 border-gray-200 hover:bg-white/10"
                                        }`}
                                    aria-pressed={active}
                                >
                                    {c.title}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between mb-6 gap-4">
                        <div className="text-sm text-gray-500">
                            {loading ? "Loading…" : `${total} books${selectedCategory && selectedCategory !== "all" ? ` in ${selectedCategory}` : ""}`}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {books.length === 0 && !loading && (
                        <div className="col-span-full text-center text-gray-500 py-12">No books found.</div>
                    )}

                    {books.map((b, index) => (
                        <BookCard
                            key={b._id ?? b.id ?? index}
                            book={b}
                            data-aos="fade-up"
                            data-aos-delay={index * 60}
                            data-aos-duration="700"
                        />
                    ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1 || loading}
                        aria-label="Previous page"
                        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm border transition
      ${page <= 1 || loading ? "opacity-50 cursor-not-allowed bg-white/5 border-transparent" : "bg-white/5 hover:bg-white/10 border-gray-200"}
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#01a2bb]`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNum = i + 1;
                            const shouldHide =
                                totalPages > 7 &&
                                !(
                                    pageNum <= 2 ||
                                    pageNum > totalPages - 2 ||
                                    Math.abs(pageNum - page) <= 1
                                );

                            if (shouldHide) {
                                return null;
                            }

                            const isActive = pageNum === page;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`min-w-[38px] h-10 flex items-center justify-center rounded-full text-sm font-medium transition
            ${isActive ? "bg-[#01a2bb] text-white shadow-md" : "bg-white/5 text-gray-700 hover:bg-white/10"}`}
                                >
                                    {pageNum}
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
                        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-sm border transition
      ${page >= totalPages || loading ? "opacity-50 cursor-not-allowed bg-white/5 border-transparent" : "bg-white/5 hover:bg-white/10 border-gray-200"}
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#01a2bb]`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}
