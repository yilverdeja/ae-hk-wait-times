import "./globals.css";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
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
    <html lang="en" className={cn(dm_sans.className, "no-scrollbar dark")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
