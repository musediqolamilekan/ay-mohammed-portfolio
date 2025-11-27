// app/books/[slug]/head.js
import { serverClient } from "@/lib/sanityServer";
import { urlFor } from "@/lib/sanity";

const bookMetaQuery = `*[_type == "book" && slug.current == $slug][0]{title, excerpt, description, cover}`;

export async function generateMetadata({ params }) {
  // Await params because the App Router passes it as a Promise
  const resolved = await params;
  let slug = resolved?.slug ?? resolved?.params?.slug ?? null;
  if (Array.isArray(slug)) slug = slug[0];
  if (slug && typeof slug === "object" && "current" in slug) slug = slug.current;

  if (!slug) {
    return {
      title: "Books",
      description: "A.Y. Mohammed books and series.",
    };
  }

  const book = await serverClient.fetch(bookMetaQuery, { slug });

  // Return just the book title; the layout template will add " – Yemi Mohammed"
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
}
