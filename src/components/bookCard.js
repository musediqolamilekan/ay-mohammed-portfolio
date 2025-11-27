"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { urlFor } from "@/lib/sanity";

export default function BookCard({ book, className = "", ...domProps }) {
    const router = useRouter();
    const rootClass = `${className} relative group bg-white rounded-sm overflow-hidden`.trim();

    const coverUrl = book?.cover ? urlFor(book.cover).width(800).auto("format").url() : "/placeholder-book.png";
    const title = book.title ?? book.name ?? "Untitled";
    const bookHref = `/books/${book.slug ?? book._id}`;
    const handleClick = useCallback(
        (e) => {
            const anchor = e.target.closest("a");
            if (anchor) return;
            router.push(bookHref);
        },
        [router, bookHref]
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(bookHref);
            }
        },
        [router, bookHref]
    );

    return (
        <article
            {...domProps}
            className={rootClass}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="link"
            aria-label={`Open ${title} page`}
        >
            <div className="relative bg-gray-50 p-6 h-80 flex items-center justify-center">
                <img
                    src={coverUrl}
                    alt={title}
                    className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute top-4 lg:right-4 right-14 z-10">
                    <span
                        className="inline-flex w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow items-center justify-center text-sm font-medium text-gray-800 transition-transform duration-150"
                        aria-hidden
                    >
                        {book.seq ?? "—"}
                    </span>
                </div>

                {book.outOfStock && (
                    <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-sm text-gray-600">Out of stock</div>
                    </div>
                )}

                {!book.outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-gray-50 transition-colors">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 text-center">
                            <div className="space-y-3 w-56">
                                <div className="hidden lg:block space-y-3">
                                    <a
                                        href={book.links?.print ?? book.links?.ebook ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="block border border-gray-300 bg-white text-gray-900 py-3 rounded-md text-sm font-semibold hover:bg-[#01a2bb] hover:text-white"
                                    >
                                        BUY PRINT
                                    </a>

                                    <a
                                        href={book.links?.ebook ?? book.links?.print ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="block border border-gray-300 bg-white text-gray-900 py-3 rounded-md text-sm font-semibold hover:bg-[#01a2bb] hover:text-white"
                                    >
                                        BUY E-BOOK
                                    </a>

                                    <a
                                        href={book.links?.audio ?? "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="block border border-gray-300 bg-white text-gray-900 py-3 rounded-md text-sm font-semibold hover:bg-[#01a2bb] hover:text-white"
                                    >
                                        BUY AUDIOBOOK
                                    </a>
                                </div>

                                <Link href={bookHref}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-block mt-2 text-sm text-gray-800 underline"
                                >
                                    READ MORE
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-white">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">{book.description ?? ""}</p>
            </div>
        </article>
    );
}
