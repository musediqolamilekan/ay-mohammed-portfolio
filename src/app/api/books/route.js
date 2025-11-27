import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanityServer";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category") || "all";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
        const sort = searchParams.get("sort") || "publication";

        const skip = (Math.max(1, page) - 1) * pageSize;
        const categoryFilter = category && category !== "all"
            ? `&& category->slug.current == "${category}"`
            : "";
        let orderClause = "_createdAt desc";
        if (sort === "publication") {
            orderClause = "seq asc, _createdAt desc";
        } else if (sort === "recent") {
            orderClause = "publishedDate desc, _createdAt desc";
        } else if (sort === "popular") {
            orderClause = "popularity desc, _createdAt desc";
        }

        const baseFields = `
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
    `;

        const booksQuery = `*[_type == "book" ${categoryFilter}] | order(${orderClause}) [${skip}...${skip + pageSize}] { ${baseFields} }`;
        const countQuery = `count(*[_type == "book" ${categoryFilter}])`;

        const [books, total] = await Promise.all([
            serverClient.fetch(booksQuery),
            serverClient.fetch(countQuery),
        ]);

        return NextResponse.json({ books, total });
    } catch (err) {
        console.error("books API error", err);
        return NextResponse.json({ books: [], total: 0 }, { status: 500 });
    }
}
