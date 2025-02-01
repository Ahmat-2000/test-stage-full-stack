import type { Metadata } from "next";
import { Inter , /* Roboto */} from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar";

const inter = Inter({ subsets: ["latin"] });
// const roboto = Roboto({ subsets: ["latin"], weight:['400','700','900'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`antialiased ${inter.className} bg-[#12151f] text-neutral-300`}>
      <main className="container max-w-[1280px] xl:mx-auto px-2">
      <NavBar />
        {children}
      </main>
      </body>
    </html>
  );
}

