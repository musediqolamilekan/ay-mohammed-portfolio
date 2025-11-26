"use client";
import { useState } from 'react';

export default function Footer() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
    const [status, setStatus] = useState(null);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.email) return setStatus('error');
        setStatus('loading');
        try {
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            setStatus('success');
            setForm({ firstName: '', lastName: '', email: '' });
        } catch (err) {
            setStatus('error');
        }
    }

    return (
        <footer className="w-full site-header">
            <div>
                <div className="max-w-5xl mx-auto py-16 px-6">
                    <div className="p-8 md:p-12 rounded-sm">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="text-2xl md:text-3xl text-white italic tracking-wide">
                                Sign up to the <span className="font-semibold not-italic">Book Club</span> to receive updates and exclusive content.
                            </h3>
                            <p className="mt-4 text-sm text-white" style={{ color: "#FFFFFF" }}>
                                This service is free. Your details will not be shared. You may unsubscribe at any time.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={form.firstName}
                                    onChange={(e) => setForm(s => ({ ...s, firstName: e.target.value }))}
                                    className="px-4 py-4 bg-white border border-gray-200 placeholder-gray-400 text-sm w-full"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={form.lastName}
                                    onChange={(e) => setForm(s => ({ ...s, lastName: e.target.value }))}
                                    className="px-4 py-4 bg-white border border-gray-200 placeholder-gray-400 text-sm w-full"
                                />

                                <div className="md:col-span-1 md:col-start-1">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={form.email}
                                        onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))}
                                        required
                                        className="px-4 py-4 bg-white border border-gray-200 placeholder-gray-400 text-sm w-full"
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer px-6 py-4 bg-[#f6d6d8] text-[#333333] text-sm font-semibold hover:opacity-95 transition"
                                        aria-label="Subscribe"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Saving...' : 'Subscribe'}
                                    </button>
                                </div>

                                <div className="md:col-span-2 mt-2">
                                    {status === 'success' && <p className="text-sm text-green-600">Thanks — check your inbox.</p>}
                                    {status === 'error' && <p className="text-sm text-red-600">There was an error. Try again.</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="text-gray-200">
                        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                            <div className="text-sm md:text-base">
                                <div className="text-white font-medium">© AY Muhammed 2025</div>
                            </div>

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
                </div>
            </div>
        </footer>
    );
}
