export default function BooksHero({ hero }) {
    return (
        <section
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.bgImage})` }}
            aria-label="Latest release hero"
        >
            <div className="bg-black/55">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <header className="mb-8">
                        <h2 className="text-2xl md:text-3xl tracking-wide" style={{ color: "white" }}>
                            {hero.sectionTitle}
                        </h2>
                        <div className="mt-4 h-px w-full bg-gray-300/60" />
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-4 flex justify-center lg:justify-start">
                            <img
                                src={hero.cover}
                                alt={`${hero.title} cover`}
                                className="w-64 md:w-72 object-cover rounded-sm shadow-lg border border-white/10"
                                style={{ backgroundColor: "#f6f6f6" }}
                                loading="lazy"
                            />
                        </div>
                        <div className="lg:col-span-8 text-white">
                            <h3 className="text-4xl md:text-5xlmb-6" style={{ color: "white" }}>
                                {hero.title}
                            </h3>

                            <div className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed mb-6" style={{ color: "white" }}>
                                {hero.description.map((p, i) => (
                                    <p key={i} style={{ color: "white" }}>{p}</p>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                                <a
                                    href={hero.links.readMore}
                                    aria-label="Read more about the book"
                                    className="inline-block px-6 py-3 border border-gray-300 bg-white/5 text-white text-sm font-semibold rounded-sm hover:bg-[#01a2bb] transition"
                                >
                                    READ MORE
                                </a>

                                <a
                                    href={hero.links.ebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Buy ebook"
                                    className="inline-block px-6 py-3 border border-gray-300 bg-white/5 text-white text-sm font-semibold rounded-sm hover:bg-[#01a2bb] transition"
                                >
                                    BUY E-BOOK
                                </a>

                                <a
                                    href={hero.links.audio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Buy audiobook"
                                    className="inline-block px-6 py-3 border border-gray-300 bg-white/5 text-white text-sm font-semibold rounded-sm hover:bg-[#01a2bb] transition"
                                >
                                    BUY AUDIOBOOK
                                </a>

                                <a
                                    href={hero.links.print}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Buy print"
                                    className="inline-block px-6 py-3 border border-gray-300 bg-white/5 text-white text-sm font-semibold rounded-sm hover:bg-[#01a2bb] transition"
                                >
                                    BUY PRINT
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
