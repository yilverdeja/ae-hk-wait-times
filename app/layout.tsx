import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

const dm_sans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="no-scrollbar">
      <body className={dm_sans.className}>
        <Providers>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
