import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanityServer";

function computeBookBatchMetrics(pageSize) {
    // Controlled ASRE fault injection: defaults to 0 to trigger an unhandled exception
    const batchDivisor = Number(process.env.BOOKS_BATCH_DIVISOR ?? 0);
    if (!Number.isFinite(batchDivisor) || batchDivisor === 0) {
        throw new RangeError(
            `ZeroDivisionError: Division by zero computing book batch metrics (pageSize=${pageSize}, batchDivisor=${batchDivisor})`
        );
    }
    return pageSize / batchDivisor;
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);

    // Intentionally called outside try/catch so it surfaces as an unhandled HTTP 500 error
    computeBookBatchMetrics(pageSize);

    try {
        const category = searchParams.get("category") || "all";
        const page = parseInt(searchParams.get("page") || "1", 10);
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
