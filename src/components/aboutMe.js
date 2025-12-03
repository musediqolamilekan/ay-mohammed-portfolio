export default function AboutMe() {
    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="w-full aspect-auto md:aspect-auto overflow-hidden rounded-md" aria-label="Portrait of A.Y. Mohammed">
                    <img
                        src="/assets/aboutMe.jpg"
                        alt="A.Y. Mohammed portrait"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div data-aos="fade-left" data-aos-duration="1000" className="text-gray-200 px-5 lg:px-0 leading-relaxed text-[15.5px] md:text-[16px] space-y-6 my-auto" aria-label="About A.Y. Mohammed">

                    <p>
                        A.Y. Mohammed is a Nigerian writer known for his emotionally rich storytelling and sharp reflections on identity, belonging,
                        and the everyday experiences that shape people. Growing up in Lagos, she discovered early the power of stories to preserve
                        memory and give voice to the unseen.
                    </p>

                    <p>
                        His work spans personal essays, cultural commentary, and fiction grounded in lived truth. She studied Creative Writing and
                        African Literature, developing a writing approach that blends clarity, honesty, and deep human insight.
                        Yemi’s pieces resonate widely for their calm wisdom and the simplicity with which she explains complex realities.
                    </p>

                    <p>
                        She has been published across several digital and print platforms and continues to build a body of work centered on the
                        themes of womanhood, culture, migration, and personal becoming. his writing is shaped by everyday questions, quiet moments,
                        and the deep desire to leave the reader with something to think about long after the final line.
                    </p>
                    <div>
                        <a
                            href="/about"
                            className="inline-block mt-4 px-5 py-2 text-sm border border-[#01a2bb] rounded-full text-[#01a2bb] font-semibold tracking-wide hover:bg-[#01a2bb] hover:text-[#FFFFFF] transition-all duration-300"
                        >
                            READ MORE
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
