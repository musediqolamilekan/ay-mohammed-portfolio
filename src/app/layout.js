import AOSInitializer from "@/components/AOSInitializer";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: {
    default: "A.Y. Mohammed",
    template: "%s – A.Y. Mohammed",
  },
  description: {
    default: "Portfolio website of A.Y. Mohammed, a Nigerian writer known for her emotionally rich storytelling and sharp reflections on identity, belonging, and everyday experiences.",
    template: "%s – Portfolio of A.Y. Mohammed",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AOSInitializer />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
