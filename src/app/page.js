import AboutMe from "@/components/aboutMe";
import BookGrid from "@/components/bookGrid";
import Hero from "@/components/hero";
import heroItems from "@/data/heroCategories";
import { client } from "@/lib/sanity";

export const revalidate = 60;

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

export default async function Home() {
  const books = await client.fetch(allBooksQuery);
  return (
    <>
      <Hero items={heroItems} />
      <main className="overflow-hidden">
        <AboutMe />
        <BookGrid books={books} />
      </main>
    </>
  );
}
