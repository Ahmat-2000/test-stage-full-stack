import type { Metadata } from "next";
import { Inter , /* Roboto */} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "../components/Footer";
import AuthProvider from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });
// const roboto = Roboto({ subsets: ["latin"], weight:['400','700','900'] });

export const metadata: Metadata = {
  title: "Game Store",
  description: "A fun game store",
  icons :{
    icon: "images/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased ${inter.className} bg-[#12151f] text-neutral-300`}>
      <AuthProvider>
        <main className="container max-w-[1280px] xl:mx-auto px-2">
          <NavBar />
          {children}
          <Footer />
        </main>
      </AuthProvider>
      </body>
    </html>
  );
}

