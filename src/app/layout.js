import AOSInitializer from "@/components/AOSInitializer";
import "./globals.css";

export const metadata = {
  title: "Yemi Muhammed Portfolio",
  description: "Portfolio website of Yemi Muhammed, a Nigerian writer known for her emotionally rich storytelling and sharp reflections on identity, belonging, and everyday experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AOSInitializer />
        {children}
      </body>
    </html>
  );
}
