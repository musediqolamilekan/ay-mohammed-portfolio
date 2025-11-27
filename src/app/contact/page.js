"use client";
import { useState, useEffect } from "react";

export default function Footer() {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
    const [status, setStatus] = useState(null);
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

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.email) return setStatus("error");
        setStatus("loading");
        try {
            await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setStatus("success");
            setForm({ firstName: "", lastName: "", email: "" });
        } catch (err) {
            setStatus("error");
        }
    }

    const twitterHref = mounted ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent("Check this out")}` : "#";
    const facebookHref = mounted ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` : "#";
    const linkedInHref = mounted ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent("Check this out")}` : "#";
    const mailHref = `mailto:?subject=${encodeURIComponent("Thought you might like this")}&body=${encodeURIComponent(mounted ? currentUrl : "")}`;

    return (
        <div className="w-full bg-gray-50">
            <div className="max-w-7xl mx-auto py-16 px-6">
                <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-left">
                    <a
                        href={mailHref}
                        className="group flex items-center gap-4"
                        aria-label="Send an email"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors duration-200 group-hover:bg-[#01a2bb]">
                            <svg width="24" height="24" className="text-gray-700 transition-colors duration-200 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M22 6.25649V17.25C22 18.4926 20.9926 19.5 19.75 19.5H4.25C3.00736 19.5 2 18.4926 2 17.25V6.23398C2 6.22372 2.00021 6.2135 2.00061 6.20334C2.01781 5.25972 2.78812 4.5 3.73592 4.5H20.2644C21.2229 4.5 22 5.27697 22.0001 6.23549C22.0001 6.24249 22.0001 6.24949 22 6.25649ZM3.5 8.187V17.25C3.5 17.6642 3.83579 18 4.25 18H19.75C20.1642 18 20.5 17.6642 20.5 17.25V8.18747L13.2873 13.2171C12.5141 13.7563 11.4866 13.7563 10.7134 13.2171L3.5 8.187ZM20.5 6.2286L20.5 6.23398V6.24336C20.4976 6.31753 20.4604 6.38643 20.3992 6.42905L12.4293 11.9867C12.1716 12.1664 11.8291 12.1664 11.5713 11.9867L3.60116 6.42885C3.538 6.38481 3.50035 6.31268 3.50032 6.23568C3.50028 6.10553 3.60577 6 3.73592 6H20.2644C20.3922 6 20.4963 6.10171 20.5 6.2286Z" fill="currentColor" />
                            </svg>

                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Send an</div>
                            <div className="text-base font-semibold">Email</div>
                        </div>
                    </a>
                    <a
                        href={facebookHref}
                        className="group flex items-center gap-4"
                        aria-label="Like on Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors duration-200 group-hover:bg-[#01a2bb]">
                            <svg width="24" height="25" className="text-gray-700 transition-colors duration-200 group-hover:text-white" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.53906C17.5229 2.53906 22 7.01621 22 12.5391C22 17.5304 18.3431 21.6674 13.5625 22.4176V15.4297H15.8926L16.3359 12.5391L13.5625 12.5387V10.6632C13.5625 10.657 13.5625 10.6509 13.5626 10.6447C13.5626 10.6354 13.5628 10.6262 13.5629 10.6169C13.578 9.84259 13.9742 9.10156 15.1921 9.10156H16.4531V6.64062C16.4531 6.64062 15.3087 6.44492 14.2146 6.44492C11.966 6.44492 10.4842 7.78652 10.4386 10.2193C10.4379 10.2578 10.4375 10.2965 10.4375 10.3355V12.5387H7.89844V15.4293L10.4375 15.4297V22.4172C5.65686 21.667 2 17.5304 2 12.5391C2 7.01621 6.47715 2.53906 12 2.53906Z" fill="currentColor" />
                            </svg>
                        </div>

                        <div>
                            <div className="text-sm text-gray-600">Like on</div>
                            <div className="text-base font-semibold">Facebook</div>
                        </div>
                    </a>
                    <a
                        href={twitterHref}
                        className="group flex items-center gap-4"
                        aria-label="Follow on X"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors duration-200 group-hover:bg-[#01a2bb]">
                            <svg width="24" height="24" className="text-gray-700 transition-colors duration-200 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.7512 2.96094H20.818L14.1179 10.6187L22 21.0391H15.8284L10.9946 14.7191L5.4636 21.0391H2.39492L9.56132 12.8483L2 2.96094H8.32824L12.6976 8.73762L17.7512 2.96094ZM16.6748 19.2035H18.3742L7.40492 4.70014H5.58132L16.6748 19.2035Z" fill="currentColor" />
                            </svg>
                        </div>

                        <div>
                            <div className="text-sm text-gray-600">Follow on</div>
                            <div className="text-base font-semibold">Twitter</div>
                        </div>
                    </a>
                    <a
                        href={linkedInHref}
                        className="group flex items-center gap-4"
                        aria-label="Share on LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors duration-200 group-hover:bg-[#01a2bb]">
                            <svg width="24" height="24" className="text-gray-700 transition-colors duration-200 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z" fill="currentColor" />
                            </svg>
                        </div>

                        <div>
                            <div className="text-sm text-gray-600">Share on</div>
                            <div className="text-base font-semibold">LinkedIn</div>
                        </div>
                    </a>
                </div>
                <div className="p-8 md:p-12 rounded-sm bg-gray-100">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl text-gray-900 italic tracking-wide">
                            Sign up to the <span className="font-semibold not-italic">Book Club</span> to receive updates and exclusive content.
                        </h3>
                        <p className="mt-4 text-sm text-gray-700">
                            This service is free. Your details will not be shared. You may unsubscribe at any time.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
                                className="px-4 py-4 bg-white border border-gray-200 placeholder-gray-400 text-sm w-full"
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
                                className="px-4 py-4 bg-white border border-gray-200 placeholder-gray-400 text-sm w-full"
                            />

                            <div className="md:col-span-1 md:col-start-1">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={form.email}
                                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                                    required
                                    className="px-4 py-4 bg-white border border-gray-200 placeholder-gray-400 text-sm w-full"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer px-6 py-4 bg-[#01a2bb] text-white text-sm font-semibold hover:opacity-95 transition"
                                    aria-label="Subscribe"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? "Saving..." : "Subscribe"}
                                </button>
                            </div>

                            <div className="md:col-span-2 mt-2">
                                {status === "success" && <p className="text-sm text-green-600">Thanks — check your inbox.</p>}
                                {status === "error" && <p className="text-sm text-red-600">There was an error. Try again.</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
