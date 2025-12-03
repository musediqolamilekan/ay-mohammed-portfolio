export const metadata = {
    title: "About",
  };

export default function AboutPage() {
    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start overflow-hidden">
                <div
                    className="w-full aspect-auto md:aspect-auto overflow-hidden rounded-md"
                    aria-label="Portrait of A.Y. Mohammed"
                    data-aos="fade-right"
                    data-aos-duration="1000"
                >
                    <img
                        src="/assets/aboutMe.jpg"
                        alt="A.Y. Mohammed portrait"
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div
                    className="text-gray-900 px-5 lg:px-0 leading-relaxed text-[15.5px] md:text-[16px] space-y-6 my-auto"
                    aria-label="About A.Y. Mohammed"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                >
                    <p>
                        A.Y. Mohammed is a Nigerian writer whose work explores the quiet corners of everyday life.
                        His writing is shaped by memory, place, and the small moments that reveal larger truths.
                        Born and raised in Lagos, he learned early how stories hold family, history and community together.
                    </p>

                    <p>
                        He writes essays, short fiction and longer forms that blend clear observation with warm, precise
                        language. His work focuses on identity, migration, masculinity, and the ways ordinary lives change
                        over time. Readers respond to his calm voice and the care he brings to each scene and character.
                    </p>

                    <p>
                        Yemi studied Creative Writing and African Literature, where he sharpened a direct style that favors
                        clarity and emotional honesty. He publishes across digital and print outlets and has been featured
                        in literary magazines, cultural journals, and anthologies that examine modern African life.
                    </p>

                    <p>
                        His essays often begin with a single image — a street, a meal, a childhood place — then widen into
                        family history, social context, or memory. He writes to understand people and to give readers a
                        precise, human view of worlds that may be unfamiliar.
                    </p>

                    <p>
                        Over the years Yemi has developed several projects: a linked essay collection on migration and home,
                        a series of short stories that focus on fathers and sons, and a long-form work that traces a life
                        across three cities. He teaches occasional writing workshops and mentors emerging writers in his
                        community.
                    </p>

                    <p>
                        His awards and fellowships include regional writing prizes and residency invitations. Beyond
                        publications and honors, he values the small acts of reading and talking with other writers. Those
                        conversations shape his work as much as any formal program or award.
                    </p>

                    <p>
                        He continues to write daily, travel when possible, and collect details that become the seeds of new
                        pieces. His aim is simple: to write true sentences that stay with the reader after the page is closed.
                    </p>
                </div>
            </div>
        </section>
    );
}
