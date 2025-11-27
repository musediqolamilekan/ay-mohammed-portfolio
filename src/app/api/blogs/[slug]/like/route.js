// app/api/blogs/[slug]/like/route.js
import { NextResponse } from "next/server";
import { serverClient } from "@/lib/sanityServer";

export async function POST(req, context) {
  try {
    // params can be a Promise — unwrap it
    const params = await context.params;
    const slug = params?.slug;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // find document id for the slug
    const idQuery = `*[_type == "blog" && slug.current == $slug][0]._id`;
    const docId = await serverClient.fetch(idQuery, { slug });

    if (!docId) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // atomically increment likes
    const patched = await serverClient
      .patch(docId)
      .inc({ likes: 1 })
      .commit();

    // patched should be the updated document; adjust if your client returns differently
    const newLikes = patched?.likes ?? null;

    return NextResponse.json({ likes: newLikes });
  } catch (err) {
    console.error("Like API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
