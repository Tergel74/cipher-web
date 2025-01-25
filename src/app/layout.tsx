import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
    title: "Cipher",
    description: "Encrypt notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-slate-200 dark:bg-background">
                <ThemeToggle />
                {children}
            </body>
        </html>
    );
}
