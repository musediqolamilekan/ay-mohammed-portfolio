import BooksHero from '@/components/BooksHero'
import { serverClient } from '@/lib/sanityServer'
import { urlFor } from '@/lib/sanity'
import React from 'react'
import Books from '@/components/books';

const latestBookQuery = `*[_type == "book" && category->slug.current == "latest"] | order(_createdAt desc)[0]{
  _id,
  title,
  slug,
  cover,
  excerpt,
  description,
  links,
  "category": category-> { _id, title, "slug": slug.current }
}`;

const allBooksQuery = `*[_type == "book"] | order(seq asc){
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

async function BooksPage() {
  let hero = null;

  try {
    const book = await serverClient.fetch(latestBookQuery);
    
    if (book) {
      const coverUrl = book.cover ? urlFor(book.cover).width(500).auto("format").url() : "/assets/books/default.jpeg";
      
      hero = {
        sectionTitle: "LATEST RELEASE",
        bgImage: "/hero/bookhero.jpg",
        cover: coverUrl,
        title: book.title,
        description: book.excerpt
          ? (typeof book.excerpt === 'string' 
              ? book.excerpt.split('\n\n').slice(0, 4)
              : [book.excerpt])
          : [book.excerpt || "An engaging new read from A.Y. Mohammed."],
        links: {
          readMore: `/books/${book.slug.current}`,
          ebook: book.links?.ebook || "#",
          audio: book.links?.audio || "#",
          print: book.links?.print || "#",
        },
      };
    }
  } catch (err) {
    console.error("Error fetching latest book:", err);
  }

  return (
    <div>
        <BooksHero hero={hero} />
        <Books books={await serverClient.fetch(allBooksQuery)} showAll={true} />
    </div>
  )
}

export default BooksPage