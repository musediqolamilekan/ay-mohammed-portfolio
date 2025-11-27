import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanityServer";

export async function GET() {
    try {
        const query = `*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current
    }`;
        const categories = await serverClient.fetch(query);
        return NextResponse.json(categories);
    } catch (err) {
        console.error("categories API error", err);
        return NextResponse.json([], { status: 500 });
    }
}
