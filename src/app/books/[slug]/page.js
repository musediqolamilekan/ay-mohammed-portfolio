// app/books/[slug]/page.jsx
import { serverClient } from "@/lib/sanityServer";
import { urlFor } from "@/lib/sanity";
import BookGrid from "@/components/bookGrid";
import RelatedBooks from "@/components/relatedBooks";
import { Metadata } from "next";

export const revalidate = 60;

const bookBySlugQuery = `*[_type == "book" && slug.current == $slug][0]{
  _id,
  title,
  seq,
  slug,
  cover,
  excerpt,
  description,
  authorNote,
  contentGuide,
  publishedDate,
  outOfStock,
  popularity,
  links,
  "category": category-> { _id, title, "slug": slug.current }
}`;

const relatedBooksQuery = `*[_type == "book" && category._ref == $catRef && slug.current != $slug] | order(seq asc){
  _id,
  title,
  "slug": slug.current,
  seq,
  cover,
  excerpt,
  description,
  publishedDate,
  outOfStock,
  popularity,
  links,
  "category": category-> { _id, title, "slug": slug.current }
}`;

const bookMetaQuery = `*[_type == "book" && slug.current == $slug][0]{title, excerpt, description, cover}`;

export async function generateMetadata({ params }) {
    const resolved = await params;
    let slug = resolved?.slug ?? resolved?.params?.slug ?? null;
    if (Array.isArray(slug)) slug = slug[0];

    if (!slug) {
        return {
            title: "Books",
            description: "A.Y. Mohammed books and series.",
        };
    }

    try {
        const book = await serverClient.fetch(bookMetaQuery, { slug });
        const title = book?.title ?? "Book";
        const description =
            book?.excerpt ?? (book?.description ? book.description.slice(0, 160) : "A.Y. Mohammed books");
        const ogImage = book?.cover ? urlFor(book.cover).width(1200).height(630).auto("format").url() : null;

        return {
            title,
            description,
            openGraph: {
                title: book?.title || "Book",
                description,
                type: "book",
                images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
            },
            twitter: {
                card: ogImage ? "summary_large_image" : "summary",
            },
        };
    } catch (err) {
        console.error("Sanity fetch error (metadata):", err);
        return {
            title: "Book",
            description: "A.Y. Mohammed books and series.",
        };
    }
}

export async function generateStaticParams() {
    const rows = await serverClient.fetch(
        `*[_type == "book" && defined(slug.current)]{"slug": slug.current}`
    );
    return Array.isArray(rows) ? rows.map((r) => ({ slug: r.slug })) : [];
}

function resolveSlug(resolved) {
    let slug = resolved?.slug ?? resolved?.params?.slug ?? null;
    if (Array.isArray(slug)) slug = slug[0];
    return slug;
}

export default async function BookPage({ params }) {
    const resolved = await params;
    let slug = resolved?.slug ?? resolved?.params?.slug ?? null;
    if (Array.isArray(slug)) slug = slug[0];

    if (!slug) {
        return (
            <div className="max-w-4xl mx-auto py-24 px-6">
                <h2 className="text-2xl font-semibold">Missing slug</h2>
            </div>
        );
    }

    let book = null;
    try {
        book = await serverClient.fetch(bookBySlugQuery, { slug });
    } catch (err) {
        console.error("Sanity fetch error (book):", err);
        return (
            <div className="max-w-4xl mx-auto py-24 px-6">
                <h2 className="text-2xl font-semibold">Failed to load book</h2>
                <pre className="mt-4 text-sm text-red-600">{String(err.message)}</pre>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="max-w-4xl mx-auto py-24 px-6">
                <h2 className="text-2xl font-semibold">Book not found</h2>
            </div>
        );
    }

    let relatedBooks = [];
    if (book.category?._id) {
        try {
            relatedBooks = await serverClient.fetch(relatedBooksQuery, {
                catRef: book.category._id,
                slug,
            });
        } catch (err) {
            console.error("Sanity fetch error (related):", err);
            relatedBooks = [];
        }
    }

    const coverUrl = book.cover ? urlFor(book.cover).width(780).auto("format").url() : null;

    return (
        <main className="w-full">
            <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                    <div className="text-xs uppercase text-gray-500 tracking-wider mb-4">
                        {book.category?.title || "Book"}
                    </div>

                    <h1 className="text-4xl md:text-5xl mb-4">{book.title}</h1>

                    {book.description && <h3 className="italic text-xl text-gray-700 mb-6">“{book.description}”</h3>}

                    <div className="prose max-w-none text-gray-700 mb-6">
                        {book.excerpt?.split("\n\n").map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    {book.authorNote && (
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold mb-2">Author’s Note</h4>
                            <p className="text-sm text-gray-600">{book.authorNote}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <a href={book.links?.ebook ?? "#"} className="block border border-gray-300 transition text-center py-4 font-semibold hover:bg-[#01a2bb] hover:text-white">BUY E-BOOK</a>
                        <a href={book.links?.audio ?? "#"} className="block border border-gray-300 transition text-center py-4 font-semibold hover:bg-[#01a2bb] hover:text-white">BUY AUDIOBOOK</a>
                        <a href={book.links?.print ?? "#"} className="block border border-gray-300 transition text-center py-4 font-semibold hover:bg-[#01a2bb] hover:text-white">BUY PRINT</a>
                    </div>
                </div>
                <div className="lg:col-span-5">
                    <div className="bg-gray-100 p-12 flex items-center justify-center">
                        {coverUrl ? (
                            <img src={coverUrl} alt={book.title} className="w-64 md:w-80 object-contain shadow-lg" />
                        ) : (
                            <div className="w-64 h-96 bg-gray-200" />
                        )}
                    </div>
                </div>
            </section>

            {/* Related books */}
            {relatedBooks.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 pb-20">
                    <RelatedBooks books={relatedBooks} categoryTitle={book.category.title} showAll={false} />
                </section>
            )}
        </main>
    );
}
