import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanityServer";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "6", 10));
        const skip = (page - 1) * pageSize;
        const baseFields = `
      _id,
      title,
      "slug": slug.current,
      likes,
      coverImage,
      publishedDate,
      content
    `;
        const q = `*[_type == "blog"] | order(publishedDate desc, _createdAt desc) [${skip}...${skip + pageSize}] { ${baseFields} }`;
        const countQ = `count(*[_type == "blog"])`;

        const [blogs, total] = await Promise.all([
            serverClient.fetch(q),
            serverClient.fetch(countQ),
        ]);

        return NextResponse.json({ blogs, total });
    } catch (err) {
        console.error("blogs api error", err);
        return NextResponse.json({ blogs: [], total: 0 }, { status: 500 });
    }
}
