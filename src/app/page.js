import AboutMe from "@/components/aboutMe";
import BookGrid from "@/components/bookGrid";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center justify-between px-6 md:px-12 lg:px-20 sm:items-start">
        <AboutMe />
        <BookGrid />
      </main>
      <Footer />
    </>
  );
}
