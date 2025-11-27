import BlogDetailClient from "@/components/BlogDetailClient";
import { serverClient } from "@/lib/sanityServer";

const blogQuery = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  likes,
  coverImage,
  publishedDate,
  content
}`;

export default async function BlogSlugPage({ params }) {
    const resolved = await params;
    let slug = resolved?.slug ?? resolved?.params?.slug ?? null;
    if (Array.isArray(slug)) slug = slug[0];

    if (!slug) {
        return (
            <div className="max-w-7xl mx-auto py-24 px-6">
                <h2 className="text-2xl font-semibold">Missing slug</h2>
            </div>
        );
    }
    const blog = await serverClient.fetch(blogQuery, { slug });

    if (!blog) {
        return <div className="max-w-7xl mx-auto px-6 py-20">Blog not found</div>;
    }
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <BlogDetailClient initialBlog={blog} />
        </main>
    );
}
