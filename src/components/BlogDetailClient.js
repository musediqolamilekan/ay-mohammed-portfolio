"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
function formatBlogDate(dateStr) {
    const date = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}


export default function BlogDetailClient({ initialBlog }) {
    const [blog, setBlog] = useState(initialBlog);
    const [likes, setLikes] = useState(initialBlog?.likes ?? 0);
    const [liked, setLiked] = useState(false);
    const [saving, setSaving] = useState(false);

    const slug = blog?.slug;
    const localKey = slug ? `liked_blog_${slug}` : null;

    const [mounted, setMounted] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setMounted(true);
        try {
            setCurrentUrl(window.location.href);
        } catch (e) {
            setCurrentUrl("");
        }
    }, []);

    useEffect(() => {
        if (!localKey) return;
        try {
            const stored = localStorage.getItem(localKey);
            setLiked(Boolean(stored));
        } catch (e) {

        }
    }, [localKey]);

    async function handleLike() {
        if (!slug || liked || saving) return;
        setLikes(prev => prev + 1);
        setLiked(true);
        setSaving(true);
        try {
            localStorage.setItem(localKey, "1");
        } catch (e) {

        }

        try {
            const res = await fetch(`/api/blogs/${slug}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Like failed");
            const json = await res.json();
            if (typeof json.likes === "number") {
                setLikes(json.likes);
            }
        } catch (err) {
            console.error("Error saving like:", err);
            setLikes(prev => Math.max(0, prev - 1));
            setLiked(false);
            try { localStorage.removeItem(localKey); } catch { }
        } finally {
            setSaving(false);
        }
    }

    async function handleCopyLink() {
        const url = typeof window !== "undefined" ? window.location.href : "";
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error("Copy failed", err);
        }
    }

    if (!blog) return null;

    return (
        <article className="prose prose-lg max-w-none">
            {blog.coverImage ? (
                <div className="w-full h-auto overflow-hidden rounded-md mb-8 bg-gray-100">
                    <img
                        src={urlFor(blog.coverImage).url()}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            ) : null}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <div className="text-sm text-gray-500">
                        {blog.publishedDate ? formatBlogDate(blog.publishedDate) : ""} •
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold leading-tight mt-2">{blog.title}</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <a
                                href={mounted ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}` : "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                aria-label="Share to X"
                                aria-disabled={!mounted}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.7512 2.96094H20.818L14.1179 10.6187L22 21.0391H15.8284L10.9946 14.7191L5.4636 21.0391H2.39492L9.56132 12.8483L2 2.96094H8.32824L12.6976 8.73762L17.7512 2.96094ZM16.6748 19.2035H18.3742L7.40492 4.70014H5.58132L16.6748 19.2035Z" fill="currentColor" />
                                </svg>

                            </a>
                            <a
                                href={mounted ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blog.title)}` : "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                aria-label="Share to LinkedIn"
                                aria-disabled={!mounted}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z" fill="currentColor" />
                                </svg>

                            </a>
                            <a
                                href={mounted ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` : "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                aria-label="Share to Facebook"
                                aria-disabled={!mounted}
                            >
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.53906C17.5229 2.53906 22 7.01621 22 12.5391C22 17.5304 18.3431 21.6674 13.5625 22.4176V15.4297H15.8926L16.3359 12.5391L13.5625 12.5387V10.6632C13.5625 10.657 13.5625 10.6509 13.5626 10.6447C13.5626 10.6354 13.5628 10.6262 13.5629 10.6169C13.578 9.84259 13.9742 9.10156 15.1921 9.10156H16.4531V6.64062C16.4531 6.64062 15.3087 6.44492 14.2146 6.44492C11.966 6.44492 10.4842 7.78652 10.4386 10.2193C10.4379 10.2578 10.4375 10.2965 10.4375 10.3355V12.5387H7.89844V15.4293L10.4375 15.4297V22.4172C5.65686 21.667 2 17.5304 2 12.5391C2 7.01621 6.47715 2.53906 12 2.53906Z" fill="currentColor" />
                                </svg>

                            </a>
                            <button
                                onClick={handleCopyLink}
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                aria-label="Copy link"
                                title="Copy link"
                                disabled={!mounted}
                            >
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.1022 14.0998C17.2236 14.9785 15.7989 14.9785 14.9203 14.0998L13.5581 12.7377L12.4971 13.7987L13.8593 15.1608C14.738 16.0395 14.7379 17.4641 13.8593 18.3428L10.1198 22.0822C9.24115 22.9609 7.81652 22.9609 6.93785 22.0822L3.1551 18.2995C2.27642 17.4208 2.27642 15.9962 3.1551 15.1175L6.89455 11.378C7.77323 10.4994 9.19785 10.4994 10.0765 11.378L11.4365 12.738L12.4975 11.677L11.1376 10.3171C10.2589 9.4384 10.2589 8.01378 11.1376 7.1351L14.8812 3.39143C15.7599 2.51275 17.1845 2.51275 18.0632 3.39143L21.8459 7.17415C22.7246 8.05283 22.7246 9.47745 21.8459 10.3561L18.1022 14.0998ZM10.3758 13.7987L9.01587 12.4387C8.72297 12.1458 8.2481 12.1458 7.95521 12.4387L4.21576 16.1782C3.92287 16.471 3.92287 16.9459 4.21576 17.2388L7.99851 21.0216C8.2914 21.3144 8.76627 21.3144 9.05917 21.0216L12.7986 17.2821C13.0915 16.9892 13.0915 16.5143 12.7986 16.2215L11.4365 14.8593L10.205 16.0907C9.91215 16.3836 9.43728 16.3836 9.14439 16.0907C8.85149 15.7979 8.85149 15.323 9.14439 15.0301L10.3758 13.7987ZM15.9809 13.0391L14.6188 11.677L15.8619 10.4339C16.1548 10.141 16.1548 9.66612 15.8619 9.37323C15.569 9.08034 15.0941 9.08034 14.8012 9.37323L13.5581 10.6163L12.1982 9.25642C11.9053 8.96352 11.9053 8.48865 12.1982 8.19576L15.9419 4.45209C16.2348 4.1592 16.7096 4.1592 17.0025 4.45209L20.7853 8.23481C21.0781 8.5277 21.0781 9.00257 20.7853 9.29547L17.0416 13.0391C16.7487 13.332 16.2738 13.332 15.9809 13.0391Z" fill="currentColor" />
                                </svg>

                            </button>
                        </div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1 select-none">Share via</h4>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center flex-col gap-2 text-sm text-gray-700"
                            aria-label="Print page"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.1549 7.79099V6.6226C18.1549 6.01369 17.9081 5.43079 17.4709 5.007L16.3137 3.88538C15.894 3.4785 15.3323 3.25098 14.7477 3.25098H8.09473C6.85208 3.25098 5.84473 4.25834 5.84473 5.50098V7.79099H5.5C4.25736 7.79099 3.25 8.79836 3.25 10.041V13.9595C3.25 15.2021 4.25736 16.2095 5.5 16.2095H5.84375V18.5C5.84375 19.7426 6.85111 20.75 8.09375 20.75H15.9039C17.1465 20.75 18.1539 19.7426 18.1539 18.5V16.2095H18.4991C19.7417 16.2095 20.7491 15.2021 20.7491 13.9595V10.041C20.7491 8.79835 19.7417 7.79099 18.4991 7.79099H18.1549ZM8.09473 4.75098C7.68051 4.75098 7.34473 5.08676 7.34473 5.50098V7.79099H16.6549V6.6226C16.6549 6.41963 16.5726 6.22533 16.4269 6.08406L15.2697 4.96244C15.1298 4.82682 14.9426 4.75098 14.7477 4.75098H8.09473ZM5.84375 13.9463V14.7095H5.5C5.08579 14.7095 4.75 14.3737 4.75 13.9595V10.041C4.75 9.62678 5.08579 9.29099 5.5 9.29099H18.4991C18.9133 9.29099 19.2491 9.62678 19.2491 10.041V13.9595C19.2491 14.3737 18.9133 14.7095 18.4991 14.7095H18.1539V13.9463C18.1539 13.5321 17.8181 13.1963 17.4039 13.1963H6.59375C6.17954 13.1963 5.84375 13.5321 5.84375 13.9463ZM7.34375 14.6963V18.5C7.34375 18.9142 7.67954 19.25 8.09375 19.25H15.9039C16.3181 19.25 16.6539 18.9142 16.6539 18.5V14.6963H7.34375Z" fill="currentColor" />
                            </svg>

                            <h4 className="text-xs font-medium text-gray-500 mb-1 select-none">Print page</h4>
                        </button>
                        <button
                            type="button"
                            onClick={handleLike}
                            disabled={liked}
                            aria-pressed={liked}
                            aria-label="Like article"
                            className={`flex items-center flex-col gap-2 px-3 py-2
    ${liked ? "text-[#01a2bb]" : "text-gray-700"}
  `}
                            aria-disabled={liked}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.8227 4.77124L12 4.94862L12.1773 4.77135C14.4244 2.52427 18.0676 2.52427 20.3147 4.77134C22.5618 7.01842 22.5618 10.6616 20.3147 12.9087L13.591 19.6324C12.7123 20.5111 11.2877 20.5111 10.409 19.6324L3.6853 12.9086C1.43823 10.6615 1.43823 7.01831 3.6853 4.77124C5.93237 2.52417 9.5756 2.52417 11.8227 4.77124ZM10.762 5.8319C9.10073 4.17062 6.40725 4.17062 4.74596 5.8319C3.08468 7.49319 3.08468 10.1867 4.74596 11.848L11.4697 18.5718C11.7625 18.8647 12.2374 18.8647 12.5303 18.5718L19.254 11.8481C20.9153 10.1868 20.9153 7.49329 19.254 5.83201C17.5927 4.17072 14.8993 4.17072 13.238 5.83201L12.5304 6.53961C12.3897 6.68026 12.199 6.75928 12 6.75928C11.8011 6.75928 11.6104 6.68026 11.4697 6.53961L10.762 5.8319Z" fill="currentColor" />
                            </svg>
                            <h4 className="text-sm font-medium">{likes} Likes</h4>
                        </button>

                    </div>
                </div>
            </div>

            <div className="prose max-w-none">
                {blog.content ? (
                    <PortableText value={blog.content} />
                ) : (
                    <div className="text-gray-700">No content available.</div>
                )}
            </div>
        </article>
    );
}
