import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Providers from "@/lib/providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const newsReader = Newsreader({
    variable: "--font-newsReader",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Handy Man",
    description: "Your Local Skill Network",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${newsReader.variable} antialiased bg-[#f4f4f4]`}
            >
                <Providers>
                    <Nav />
                    <section className="min-h-[50dvh] md:py-8 xl:py-24 px-6 mb-6">
                        <div className="max-w-7xl mx-auto">{children}</div>
                    </section>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
