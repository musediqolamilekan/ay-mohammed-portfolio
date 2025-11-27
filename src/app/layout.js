import AOSInitializer from "@/components/AOSInitializer";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: {
    default: "Yemi Mohammed",
    template: "%s – Yemi Mohammed",
  },
  description: {
    default: "Portfolio website of Yemi Mohammed, a Nigerian writer known for her emotionally rich storytelling and sharp reflections on identity, belonging, and everyday experiences.",
    template: "%s – Portfolio of Yemi Mohammed",
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
