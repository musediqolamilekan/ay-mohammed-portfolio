import BlogListClient from "@/components/BlogListClient";

export default function Blog() {
    return (
        <div>
            <section
            className="w-full bg-cover h-auto bg-center"
        >
            <img src="/hero/blog.jpg" alt="Blog Hero" className="w-full h-auto object-cover" loading="lazy" />
        </section>
        <BlogListClient />
        </div>
    );
}
